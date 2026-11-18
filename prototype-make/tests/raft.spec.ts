import { test, expect } from "@playwright/test";
import { edges, nodes, shelters, severities, solve, vehicles, waterDepth } from "../src/routing";

const priorities = shelters.map((s) => s.priority);

// This sandbox uses a proxy certificate not present in Chromium's trust store.
test.use({ ignoreHTTPSErrors: true });

test("all scenarios produce complete loops using only safe roads", () => {
  for (let severity = 0; severity < 4; severity++) {
    for (let vehicle = 0; vehicle < 3; vehicle++) {
      const result = solve(severity, vehicle, priorities, new Set());
      if (vehicle === 0 && severity >= 2) {
        expect(result.routes).toEqual([]);
        continue;
      }
      expect(result.routes).toHaveLength(3);
      for (const route of result.routes) {
        expect([...route.order].sort()).toEqual([1, 2, 3, 4, 5, 6]);
        expect(route.km).toBeGreaterThan(0);
        expect(route.minutes).toBeGreaterThan(0);
        expect(route.points[0]).toEqual(route.points[route.points.length - 1]);
        expect(route.stopProgress).toHaveLength(6);
        expect(route.stopProgress[5]).toBeLessThan(1);
        for (const shelter of shelters) {
          expect(
            route.points.some((p) => p[0] === shelter.point[0] && p[1] === shelter.point[1]),
          ).toBeTruthy();
        }
        for (const id of route.roads) {
          expect(
            waterDepth(
              edges.find((e) => e.id === id)!,
              severity,
            ),
          ).toBeLessThanOrEqual(vehicles[vehicle].depth);
        }
      }
      expect(result.routes[1].urgency).toBeLessThanOrEqual(result.routes[0].urgency);
      expect(result.routes[2].km).toBeLessThanOrEqual(result.routes[0].km);
      for (const route of result.routes) expect(result.pareto).toContainEqual(route);
    }
  }
});

test("rainfall AEP labels and corrected Toclong location stay consistent with the network", () => {
  expect(severities.slice(1).map((s) => [s.period, s.rainfall])).toEqual([
    ["5-year", "20% AEP rainfall"],
    ["25-year", "4% AEP rainfall"],
    ["100-year", "1% AEP rainfall"],
  ]);
  const toclong = shelters[3];
  expect(toclong.city).toBe("Kawit");
  expect(toclong.point).toEqual([14.4221811, 120.9137718]);
  expect(nodes[4]).toEqual(toclong.point);
  expect(edges.some((e) => e.a === 4 || e.b === 4)).toBeTruthy();
});

test("manual roadblocks reroute; disconnected depot disables dispatch", () => {
  const before = solve(2, 1, priorities, new Set());
  // The first link is the depot's last-meter access; closing it correctly
  // isolates the depot. Find an interior link with an available detour instead.
  const road = [...new Set(before.routes[0].roads)].find((id) => {
    const edge = edges.find((e) => e.id === id)!;
    return edge.a > 6 && edge.b > 6 && solve(2, 1, priorities, new Set([id])).routes.length > 0;
  });
  expect(road).toBeDefined();
  const after = solve(2, 1, priorities, new Set([road!]));
  expect(after.routes.length).toBeGreaterThan(0);
  expect(after.routes.every((r) => !r.roads.includes(road!))).toBeTruthy();
  const isolated = solve(
    2,
    1,
    priorities,
    new Set(edges.filter((e) => e.a === 0 || e.b === 0).map((e) => e.id)),
  );
  expect(isolated.routes).toEqual([]);
});

test("shared physical segments occur in only one road link", () => {
  const seen = new Set<string>();
  for (const edge of edges) {
    for (let i = 1; i < edge.points.length; i++) {
      const a = edge.points[i - 1].map((n) => n.toFixed(6)).join(",");
      const b = edge.points[i].map((n) => n.toFixed(6)).join(",");
      const key = [a, b].sort().join(":");
      expect(seen.has(key)).toBeFalsy();
      seen.add(key);
    }
  }
});

test("priorities change optimization and results are repeatable", () => {
  const first = solve(2, 1, priorities, new Set());
  const repeated = solve(2, 1, priorities, new Set());
  expect(first.routes).toEqual(repeated.routes);
  const changed = solve(2, 1, [1, 1, 1, 1, 1, 5], new Set());
  expect(changed.routes[1].order).not.toEqual(first.routes[1].order);
});

