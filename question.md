# Thesis Outline Defense — Sample Panel Questions & Ready Answers (`question.md`)

> **How to use this reviewer:** Focus on the **core idea** of each answer (1–2 sentences) rather than memorizing word-for-word. Page references point to your printed manuscript (`Thesis Outline_DMO-PSO.docx`).

---

## PART 1: THE ALGORITHM (DMO-PSO)

### 1. Why did you use Particle Swarm Optimization (PSO) instead of other algorithms like Dijkstra, Genetic Algorithms (GA), or Ant Colony Optimization (ACO)?
- **Vs. Dijkstra / A\*:** Dijkstra and A\* only find the shortest path from Point A to Point B. They cannot decide the optimal *visiting order* across 15 to 30 evacuation centers (which is an NP-hard Multi-Objective TSP). We actually use shortest-path search *first* to build the road distance table, and then DMO-PSO optimizes the tour sequence.
- **Vs. Genetic Algorithms (GA / NSGA-II):** Standard GA crossover cuts and splices two routes together, which creates invalid routes with duplicate or missing stops and requires extra repair steps. DMO-PSO uses **Swap Operators** (swapping two positions in a route), so **every particle stays a valid permutation at every iteration** with no repair overhead (**Pages 16–17**; Emambocus et al., 2021).
- **Vs. Ant Colony Optimization (ACO):** ACO updates pheromone trails on every road edge every iteration, which adds extra computational overhead when roadblocks change dynamically (**Page 16**). Also, **de Veluz et al. (2023)** already showed MO-PSO works well for Philippine disaster routing (**Page 17**).

### 2. Standard PSO uses continuous numbers (velocity and position). How does your PSO work on a list of stops?
- In continuous PSO, you add numbers ($x + v$), which doesn't work on a route list like `[1, 2, 3, 4]`.
- In **Discrete PSO (Pages 32–33)**, each **particle** is a valid permutation of evacuation centers, and **velocity** is a **Swap Sequence** (a chain of **Swap Operators** that each exchange two stops in the list). Particles move toward their personal best ($pBest$) and an archive leader ($gBest$) by applying swaps probabilistically.

### 3. Why use Multi-Objective optimization (Pareto) instead of just combining distance and urgency into one formula (weighted sum)?
- A single weighted sum forces you to guess fixed weights ahead of time (which is subjective) and can miss balanced trade-off routes on non-convex curves (**Page 16**).
- Pareto optimization produces a **set of non-dominated trade-off routes** so a human dispatcher can see the trade-off and choose based on the situation on the ground.

### 4. Does the algorithm produce just one route or multiple routes? How does the user pick?
- It maintains an **External Pareto Archive** of non-dominated routes and presents **three clear options** (**Page 34**):
  1. **Minimum-$f_1$ (Shortest Distance):** Lowest total kilometers and fuel use.
  2. **Minimum-$f_2$ (Critical-First):** Reaches high-urgency ($U=5$) shelters earliest.
  3. **Compromise Knee-Point (Balanced Route):** The middle sweet-spot route, chosen after normalizing both objectives onto a common scale so neither unit dominates.

### 5. What is "Crowding Distance" and why do you need it in the Pareto archive?
- Without diversity control, all particles can clump around one spot on the trade-off curve. **Crowding Distance** (**Page 34**; Bacar & Rawhoudine, 2021) measures how close a route is to its neighbors in the archive—favoring less-crowded routes as swarm leaders ($gBest$) and pruning overcrowded duplicates when the archive fills up.

### 6. Why not just use brute force to guarantee the 100% exact best route?
- Because multi-stop routing is **NP-hard**. For 6 shelters, there are only $6! = 720$ permutations—which we already brute-forced to verify our math. But at full scale (**15 to 30 shelters**, **Page 9**), $15!$ is over **1.3 trillion** combinations and $30!$ is about $2.65 \times 10^{32}$, making brute force impossible in real time.

### 7. Since PSO is randomized, how do you know it gives consistent results and doesn't just get lucky?
- That is exactly why we evaluate **Convergence Stability** (**Page 40**): we run DMO-PSO across **multiple independent trials** with controlled random seeds on every scenario and inspect the variation (standard deviation/range) across trials to ensure it consistently converges to the same Pareto front quality.

---

## PART 2: DATA INPUTS & FLOOD MODELING (UP NOAH, OSM, VEHICLES)

### 8. Why did you opt to use UP NOAH shapefiles?
- **UP NOAH** is the **official, standardized 1:10,000-scale LiDAR-derived flood hazard dataset** used for Philippine DRRM planning (**Pages 13, 22**; Lagmay et al., 2017; Cadiz, 2018).
- It provides consistent **5-year, 25-year, and 100-year rainfall return periods** across all five target coastal Cavite LGUs, allowing repeatable scenario stress-testing without exposing teams to real flood hazards or relying on unavailable street-level water sensors (**Pages 7–8, 20, 22**).

