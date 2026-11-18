# RAFT demonstration

RAFT is a frontend-only thesis prototype for flood-aware relief dispatch in Coastal Cavite.

## Presenting the demo

1. Choose a quick scenario, or customize flood severity and vehicle clearance.
2. Adjust shelter priorities (1–5) in the scrollable setup panel. Routes update automatically.
3. Select a balanced, critical-first, or shortest-distance route.
4. Enable **Compare with standard GPS** to see the unfiltered nearest-stop baseline.
5. Click a modeled road to close it. Click its roadblock marker to reopen it, or clear all manual roadblocks.
6. Play the dispatch simulation. Pause, reset, or change animation speed (1× / 2× / 4×). One full trip takes 60 seconds at 1×.
7. Open **Optimization analytics** for the distance–delay chart, swarm explanation, and model assumptions.

Changing conditions, priorities, closures, or the selected route resets the simulated dispatch to the depot. If any shelter is unreachable, dispatch is disabled instead of using an unsafe road. Setup changes are held in memory and reset on page reload. External providers receive normal map-tile and font requests.

## Data and safety boundaries

- The depot and five shelter markers use the coordinates supplied in the brief. Toclong was corrected to the [OpenStreetMap Toclong, Kawit place record](https://www.openstreetmap.org/node/9572332508), at `[14.4221811, 120.9137718]`, rather than moving the marker for appearance alone. This is a barangay place-center reference, not a surveyed evacuation-center entrance; verify the actual shelter before operational use. The three connecting road corridors were regenerated for this point.
- Rainfall scenarios are labeled by return period and annual exceedance probability (AEP): 5-year = 20%, 25-year = 4%, and 100-year = 1% per year. These probabilities describe rainfall exceedance, not maximum flood depth or the likelihood that an individual road will flood. The map legend separately describes local depth tiers. The prototype does not model wind-driven storm surge.
- Map tiles are served by OpenStreetMap without an API key.
- Bundled street geometry was routed using the public OSRM service over OpenStreetMap data. Attribution is retained in the map and `src/data/roads.json`. Geometry uses OSM coordinates; last-meter connectors preserve the marker locations, including the corrected Toclong reference point.
- Overlapping physical segments are merged, then degree-two vertices are compressed into clickable road links. Flood classifications are demonstration assumptions, consistent on each shared segment. The network is treated as two-way; one-way restrictions and turn restrictions are not modeled.
- Flood polygons are illustrative and use the requested hazard color convention. They are not UP NOAH data, live flood measurements, or validated inundation forecasts. Road water depths are scenario assignments, not inferred from these illustrative polygons.
- Safe road eligibility is based on the selected vehicle's depth limit. Flooded passable roads use an assumed speed of 18 km/h, dry roads 32 km/h, and deliveries add two minutes each.
- Distance and urgency are recalculated from the bundled network. They intentionally are not hard-coded to the sample thesis figures.
- Urgency delay is the priority-weighted average shelter arrival time, divided by 10; lower is better.
- The optimizer is a repeatable, seeded discrete multi-objective swarm prototype (36 particles, 40 swap-based rounds), not a validated research implementation or a proof of global optimality. Cards are selected from the evaluated non-dominated archive. Some settings can produce the same best loop for more than one objective.
- GPS comparison means an illustrative nearest-stop, distance-only greedy baseline—not the actual behavior of Google Maps or Waze. It ignores simulated floods and closures.
- **Not for field navigation or operational emergency decisions.** Verify actual roads, water levels, vehicle capability, and shelter conditions with local disaster risk reduction offices.

## Verification

Use the repository's existing package manager and scripts:

```sh
pnpm exec tsc --noEmit
pnpm exec playwright test tests/raft.spec.ts --workers=1 --reporter=line
pnpm build
pnpm format src/App.tsx src/MapView.tsx src/routing.ts src/index.css scripts/refresh-road-geometry.mjs tests/raft.spec.ts index.html
```

The environment supervises the development server; do not start a second server. Browser tests default to `http://localhost:3000`; set `RAFT_TEST_URL` if the existing server uses a different address. Install the test browser with `pnpm exec playwright install chromium` if needed. Tests allow the sandbox's HTTPS proxy certificate; the application does not disable certificate validation.

The optional `node scripts/refresh-road-geometry.mjs` maintenance command refreshes bundled corridor geometry with one public OSRM request. It is never run during app startup and is not required to present the demo. The existing demo hazard assignments are retained.
