# RAFT Thesis Defense Study Guide (NotebookLM Source Document)
## Modules 1 & 2: Problem Context, Scope, Geospatial Processing, Flood Parameterization, and System Architecture

**Thesis Title:** Dynamic Routing of Relief Goods in High-Risk Coastal Areas of Cavite Using Discrete Multi-Objective Particle Swarm Optimization Under Flood Constraints
**Authors:** Kurt Michael L. Mirafelix, Princess Trisha M. Carias, Alcris S. Amulong
**Institution:** Cavite State University – Main Campus (BS Computer Science)
**Adviser & Technical Critic:** Dr. Marlon R. Pereña, Mr. Ace Amiel E. Malicsi, and Sir Neru

---

## SECTION 1: MODULE 1 — THE PROBLEM, STORY, AND SCOPE (CHAPTER 1)

### 1.1 Why Standard Navigation Apps Fail During Flood Disasters
When severe weather events—such as Severe Tropical Storm Paeng (2022), Super Typhoon Carina (2024), or Severe Tropical Storm Kristine (2024)—strike the low-lying coastal municipalities of Cavite (**City of Bacoor, Cavite City, Kawit, Noveleta, and Rosario**), standard consumer navigation apps (Google Maps, Waze) and classical point-to-point shortest-path algorithms (Dijkstra, A*) fail for three fundamental reasons:

1. **Point-to-Point Pathfinding vs. Multi-Stop Tour Sequencing:**
   Standard navigation computes a single path from Point A to Point B. However, during acute flood emergencies, low-clearance municipal vehicles are grounded by deep floodwaters, causing **acute fleet scarcity** (Ferrer et al., 2018; Phongmoo et al., 2023). A single surviving high-clearance relief truck must depart from the command depot, sequentially service **15 to 30 reachable barangay evacuation centers in one consolidated tour**, and return to the depot. Finding the optimal visiting sequence across multiple stops is a **Multi-Objective Traveling Salesperson Problem (MO-TSP)**, which is combinatorially **NP-hard**.
2. **Lack of Hydrostatic Vehicle-Specific Flood Passability:**
   Conventional routers calculate routes over nominal dry-pavement distances. Even when apps like Waze include crowd-sourced flood alerts, they do not model standing flood depths ($W_e$) against specific **vehicle wading-depth thresholds ($W_{\max}$)** or account for hydrodynamic speed reduction on partially flooded roads (Kramer et al., 2016; Pregnolato et al., 2017; Martínez-Gomariz et al., 2018).
3. **Lack of Humanitarian Urgency Prioritization:**
   Standard routing treats all destinations equally. In disaster response, evacuation centers have different levels of distress or urgency $U(\pi_k) \in [1, 5]$. Greedy distance-based routing exhibits **myopic (short-sighted) step-by-step selection**, visiting nearby low-urgency shelters first while stranding critical high-urgency shelters at the tail end of the delivery tour (Boonmee et al., 2017; Liu et al., 2020; Altinoz & Altinoz, 2023).

### 1.2 Why Urgency ($f_2$) Is Essential and How Literature Supports It
* **Mathematical Necessity for Multi-Objective Optimization:**
  A Multi-Objective Particle Swarm Optimization (DMO-PSO) algorithm requires at least **two competing objectives** to construct a non-dominated **Pareto front**. Without the urgency-weighted arrival latency objective ($f_2$), the routing problem reduces to a single-objective TSP minimizing only total distance ($f_1$), eliminating the trade-off surface, external Pareto archive, crowding distance, and knee-point selection.
* **6 Key Literature Citations Supporting Urgency and Arrival Latency in Chapter 2 (RRL, Pages 14–16):**
  1. **Altinoz & Altinoz (2023) [Page 16]:** Explicitly modeled a multi-objective VRP with **vertex urgency coefficients ($U_i$)** multiplied by cumulative arrival times, demonstrating that urgency weighting forces the optimizer to schedule high-severity nodes early in the tour sequence even when doing so requires a marginally longer total loop distance.
  2. **Lu et al. (2022) [Page 16]:** Formulated a multi-objective humanitarian VRP that minimizes arrival times to critical demand nodes to reduce unmet survival needs.
  3. **Ferrer et al. (2018) [Page 15]:** Demonstrated in last-mile flood and earthquake benchmarks that optimizing solely for transit distance or cost delays aid delivery to the most severely affected shelters.
  4. **Liu et al. (2020) [Page 15]:** Proved that post-disaster routing must evaluate rescue efficiency and **cumulative arrival times** alongside road network disruption rather than point-to-point shortest paths.
  5. **Boonmee et al. (2017) [Page 14]:** Showed that static, single-objective deterministic optimization models fail under post-disaster structural chaos.
  6. **Phongmoo et al. (2023) [Page 15]:** Established that under post-disaster road degradation and acute fleet scarcity, greedy heuristics strand high-priority nodes at the end of consolidated multi-stop tours.