### 9. Why use OpenStreetMap (via OSMnx) instead of Google Maps?
- Google Maps is proprietary, doesn't let you freely modify its underlying road graph to prune flooded streets or inject custom vehicle wading limits, and costs API fees per matrix query.
- **OpenStreetMap + OSMnx** (**Pages 13, 22, 27**) gives us the full open-source **directed road graph $G = (V, E)$** with true street lengths, one-way rules, and bridge tags so we can mathematically intersect edges with UP NOAH polygons locally.

### 10. How do you know OpenStreetMap data is accurate and up to date?
- Before routing, we validate the extracted OSM graph (**Page 27**): OSMnx filters strictly for drivable public roads and cleans invalid geometries, and we check CRS alignment, attributes, and depot/shelter vertex snapping against municipal boundaries (**Appendix C**) and base maps.
- While the study is bounded by the completeness of secondary datasets (**Page 7**), our interface also includes **manual roadblock overrides ($M_e = 1$)** so dispatchers can immediately block any newly closed street.

### 11. Why did you pick the 5-, 25-, and 100-year return periods? What about coastal storm surge?
- **Why 5, 25, 100 years:** They are the official standardized DOST/UP NOAH tiers (**Page 22**), representing a progression from frequent heavy monsoon rain (`5-yr`, 20% AEP), to severe tropical storm flooding (`25-yr`, 4% AEP), to catastrophic typhoon flooding (`100-yr`, 1% AEP, comparable to *Paeng*, *Carina*, and *Kristine*).
- **Why not storm surge:** UP NOAH return-period layers strictly model **rainfall-induced pluvial and fluvial flooding**; coastal storm surge requires separate hydrodynamic models and is explicitly noted as a limitation (**Page 7**).

### 12. UP NOAH gives flood ranges (Low: 0.1–0.5 m, Medium: 0.5–1.5 m, High: >1.5 m). Why did you convert them to 0.50 m, 1.00 m, and 1.50 m?
- An algorithm needs one single water-depth number ($W_e$) to check $W_e \le W_{\max}$ (**Table 1, Pages 23–25**):
  - **Low (`0.50 m` upper bound):** If we used the `0.30 m` midpoint, light Class A vans (`0.30 m` limit) would be allowed on Low-hazard roads even though water can reach `0.50 m`. Using `0.50 m` safely blocks Class A while still letting Classes B and C pass.
  - **Medium (`1.00 m` midpoint + `1.50 m` sensitivity):** Using `1.50 m` alone would make Medium and High identical and block Class C trucks (`1.00 m`) everywhere. So we use `1.00 m` as the baseline (allowing Class C slowly) and test `1.50 m` separately as a **worst-case sensitivity check** (**Page 40**).
  - **High (`1.50 m`):** Exceeds our highest truck (`1.00 m`), blocking all wheeled classes.

### 13. What if the shapefile says a road is flooded, or it's a 5-year storm, but actual floodwater on the ground is much lower?
- Remember that manual overrides ($M_e = 1$) only *add* extra roadblocks (like accidents or debris) for fail-safe planning—they never force-open a flood-polygon road without live sensors.
- If conditions are milder than a 100-year or 25-year map, the user steps down to the **5-year scenario** (where Class B and C still pass Low-hazard streets). For localized rain below a 5-year event, the dispatcher can run the **Dry baseline (`0.00 m`)** and manually block only the specific flooded streets.

### 14. Why use generic Vehicle Classes A, B, and C instead of the actual trucks owned by Cavite PDRRMO/MDRRMO?
- Fleet inventories vary across the five LGUs and agencies did not provide internal fleet records (**Pages 8, 25–26**).
- Grounding **Class A (`0.30 m`), Class B (`0.60 m`), and Class C (`1.00 m`)** in peer-reviewed hydrostatic stability criteria (Kramer et al., 2016; Martínez-Gomariz et al., 2018) plus commercial vehicle specs makes the model generalizable—and actual LGU trucks can easily be mapped to their matching class or custom $W_{\max}$.

### 15. If Class A (`0.30 m`) is blocked from all flood tiers (`0.50 m+`), why include Class A at all?
- Class A represents everyday LGU vans (L300/HiAce) and enforces **precautionary dry-corridor routing**—using unflooded roads to reach accessible shelters so scarce 4×4s and heavy trucks are reserved for flooded areas.
- It also serves as the **baseline tier** to demonstrate when standard vans get cut off and trigger the system's escalation advisory to Class B or C (**Pages 29, 35**).

