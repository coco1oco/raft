import roadGeometry from "./data/roads.json" with { type: "json" };

export type Point = [number, number];
export const depot: Point = [14.4395, 120.904];
export const shelters = [
  {
    name: "Salinas",
    city: "Bacoor",
    point: [14.4445, 120.939] as Point,
    priority: 5,
    need: "Medical & stranded residents",
  },
  {
    name: "Magdalo",
    city: "Kawit",
    point: [14.4335, 120.892] as Point,
    priority: 5,
    need: "Stranded families",
  },
  {
    name: "San Agustin",
    city: "Noveleta",
    point: [14.4285, 120.8795] as Point,
    priority: 4,
    need: "Elderly evacuees",
  },
  {
    name: "Toclong",
    city: "Kawit",
    // OSM Toclong, Kawit place center; not a surveyed evacuation-center entrance.
    point: [14.4221811, 120.9137718] as Point,
    priority: 3,
    need: "Shelter kits",
  },
  {
    name: "Recodo",
    city: "Cavite City",
    point: [14.4765, 120.8985] as Point,
    priority: 2,
    need: "Drinking water",
  },
  {
    name: "Tejeros Convention",
    city: "Rosario",
    point: [14.411, 120.863] as Point,
    priority: 1,
    need: "Routine food packs",
  },
];
export const vehicles = [
  {
    name: "Light Utility Van",
    short: "Utility van",
    model: "L300 / HiAce",
    depth: 0.3,
    class: "A",
  },
  {
    name: "4×4 Rescue Pickup",
    short: "4×4 pickup",
    model: "Hilux / D-Max",
    depth: 0.6,
    class: "B",
  },
  {
    name: "Heavy Cargo Truck",
    short: "Cargo truck",
    model: "Isuzu / 6-wheeler",
    depth: 1,
    class: "C",
  },
];
export const severities = [
  { name: "Dry Weather", period: "Baseline", rainfall: "No flooding", color: "#6c977d" },
  { name: "Moderate Flood", period: "5-year", rainfall: "20% AEP rainfall", color: "#e7b647" },
  { name: "Severe Flood", period: "25-year", rainfall: "4% AEP rainfall", color: "#ed8b42" },
  { name: "Extreme Flood", period: "100-year", rainfall: "1% AEP rainfall", color: "#df665d" },
];

export type Edge = { id: string; a: number; b: number; risk: number; points: Point[]; km: number };
export function distance(a: Point, b: Point) {
  const lat = (a[0] - b[0]) * 111.2;
  const lng = (a[1] - b[1]) * 107.7;
  return Math.hypot(lat, lng);
}
// Merge shared physical road segments before routing, so a closed road cannot
// accidentally be reused through a different, overlapping corridor.
function buildNetwork() {
  const vertices: Point[] = [depot, ...shelters.map((s) => s.point)];
  const key = (p: Point) => `${p[0].toFixed(6)},${p[1].toFixed(6)}`;
  const indices = new Map(vertices.map((p, i) => [key(p), i]));
  const vertex = (p: Point) => {
    const existing = indices.get(key(p));
    if (existing !== undefined) return existing;
    const id = vertices.push(p) - 1;
    indices.set(key(p), id);
    return id;
  };
  const segments = new Map<string, { a: number; b: number; risk: number }>();
  roadGeometry.roads.forEach((road, index) => {
    for (let i = 1; i < road.length; i++) {
      const a = vertex(road[i - 1] as Point),
        b = vertex(road[i] as Point);
      if (a === b) continue;
      const id = a < b ? `${a}:${b}` : `${b}:${a}`;
      const existing = segments.get(id);
      // Shared geometry uses one consistent demo hazard classification.
      const risk = roadGeometry.risks[index];
      if (existing) existing.risk = Math.min(existing.risk, risk);
      else segments.set(id, { a, b, risk });
    }
  });
  const links = [...segments.values()];
  const adjacency = vertices.map(() => [] as number[]);
  links.forEach((e, i) => {
    adjacency[e.a].push(i);
    adjacency[e.b].push(i);
  });
  const anchors = vertices
    .map((_, i) => i)
    .filter(
      (i) =>
        i < 7 ||
        adjacency[i].length !== 2 ||
        links[adjacency[i][0]].risk !== links[adjacency[i][1]].risk,
    );
  const anchorSet = new Set(anchors);
  const remap = new Map(anchors.map((id, i) => [id, i]));
  const visited = new Set<number>();
  const roads: Edge[] = [];
  // Collapse degree-two vertices into street-shaped polylines. Intersections
  // and changes in flood classification remain explicit routing nodes.
  for (const anchor of anchors) {
    for (const first of adjacency[anchor]) {
      if (visited.has(first)) continue;
      const points: Point[] = [vertices[anchor]];
      let from = anchor,
        current = first,
        end = anchor;
      const risk = links[first].risk;
      while (true) {
        visited.add(current);
        const link = links[current];
        end = link.a === from ? link.b : link.a;
        points.push(vertices[end]);
        if (anchorSet.has(end)) break;
        const next = adjacency[end].find((i) => i !== current)!;
        from = end;
        current = next;
      }
      if (anchor === end) continue;
      roads.push({
        id: `road-${roads.length}`,
        a: remap.get(anchor)!,
        b: remap.get(end)!,
        risk,
        points,
        km: points.slice(1).reduce((n, p, i) => n + distance(points[i], p), 0),
      });
    }
  }
  return { nodes: anchors.map((i) => vertices[i]), edges: roads };
}
export const { nodes, edges } = buildNetwork();
export function waterDepth(edge: Edge, severity: number) {
  if (!severity || !edge.risk) return 0;
  if (severity === 1) return edge.risk === 2 ? 0.5 : 0;
  if (severity === 2) return edge.risk === 2 ? 1 : 0.5;
  return edge.risk === 2 ? 1.7 : edge.risk === 1 ? 0.5 : 0;
}
type Path = { km: number; minutes: number; points: Point[]; roads: string[] };
export type Route = Path & {
  order: number[];
  urgency: number;
  arrivals: number[];
  stopProgress: number[];
};
export type Solution = {
  routes: Route[];
  baseline: Route;
  reference: Route;
  blocked: number;
  slowed: number;
  evaluated: number;
  pareto: Route[];
};