### 1.3 Locked Scope and Limitations (Defense Shield — Pages 7–9)
* **5 Target Coastal LGUs:** City of Bacoor, Cavite City, Kawit, Noveleta, and Rosario. Inland upland municipalities are excluded to maintain computational focus on low-lying, flood-vulnerable coastal topologies.
* **Pluvial and Fluvial Rainfall Flooding Only (No Storm Surge):** Although these 5 LGUs border Manila Bay, the UP NOAH return-period shapefiles used in this study strictly model **extreme rainfall return-period inundation (pluvial surface runoff and fluvial riverine overflow)**, not wind-driven coastal storm surge hydrodynamics.
* **Scenario-Based Dynamic Re-optimization (No Live IoT Sensors):** "Dynamic" refers to recalculating feasible subgraphs, lookup matrices, and Pareto routes whenever the user changes the flood return period (5-, 25-, or 100-year), switches the active vehicle class (Class A, B, or C), or injects manual roadblock overrides ($M_e = 1$). It does not use real-time telemetric water-level sensors.
* **Single-Depot, Sufficient-Payload Consolidated Loop:** Models a single vehicle class per run departing from and returning to one central depot, visiting $n = 15\text{--}30$ reachable evacuation centers in full-scale simulations. Each vehicle is assumed to carry sufficient payload for its assigned tour (no split deliveries, multi-depot transfers, mechanical breakdowns, or fuel thermodynamics).

---

## SECTION 2: SIR NERU'S CRITIC NOTES — EXPLAINING FIGURE 2 (SYSTEM ARCHITECTURE)

### 2.1 Why the Top 3 Boxes in Figure 2 Must Be Explained Verbally
In Chapter 3, under the heading **Software Architecture and Algorithmic Design -> System Architecture and Data Flow**, the text immediately describes the **four main software components**:
1. Input Management Component
2. Geospatial Processing Component
3. Route Optimization Component
4. Web-Based Visualization Component

However, at the very top of **Figure 2**, three external input boxes feed into the system: **`[OpenStreetMap]`**, **`[Study Inputs]`**, and **`[UP NOAH]`**. While these are defined earlier in Chapter 1 (*Definition of Terms*) and Chapter 3 (*Materials and Geospatial Inputs*), the presenter must explicitly introduce them when walking through Figure 2.

### 2.2 Exact Definitions of the Three Top Boxes in Figure 2
1. **`OpenStreetMap` (OSM):**
   * **What it is:** An open-source, collaborative global geographic database of street networks, extracted via the **OSMnx** Python library (Boeing, 2017, 2025).
   * **What it feeds into the system:** The raw drivable street topology of Bacoor, Cavite City, Kawit, Noveleta, and Rosario modeled as a primal, non-planar **directed graph $G = (V, E)$**, where vertices $V$ represent street intersections and dead ends, and directed edges $E$ store actual curvilinear road lengths (meters), road geometries, and one-way directional flow restrictions.
2. **`Study Inputs` (Operational and Simulation Parameters):**
   * **What it is:** The scenario-specific operational parameters configured by the researcher or dispatcher for a simulation run (detailed in Chapter 3 under *Operational and Simulation Inputs* and inside Box 1 of Figure 2).
   * **The 5 Specific Items Inside `Study Inputs`:**
     1. **Depot and Evacuation Center Coordinates:** Geographic locations snapped to valid road graph vertices ($0, 1, \dots, n$).
     2. **Evacuation Center Urgency Weights ($U(\pi_k) \in [1, 5]$):** Priority rating assigned to each shelter (`1` = Low/routine, `5` = Critical/life-threatening).
     3. **Selected Vehicle Class Threshold ($W_{\max}$):** Active vehicle wading limit (`Class A = 0.30 m`, `Class B = 0.60 m`, `Class C = 1.00 m`).
     4. **Selected Flood Return Period:** Choice of `5-year`, `25-year`, or `100-year` UP NOAH rainfall recurrence scenario.
     5. **Manual Roadblock States ($M_e \in \{0, 1\}$):** Dispatcher-injected road closures (`M_e = 1`) representing non-flood blockages (e.g., fallen trees, collapsed bridges, vehicular accidents) or localized flash-flood closures.