test("desktop dispatch controls, map, analytics, and scenarios work", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(process.env.RAFT_TEST_URL || "http://localhost:3000");
  await expect(page.getByRole("heading", { name: "Dispatch setup", exact: true })).toBeVisible();
  await expect(page.locator(".page-intro, .workflow")).toHaveCount(0);
  const workspace = await page.locator(".workspace").boundingBox();
  expect(workspace!.y).toBeLessThan(130);
  expect(workspace!.height).toBeGreaterThan(800);
  await expect(page.locator(".leaflet-tile-loaded").first()).toBeVisible({ timeout: 30000 });
  await expect(page.locator(".stop-marker")).toHaveCount(6);
  await expect(page.locator(".route-card")).toHaveCount(3);
  await expect(page.locator("#scenario option:checked")).toHaveText("25-year rainfall flood");
  await expect(page.locator("#scenario")).not.toContainText(/storm surge|typhoon/i);
  await expect(page.locator(".severity-card small")).toHaveText([
    "No flooding",
    "20% AEP rainfall",
    "4% AEP rainfall",
    "1% AEP rainfall",
  ]);
  await expect(page.locator(".map-place-label").filter({ hasText: "Toclong (Kawit)" })).toHaveCount(
    1,
  );
  await expect(page.locator(".map-legend")).toContainText("0.1–0.5 m");
  await expect(page.locator(".map-legend")).toContainText("0.5–1.5 m");
  await expect(page.locator(".map-legend")).toContainText("> 1.5 m");
  await page.screenshot({ path: "/tmp/raft-desktop.png", fullPage: true });
  await page.getByRole("checkbox").check();
  await expect(page.locator(".baseline-result")).toBeVisible();
  await expect(page.getByText("0% loop passability", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Toggle flood layers", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Toggle flood layers", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Toggle flood layers", exact: true }).click();
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await page.getByRole("button", { name: "Fit all shelters", exact: true }).click();
  await page.getByRole("button", { name: "Critical-first route", exact: false }).click();
  await expect(page.locator(".route-card").nth(1)).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Simulate truck dispatch", exact: true }).click();
  await expect(page.getByText("Relief is on the way", { exact: true })).toBeVisible();
  await page.waitForTimeout(800);
  await expect(page.locator(".truck-marker")).toHaveCSS("opacity", "1");
  await page.getByRole("button", { name: "Pause dispatch", exact: true }).click();
  await expect(page.getByText("Dispatch paused", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Reset simulation", exact: true }).click();
  await page.getByRole("button", { name: "Optimization analytics", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Less distance. Less delay." })).toBeVisible();
  await page.getByText("Model assumptions & formulas").click();
  await expect(page.getByText("This is a seeded, discrete", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Routes", exact: true }).click();
  await page.selectOption("#scenario", "0");
  await expect(page.getByText("All roads clear", { exact: true })).toBeVisible();
  await page.selectOption("#scenario", "2");
  await expect(page.locator(".vehicle-card").nth(2)).toHaveAttribute("aria-pressed", "true");
  await page.getByLabel("Salinas priority").selectOption("1");
  await expect(page.locator("#scenario")).toHaveValue("custom");
  await page.getByRole("button", { name: "How RAFT works", exact: false }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  // Road hit areas are real Leaflet vector paths; click one and verify rerouting.
  await page
    .locator(".leaflet-overlay-pane path[stroke-opacity='0']")
    .first()
    .evaluate((element) => element.dispatchEvent(new MouseEvent("click", { bubbles: true })));
  await expect(
    page.getByRole("button", { name: "Clear 1 manual roadblock", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear 1 manual roadblock", exact: true }).click();
  await expect(page.locator(".clear-blocks")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("mobile layout has no horizontal overflow and supports dispatch", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(process.env.RAFT_TEST_URL || "http://localhost:3000");
  await expect(page.locator(".route-card")).toHaveCount(3);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBeTruthy();
  await page
    .getByRole("button", { name: "Simulate truck dispatch", exact: true })
    .scrollIntoViewIfNeeded();
  await page.screenshot({ path: "/tmp/raft-mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Simulate truck dispatch", exact: true }).click();
  await expect(page.getByText("Relief is on the way", { exact: true })).toBeVisible();
});

test("readable typography fits desktop, tablet, and mobile layouts", async ({ page }) => {
  await page.goto(process.env.RAFT_TEST_URL || "http://localhost:3000");
  await expect(page.locator(".route-card")).toHaveCount(3);
  for (const width of [1440, 1024, 768, 390, 360]) {
    await page.setViewportSize({ width, height: 1000 });
    await expect(page.locator(".panel-heading h2").first()).toHaveCSS("font-size", "16px");
    await expect(page.locator(".vehicle-detail strong").first()).toHaveCSS("font-size", "14px");
    await expect(page.locator(".route-card > p").first()).toHaveCSS("font-size", "12px");
    await expect(page.locator(".route-metrics > strong").first()).toHaveCSS("font-size", "24px");
    await expect(page.locator(".dispatch-copy strong")).toHaveCSS("font-size", "14px");
    const overflow = await page.evaluate(() => ({
      page: document.documentElement.scrollWidth > window.innerWidth,
      controls: [
        ...document.querySelectorAll<HTMLElement>(
          ".severity-card, .vehicle-card, .route-card, .map-legend, .dispatch-control, .panel-tabs, .shelter-row, .route-metrics",
        ),
      ]
        .filter((el) => el.scrollWidth > el.clientWidth + 1)
        .map((el) => el.className),
    }));
    expect(overflow, `No clipped controls at ${width}px`).toEqual({ page: false, controls: [] });
  }
});

test("dispatch completes all six stops, and unsafe settings disable it", async ({ page }) => {
  await page.goto(process.env.RAFT_TEST_URL || "http://localhost:3000");
  await expect(page.locator(".stop-marker")).toHaveCount(6);
  await page.clock.install();
  await page.getByRole("button", { name: "Simulate truck dispatch", exact: true }).click();
  await page.clock.fastForward(61000);
  await expect(page.getByText("Delivery complete. Back at base.", { exact: true })).toBeVisible();
  await expect(page.locator(".delivered-stop")).toHaveCount(6);
  await page.getByRole("button", { name: "Replay dispatch", exact: true }).click();
  await expect(page.getByText("Relief is on the way", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Light Utility Van", exact: false }).click();
  await expect(page.getByText("No safe route available", { exact: true })).toBeVisible();
  await expect(page.locator(".play-button")).toBeDisabled();
  await page.getByRole("button", { name: "Try heavy cargo truck", exact: false }).click();
  await expect(page.locator(".route-card")).toHaveCount(3);
  await expect(page.locator(".play-button")).toBeEnabled();
});