### 16. What happens if an evacuation center—or the depot itself—is surrounded by deep water?
- Before optimization, we check **two-way reachability** (`Depot → Shelter` and `Shelter → Depot`) on the safe directed graph $G_{\text{safe}}$ (**Page 29**).
- Any unreachable shelter is excluded from the truck tour and flagged for **higher-clearance vehicles or rescue boats**. If the depot itself is isolated or fewer than 2 shelters are reachable, optimization stops and displays an **infeasibility advisory**.

---

## PART 3: OBJECTIVES, URGENCY & SYSTEM DESIGN

### 17. Why is the Urgency objective ($f_2$) necessary? How did you come up with the 1–5 rating?
- Without $f_2$, the problem is just single-objective distance minimization—there would be no trade-off and no need for multi-objective PSO. Literature (**Pages 15–16**; Ferrer et al., 2018; Lu et al., 2022; Altinoz & Altinoz, 2023) shows distance-only routing delays aid to the hardest-hit shelters.
- The *formula* (multiplying node urgency by cumulative arrival time) is adapted from **Altinoz & Altinoz (2023)**, while the **1–5 ordinal triage scale** (`1 = Low` to `5 = Critical`) is a standardized researcher-defined simulation input (**Pages 12, 25**) based on shelter flood exposure and evacuee need.

### 18. Why does Objective 1 ($f_1$) include the return trip to the depot, while Objective 2 ($f_2$) stops at the last shelter?
- $f_1$ measures total **vehicle distance and fuel usage** for the full round trip back to base (**Page 31**).
- $f_2$ measures **humanitarian waiting time**—how long stranded evacuees wait to receive aid (**Pages 31–32**). Once the last shelter gets its supplies, the evacuees' wait is over, regardless of how long the empty truck takes to drive home.

### 19. Your flood maps are static. Why do you call the system "Dynamic" routing?
- "Dynamic" here means **scenario-based dynamic re-optimization** (**Pages 34–35**): whenever a dispatcher switches flood return periods, changes vehicle class, or clicks to inject a manual roadblock ($M_e = 1$), the system dynamically rebuilds the feasible road network, updates distance/time matrices, and re-optimizes the Pareto routes. We explicitly state it does not use live flood sensors (**Page 8**).

### 20. Will this system work offline, or does it require internet?
- All **core geospatial intersection, graph pruning, and DMO-PSO calculations run 100% locally in Python** using stored UP NOAH shapefiles and cached OpenStreetMap graphs—meaning the routing engine itself works **offline** once the map is cached (ideal during typhoons).
- Internet is only needed for the initial OSMnx graph download and loading online web map tiles in the browser (unless offline tiles are cached), or if deployed on a remote web server.

---

## PART 4: TESTING, BASELINES & VALIDATION

### 21. Why compare DMO-PSO against Greedy Nearest-Neighbor (GNN) instead of another metaheuristic?
- GNN represents how standard naive routing or manual dispatch sequences stops step-by-step (either nearest distance or best immediate distance-to-urgency ratio).
- We test **two GNN regimes** (**Pages 36–37**):
  - **Flood-Constrained GNN (`C-GNN`):** Uses the *exact same flood-safe network* as DMO-PSO for a fair test of $f_1$ and $f_2$.
  - **Unconstrained GNN (`U-GNN`):** Uses *dry-pavement roads* to measure how often flood-blind routing violates flood constraints (`CSR`).
- On small instances, we also verify DMO-PSO against the **exact brute-force ground truth**.

### 22. Why measure Constraint Satisfaction Rate (CSR) if DMO-PSO is already designed to stay on safe roads?
- Since DMO-PSO and `C-GNN` search only over $G_{\text{safe}}$, they naturally achieve **100% CSR** on valid instances (**Page 39**).
- Measuring CSR against **Unconstrained GNN (`U-GNN`)** quantifies **how dangerous normal flood-blind routing is** across the 5-, 25-, and 100-year flood maps.

### 23. How do you validate the system if you cannot test it during a real typhoon?
- Following **Banks (2000)** (**Pages 20–21**):
  - **Verification** checks the math and code correctness using small hand-checkable test cases and brute-force optimal benchmarks.
  - **Validation** checks geographic alignment, OSMnx connectivity, and literature-grounded vehicle/flood parameters.
- As stated in **Ethical Considerations (Page 44)**, we explicitly limit our claims to a **simulated decision-support environment** rather than live field deployment without ground verification.

### 24. What statistical test will you use to compare DMO-PSO against the baselines?
- Repeated DMO-PSO runs are summarized per scenario (mean, median, SD, range) so multiple seeds aren't treated as separate scenarios, and matched paired comparisons are evaluated using the non-parametric **Wilcoxon signed-rank test** when normality assumptions do not hold (**Pages 41–42**).