3. **`UP NOAH` (University of the Philippines Nationwide Operational Assessment of Hazards):**
   * **What it is:** Standardized 1:10,000 scale LiDAR-derived rainfall return-period flood hazard maps published by DOST and UP NOAH for Philippine disaster risk reduction planning (Lagmay et al., 2017; Cadiz, 2018).
   * **What it feeds into the system:** Polygon shapefiles for the **5-year (20% annual exceedance probability)**, **25-year (4% AEP)**, and **100-year (1% AEP)** rainfall return periods, categorized into discrete hazard tiers (`Var = 1` Low: `0.1–0.5 m`; `Var = 2` Medium: `0.5–1.5 m`; `Var = 3` High: `> 1.5 m`), which are spatially intersected with OSM road edges to assign standing water depths ($W_e$).

---

## SECTION 3: MODULE 2 — GEOSPATIAL PROCESSING, FLOOD DEPTH TABLE 1, AND VEHICLE CLASSES (TABLE 2)

### 3.1 The "Two-Tier" Vehicle Classification Framework (Table 2 & Appendix B)
* **Why Appendix B is Titled "Two-Tier Vehicle Classification Matrix" Despite Having Three Classes (A, B, C):**
  As stated in the footnote (`Note.`) of Appendix B, **"Two-Tier" refers to the two tiers of evidence** combined to establish each vehicle class's maximum wading threshold ($W_{\max}$):
  * **Tier 1:** Peer-reviewed **hydrostatic stability and urban flood trafficability criteria** (Kramer et al., 2016; Pregnolato et al., 2017; Martínez-Gomariz et al., 2018), which account for vehicle buoyancy (floating) and lateral sliding instability.
  * **Tier 2:** **Representative commercial automotive manufacturer wading-depth specifications** (air-intake and electrical-system heights).
* **The Three Vehicle Archetypes:**
  * **Class A ($W_{\max} = 0.30\text{ m}$ / 300 mm):** Light commercial utility vans (e.g., Mitsubishi L300, Toyota HiAce, multicabs). Matches the `0.30 m` passenger/light-vehicle hydrostatic stability limit (Kramer et al., 2016; Pregnolato et al., 2017).
  * **Class B ($W_{\max} = 0.60\text{ m}$ / 600 mm):** Medium 4x4 emergency and field-support pickups (e.g., Toyota Hilux 4x4, Isuzu D-Max 4x4). Matches the `0.60 m` emergency-vehicle trafficability ceiling (Kramer et al., 2016; Martínez-Gomariz et al., 2018).
  * **Class C ($W_{\max} = 1.00\text{ m}$ / 1000 mm):** Heavy high-clearance disaster-response cargo trucks (e.g., Isuzu Forward, un-kitted military-spec 2.5-ton trucks). Although specialized military trucks with deep-water snorkel kits can reach `1.80 m` mechanical air-intake depth, Class C is capped at `1.00 m` because wheeled vehicles face empirical hydrostatic buoyancy and roadbed washout instability above `0.90–1.00 m` (Kramer et al., 2016; Martínez-Gomariz et al., 2018).

### 3.2 Intuitive Explanation of Table 1: Flood Hazard Categories and Assigned Depths ($W_e$)
* **The Core Modeling Problem:**
  The computer needs a **single number** for road water depth ($W_e$) to check the passability rule:
  $$\text{Passable if } W_e \le W_{\max}$$
  However, UP NOAH shapefiles provide **depth ranges** (`Low: 0.1–0.5 m`, `Medium: 0.5–1.5 m`, `High: > 1.5 m`) rather than single numbers. Therefore, Table 1 assigns a representative simulation depth to each category using a **precautionary boundary-and-bracketing rationale**:

| UP NOAH Hazard Tier | Mapped Depth Range | Assigned Simulation Depth ($W_e$) | Class A ($0.30\text{ m}$) | Class B ($0.60\text{ m}$) | Class C ($1.00\text{ m}$) |
| :--- | :--- | :--- | :---: | :---: | :---: |
| **Unflooded (Dry)** | `0.00 m` | **`0.00 m`** | ✅ Pass (Nominal speed) | ✅ Pass (Nominal speed) | ✅ Pass (Nominal speed) |
| **Low (`Var = 1`)** | `0.10 – 0.50 m` | **`0.50 m`** *(Upper Bound)* | ❌ **Blocked** | ✅ Pass *(Slowed)* | ✅ Pass *(Slowed)* |
| **Medium (`Var = 2`)** | `0.50 – 1.50 m` | **`1.00 m`** *(Baseline Midpoint)* | ❌ **Blocked** | ❌ **Blocked** | ✅ Pass *(Slowed)* |
| **Medium (Sensitivity)** | `0.50 – 1.50 m` | **`1.50 m`** *(Sensitivity Upper Bound)* | ❌ **Blocked** | ❌ **Blocked** | ❌ **Blocked** |
| **High (`Var = 3`)** | `> 1.50 m` | **`1.50 m`** *(Exclusion Marker)* | ❌ **Blocked** | ❌ **Blocked** | ❌ **Blocked** |

1. **Why Low Hazard (`0.1–0.5 m`) Uses the Upper Bound (`0.50 m`) Instead of the Midpoint (`0.30 m`):**
   * The Class A limit (`0.30 m`) sits at the exact midpoint of `0.1–0.5 m`.
   * If we assigned the midpoint `0.30 m`, then under the rule $W_e \le W_{\max}$, `0.30 <= 0.30` would be **True**, classifying 100% of Low-Hazard flooded streets as safe for Mitsubishi L300 vans—even though water in those polygons reaches `0.31–0.50 m` and would stall or float the van!
   * Meanwhile, for Class B (`0.60 m`) and Class C (`1.00 m`), the entire `0.1–0.5 m` interval is below their limits whether we pick `0.30 m` or `0.50 m`.
   * Thus, picking **`0.50 m`** enforces a precautionary safety exclusion for Class A vans while keeping Low-Hazard roads passable (with speed reduction) for Classes B and C.
2. **Why Medium Hazard (`0.5–1.5 m`) Uses the Midpoint (`1.00 m`) as Baseline + Upper Bound (`1.50 m`) as Sensitivity Check:**
   * Medium Hazard spans a full 1.0-meter range (`0.5–1.5 m`) that straddles the `1.00 m` limit of Class C heavy trucks while exceeding Class A (`0.30 m`) and Class B (`0.60 m`).
   * If we only used the upper bound (`1.50 m`), then Medium Hazard (`1.50 m`) and High Hazard (`1.50 m`) would become mathematically identical—blocking all three vehicle classes equally and erasing the operational difference between Class B pickups (`0.60 m`) and Class C heavy response trucks (`1.00 m`).
   * Therefore, we **bracket** the interval:
     * **Baseline (`1.00 m` midpoint):** Blocks Classes A and B, but allows Class C (`1.00 m`) to traverse Medium-hazard corridors at reduced speed.
     * **Sensitivity Check (`1.50 m` upper bound):** Evaluates worst-case network collapse when Medium-hazard roads reach maximum depth and block even Class C trucks.
3. **Why High Hazard (`> 1.5 m`) Uses `1.50 m`:**
   * Since `1.50 m` exceeds the highest modeled vehicle limit (`1.00 m`), it serves as a strict numerical exclusion marker that blocks all three wheeled vehicle classes.
4. **Multiple-Polygon Rule:**
   * If a single road segment intersects multiple flood hazard polygons, the **highest applicable assigned depth** is used as the conservative segment-level parameter.

### 3.3 Accessibility Indicator ($A_e$), Speed Disruption, and Precomputed Lookup Matrices
* **Accessibility Equation:**
  $$A_e = \begin{cases} 1, & \text{if } W_e \le W_{\max} \text{ and } M_e = 0 \\ 0, & \text{if } W_e > W_{\max} \text{ or } M_e = 1 \end{cases}$$
  * If $A_e = 0$, road segment $e$ is pruned from the graph.
  * If $A_e = 1$, road segment $e$ is retained in the feasible subgraph $G_{\text{safe}}$, and if $0 < W_e \le W_{\max}$, travel time on that segment is adjusted using a depth-disruption speed relationship informed by **Pregnolato et al. (2017)**.
  * **Nested Subgraph Property:** Under identical flood and roadblock conditions, $G_{\text{safe}}(\text{Class A}) \subseteq G_{\text{safe}}(\text{Class B}) \subseteq G_{\text{safe}}(\text{Class C})$.