function shortest(
  from: number,
  to: number,
  severity: number,
  depth: number,
  blocks: Set<string>,
  unrestricted = false,
): Path {
  const costs = nodes.map(() => Infinity);
  const previous: ({ node: number; edge: Edge } | undefined)[] = nodes.map(() => undefined);
  const seen = new Set<number>();
  costs[from] = 0;
  while (seen.size < nodes.length) {
    let current = -1;
    nodes.forEach((_, i) => {
      if (!seen.has(i) && (current < 0 || costs[i] < costs[current])) current = i;
    });
    if (current < 0 || !Number.isFinite(costs[current]) || current === to) break;
    seen.add(current);
    for (const edge of edges) {
      if (edge.a !== current && edge.b !== current) continue;
      if (!unrestricted && (waterDepth(edge, severity) > depth || blocks.has(edge.id))) continue;
      const next = edge.a === current ? edge.b : edge.a;
      const cost = edge.km * (unrestricted || !waterDepth(edge, severity) ? 1 : 1.8);
      if (costs[current] + cost < costs[next]) {
        costs[next] = costs[current] + cost;
        previous[next] = { node: current, edge };
      }
    }
  }
  if (!Number.isFinite(costs[to]))
    return { km: Infinity, minutes: Infinity, points: [], roads: [] };
  const segments: { edge: Edge; forward: boolean }[] = [];
  let current = to;
  while (current !== from) {
    const prev = previous[current]!;
    segments.unshift({ edge: prev.edge, forward: prev.edge.a === prev.node });
    current = prev.node;
  }
  return {
    km: segments.reduce((n, s) => n + s.edge.km, 0),
    minutes: segments.reduce(
      (n, s) => n + (s.edge.km / (waterDepth(s.edge, severity) && !unrestricted ? 18 : 32)) * 60,
      0,
    ),
    points: segments.flatMap((s) => (s.forward ? s.edge.points : [...s.edge.points].reverse())),
    roads: segments.map((s) => s.edge.id),
  };
}

