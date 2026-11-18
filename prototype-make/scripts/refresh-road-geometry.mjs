// Optional: node scripts/refresh-road-geometry.mjs
// Geometry is bundled, so the application never depends on a live routing API.
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const filename = "src/data/roads.json";
const data = JSON.parse(fs.readFileSync(filename, "utf8"));
const endpoints = data.roads.map((road) => [road[0], road[road.length - 1]]);
const coordinates = endpoints
  .flat()
  .map((p) => `${p[1]},${p[0]}`)
  .join(";");
// One request: every other OSRM leg is an original demonstration corridor.
const result = JSON.parse(
  execFileSync(
    "curl",
    [
      "-fsS",
      "--max-time",
      "90",
      `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=false&steps=true&geometries=geojson&continue_straight=false`,
    ],
    { maxBuffer: 10 * 1024 * 1024 },
  ).toString(),
);
if (result.code !== "Ok") throw new Error(`OSRM returned ${result.code}`);
data.roads = endpoints.map(([a, b], i) => [
  a,
  ...result.routes[0].legs[i * 2].steps.flatMap((step) =>
    step.geometry.coordinates.map((p) => [p[1], p[0]]),
  ),
  b,
]);
fs.writeFileSync(filename, JSON.stringify(data) + "\n");
console.log(`Refreshed ${data.roads.length} bundled OSM corridors.`);