* **Two-Way Reachability Filtering (Why Both Directions Are Checked):**
  * Because OpenStreetMap road networks are **directed graphs** (containing one-way streets and divided roads), the existence of a valid path from the Depot to an Evacuation Center ($0 \to i$) does **not** guarantee a valid return path from that Evacuation Center back to the Depot ($i \to 0$).
  * Therefore, an evacuation center is included in the routing instance **only if both a feasible directed path from the depot to the center AND a feasible directed path from the center back to the depot exist** in $G_{\text{safe}}$.
  * Unreachable centers are flagged for higher-clearance or amphibious/boat dispatch. If the depot is isolated or fewer than 2 centers are reachable, optimization halts with an infeasibility advisory.
* **Why Lookup Matrices Are Precomputed:**
  * Running shortest-path graph searches inside every particle update of DMO-PSO would be computationally expensive. Instead, shortest flood-safe distances $d(u, v)$ and flood-adjusted travel times $t(u, v)$ along those paths are precomputed **once** per scenario into lookup matrices before DMO-PSO runs.

---

## SECTION 4: TOUGH PANEL Q&A SCENARIOS ON FLOOD & ROADBLOCK MODELING

### Q1: "What if the shapefile says an area has high flood depth, or the government classifies the event as a 5-year flood, but in reality the actual flooding on the ground is much lower?"
* **Important Rule on $M_e$:** In the equation $A_e = 1 \iff (W_e \le W_{\max} \text{ and } M_e = 0)$, the manual override flag $M_e = 1$ is strictly a **conservative restriction** that blocks open roads (e.g., accidents, fallen trees, collapsed bridges, or localized flash floods). It **cannot** force-unblock a flooded polygon where $W_e > W_{\max}$.
* **Three-Part Defense Argument:**
  1. **UP NOAH Standards & Passability of Low-Hazard Roads:** Under DOST and UP NOAH standards (Lagmay et al., 2017; Cadiz, 2018), the **5-year return period is the lowest official hydrological hazard map** published in the Philippines. Furthermore, in our model, **Low-hazard polygons (`0.1–0.5 m`) do NOT block Class B (`0.60 m`) or Class C (`1.00 m`) emergency vehicles**—they remain passable with speed adjustments, and only detour low-clearance Class A passenger vans (`0.30 m`). If flooding is milder than a 100-year or 25-year projection, the user steps down to the **5-year scenario**.
  2. **Precautionary Fail-Safe Principle in Pre-Dispatch Planning:** Without live street-level water sensors on every road in coastal Cavite, disaster routing must follow an asymmetric risk principle (Ethical Considerations, p. 41): detouring a Class A van around a street that *might* only have `0.15 m` of water merely adds a minor distance penalty, whereas routing a van into a street that reaches `0.40 m` results in a stalled vehicle and stranded relief goods.
  3. **Handling Minor Rain Below a 5-Year Event:** As stated in our Scope and Limitations, this system is a scenario-based simulation prototype rather than a live IoT digital twin. However, if a minor rain event causes almost no general inundation except on a few specific streets, the dispatcher can simply run the **unflooded nominal road network (`W_e = 0.00 m`)** and use **Manual Roadblocks ($M_e = 1$)** to block only the specific streets reported as impassable by field teams.


---

## SECTION 5: MODULE 3 — MATHEMATICAL FORMULATION OF THE ROUTING PROBLEM (PRINTED PAGES 31–32)

### 5.1 Route Permutation Encoding (Page 31)
Each candidate solution represents a complete multi-stop delivery tour starting and ending at the dispatch depot:
$$\pi = (\pi_0, \pi_1, \dots, \pi_n, \pi_{n+1})$$
* **$\pi_0 = \pi_{n+1} = 0$:** Represents the **Dispatch Depot** (departure at $\pi_0$, return at $\pi_{n+1}$).
* **$(\pi_1, \dots, \pi_n)$:** A valid **permutation** (visiting order) of the $n$ reachable evacuation centers ($n = 15\text{--}30$ in full-scale simulations), where each reachable center is served **exactly once** before returning to the depot.