export function solve(
  severity: number,
  vehicle: number,
  priorities: number[],
  blocks: Set<string>,
): Solution {
  const depth = vehicles[vehicle].depth;
  const matrix = Array.from({ length: 7 }, (_, a) =>
    Array.from({ length: 7 }, (_, b) => shortest(a, b, severity, depth, blocks)),
  );
  const baselineMatrix = Array.from({ length: 7 }, (_, a) =>
    Array.from({ length: 7 }, (_, b) => shortest(a, b, 0, Infinity, new Set(), true)),
  );
  function evaluate(order: number[], paths = matrix): Route {
    let km = 0,
      minutes = 0,
      urgency = 0,
      from = 0;
    const points: Point[] = [],
      roads: string[] = [],
      arrivals: number[] = [],
      stopDistances: number[] = [];
    for (const stop of [...order, 0]) {
      const leg = paths[from][stop];
      km += leg.km;
      minutes += leg.minutes;
      if (stop) {
        urgency += minutes * priorities[stop - 1];
        arrivals.push(minutes);
        stopDistances.push(km);
        minutes += 2;
      }
      points.push(...leg.points);
      roads.push(...leg.roads);
      from = stop;
    }
    return {
      order,
      km: Math.round(km * 1000) / 1000,
      minutes,
      urgency: Math.round((urgency / priorities.reduce((a, b) => a + b, 0) / 10) * 1e6) / 1e6,
      points,
      roads,
      arrivals,
      stopProgress: stopDistances.map((d) => d / km),
    };
  }
  const remaining = [1, 2, 3, 4, 5, 6],
    greedy: number[] = [];
  let last = 0;
  while (remaining.length) {
    remaining.sort((a, b) => baselineMatrix[last][a].km - baselineMatrix[last][b].km);
    last = remaining.shift()!;
    greedy.push(last);
  }
  const baseline = evaluate(greedy, baselineMatrix);
  const reference = evaluate([...greedy].reverse(), baselineMatrix);
  const blocked = edges.filter((e) => blocks.has(e.id) || waterDepth(e, severity) > depth).length;
  const slowed = edges.filter(
    (e) => !blocks.has(e.id) && waterDepth(e, severity) > 0 && waterDepth(e, severity) <= depth,
  ).length;
  if (matrix[0].some((p) => !Number.isFinite(p.km)))
    return { routes: [], baseline, reference, blocked, slowed, evaluated: 0, pareto: [] };

  // Discrete multi-objective swarm: swap-based motion toward personal and leader orders.
  // Seeded for repeatable thesis demonstrations; this is not a validated field optimizer.
  let seed = 42;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const archive = new Map<string, Route>();
  const remember = (order: number[]) => {
    const key = order.join(",");
    if (!archive.has(key)) archive.set(key, evaluate([...order]));
    return archive.get(key)!;
  };
  const particles = Array.from({ length: 36 }, (_, i) => {
    const order =
      i === 0
        ? [1, 5, 3, 2, 6, 4]
        : i === 1
          ? [4, 1, 5, 3, 2, 6]
          : i === 2
            ? [1, 5, 2, 3, 6, 4]
            : [...greedy];
    if (i > 2)
      for (let j = 5; j > 0; j--) {
        const k = Math.floor(random() * (j + 1));
        [order[j], order[k]] = [order[k], order[j]];
      }
    return { order, best: remember(order), weight: i / 35 };
  });
  const score = (r: Route, w: number) => (w * r.km) / 25 + ((1 - w) * r.urgency) / 3;
  for (let iteration = 0; iteration < 40; iteration++) {
    for (const particle of particles) {
      const leader = [...archive.values()].reduce((a, b) =>
        score(a, particle.weight) < score(b, particle.weight) ? a : b,
      );
      const target = random() < 0.5 ? leader.order : particle.best.order;
      const next = [...particle.order];
      const a = Math.floor(random() * 6);
      const b = random() < 0.7 ? next.indexOf(target[a]) : Math.floor(random() * 6);
      [next[a], next[b]] = [next[b], next[a]];
      particle.order = next;
      const result = remember(next);
      if (score(result, particle.weight) < score(particle.best, particle.weight))
        particle.best = result;
    }
  }
  const candidates = [...archive.values()];
  const pareto = candidates.filter(
    (a) =>
      !candidates.some(
        (b) => b.km <= a.km && b.urgency <= a.urgency && (b.km < a.km || b.urgency < a.urgency),
      ),
  );
  const shortestRoute = pareto.reduce((a, b) => (a.km < b.km ? a : b));
  const critical = pareto.reduce((a, b) => (a.urgency < b.urgency ? a : b));
  const spreadKm = Math.max(0.01, critical.km - shortestRoute.km);
  const spreadUrgency = Math.max(0.01, shortestRoute.urgency - critical.urgency);
  const balanceScore = (r: Route) =>
    Math.hypot(
      (r.km - shortestRoute.km) / spreadKm,
      (r.urgency - critical.urgency) / spreadUrgency,
    );
  const balanced = pareto.reduce((a, b) => (balanceScore(a) < balanceScore(b) ? a : b));
  return {
    routes: [balanced, critical, shortestRoute],
    baseline,
    reference,
    blocked,
    slowed,
    evaluated: archive.size,
    pareto,
  };
}

export const floodZones: { level: number; points: Point[] }[] = [
  {
    level: 1,
    points: [
      [14.451, 120.923],
      [14.449, 120.941],
      [14.437, 120.944],
      [14.432, 120.934],
      [14.438, 120.922],
    ],
  },
  {
    level: 2,
    points: [
      [14.448, 120.884],
      [14.445, 120.898],
      [14.432, 120.899],
      [14.428, 120.886],
      [14.435, 120.881],
    ],
  },
  {
    level: 3,
    points: [
      [14.475, 120.89],
      [14.476, 120.899],
      [14.461, 120.901],
      [14.447, 120.896],
      [14.447, 120.889],
    ],
  },
  {
    level: 1,
    points: [
      [14.437, 120.862],
      [14.433, 120.88],
      [14.42, 120.884],
      [14.412, 120.869],
      [14.419, 120.86],
    ],
  },
  {
    level: 2,
    points: [
      [14.426, 120.856],
      [14.429, 120.866],
      [14.418, 120.874],
      [14.41, 120.861],
      [14.413, 120.854],
    ],
  },
];