### 5.2 Objective 1 ($f_1$): Minimize Total Transit Distance (Page 31)
$$\min f_1(\pi) = \sum_{k=0}^{n} d(\pi_k, \pi_{k+1})$$
* **$d(\pi_k, \pi_{k+1})$:** Shortest flood-safe road distance (in kilometers) between consecutive stops $\pi_k$ and $\pi_{k+1}$, retrieved from the precomputed Distance Matrix over $G_{\text{safe}}$.
* **Why $f_1$ sums from $k = 0$ to $n$ (including $\pi_{n+1}$):** Because $f_1$ measures the **complete operational tour distance** of the relief vehicle, including the return leg from the final shelter back to the depot ($d(\pi_n, \pi_{n+1})$).

### 5.3 Objective 2 ($f_2$): Minimize Cumulative Urgency-Weighted Arrival Latency (Pages 31–32)
$$\min f_2(\pi) = \sum_{k=1}^{n} U(\pi_k) \, T(\pi_k)$$
where the **Cumulative Arrival Time $T(\pi_k)$** (Page 32) is:
$$T(\pi_k) = \sum_{j=0}^{k-1} t(\pi_j, \pi_{j+1})$$
* **$t(\pi_j, \pi_{j+1})$:** Flood-adjusted travel time (in hours) between consecutive stops (Pregnolato et al., 2017).
* **$T(\pi_k)$:** Cumulative elapsed travel time from the moment the vehicle leaves the depot ($\pi_0$) until it arrives at the $k$-th evacuation center ($\pi_k$).
* **$U(\pi_k) \in [1, 5]$ (Page 12 & Page 25):** Discrete 5-level ordinal urgency weight (`1` = Low, `5` = Critical).
* **Why $f_2$ stops at $n$ (excludes $\pi_{n+1}$):** Because $f_2$ measures when stranded communities receive relief goods, not when the empty truck returns to the depot.

---

## SECTION 6: MODULE 4 & 5 — DMO-PSO MECHANICS, BASELINES, AND EVALUATION METRICS (PRINTED PAGES 32–43)

### 6.1 Swap Operators, Swap Sequences, and Pareto Archive (Pages 32–34)
* **Particle Position:** A valid permutation of reachable shelters.
* **Swap Operator $SO(i, j)$:** Swaps two positions in the tour so the sequence stays a valid permutation without duplicates.
* **Swap Sequence $SS$:** A chain of Swap Operators acting as discrete velocity toward $pBest$ and $gBest$ (Emambocus et al., 2021).
* **External Pareto Archive & Crowding Distance:** Stores non-dominated solutions and uses Crowding Distance (Bacar & Rawhoudine, 2021) to pick leaders from less-crowded regions and prune excess solutions.
* **3 Output Routes (Page 34):** Minimum-$f_1$ (Shortest Distance), Minimum-$f_2$ (Critical-First), and Compromise Knee-Point (Balanced).

### 6.2 The 4 Testing Metrics Explained Simply (Pages 39–41)
1. **Constraint Satisfaction Rate (CSR — Page 39):**
   $$\text{CSR} = \frac{N_{\text{feasible}}}{N_{\text{evaluated}}} \times 100\%$$
   The percentage of generated routes that do NOT step on any flooded road deeper than the truck's limit ($W_e > W_{\max}$) or any manually blocked street ($M_e = 1$). Even ONE bad street makes the whole route fail (`0`). Used to show how often flood-blind Unconstrained GNN (`U-GNN`) fails compared to flood-aware DMO-PSO (`100%`).
2. **Convergence Stability (Page 40):**
   Because DMO-PSO starts with random guesses and uses probability, running it 30 times could theoretically give 30 wildly different answers. Convergence Stability checks if running DMO-PSO over and over (with different random seeds) still lands on nearly the **same high-quality routes** every time (low standard deviation).
3. **Hazard-Depth Sensitivity (Page 40):**
   Checks "What if the Orange (Medium-flood, `0.5–1.5 m`) streets are actually at their worst-case depth (`1.50 m`) instead of their middle depth (`1.00 m`)?" We run the big Class C truck (`1.00 m` limit) under both settings and compare how many shelters get cut off and how much longer the detours get.
4. **Execution and Re-optimization Runtime ($T_{\text{exec}}$ — Pages 40–41):**
   A stopwatch test split into two parts: (a) how many seconds it takes to build the flood-safe map and lookup tables (**preprocessing time**), and (b) how many seconds DMO-PSO takes to find the routes (**optimization/re-optimization time**) when a user clicks a roadblock or changes a setting.
