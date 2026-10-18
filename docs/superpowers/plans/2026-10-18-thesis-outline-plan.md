# Thesis Outline Bulletproofing & Methodology Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bulletproof Chapter 1 against defense panel critiques—using a Two-Tier Vehicle Classification Framework grounded in multi-class flood trafficability literature (`Kramer et al., 2016; Martínez-Gomariz et al., 2018`) and continuous speed-depth disruption (`Pregnolato et al., 2017`) that seamlessly accommodates Cavite PDRRMO's actual fleet inventory when acquired, justifying multi-stop tour routing under fleet scarcity (`Ferrer et al., 2018; Phongmoo et al., 2023`), and clarifying GNN baselines—and write the complete 4-subsection Chapter 3 Methodology in `Attachment 4 - Thesis Outline Format.md`.

**Architecture:** Modify `Attachment 4 - Thesis Outline Format.md` in three sequential, self-contained edits using `replace_file_content`, followed by an automated verification script that checks section headers, in-text citations vs. reference list parity, and mathematical notation consistency.

**Tech Stack:** Markdown, LaTeX math notation, Python (for automated manuscript verification).

## Global Constraints

- Target manuscript file: `c:\Users\GUEST-PC\raft\Attachment 4 - Thesis Outline Format.md`
- Preserve all institutional template numbering lines (`1`, `2`, `3`, etc.) and table formatting.
- Do not introduce any unverified references; every in-text citation `(Author, Year)` must match an entry in `**REFERENCES**`.
- Use the **Two-Tier Vehicle Classification Framework**: anchor the Class A ($0.30\text{ m}$), Class B ($0.60\text{ m}$), and Class C ($1.00\text{ m}$) thresholds in **Kramer et al. (2016)** and **Martínez-Gomariz et al. (2018)** (multi-class flood trafficability and stability) + **Pregnolato et al. (2017)** (speed-depth disruption curve), while allowing actual Cavite PDRRMO / MDRRMO response vehicles to be mapped into those three classes based on manufacturer wading specifications.
- Frame the web interface strictly as a **visual simulation and route presentation layer**, keeping the primary contribution focused on the **DMO-PSO routing algorithm**.

---

### Task 1: Bulletproof Chapter 1 (SOP, Objectives, Hypothesis, Significance, Scope & Terms)

**Files:**
- Modify: `c:\Users\GUEST-PC\raft\Attachment 4 - Thesis Outline Format.md:110-180`

**Interfaces:**
- Consumes: Existing Chapter 1 text (`**Statement of the Problem**` through `**Urgency-Weighted Arrival Latency (${f}_{2}$).**`).
- Produces: Bulletproof Chapter 1 text with explicit `NDRRMC (2024)` citation, `Kramer et al. (2016)` + `Martínez-Gomariz et al. (2018)` + `Pregnolato et al. (2017)` Two-Tier Vehicle Classification grounding, `Ferrer et al. (2018)` / `Phongmoo et al. (2023)` multi-stop fleet-scarcity justification, and `GNN-Distance` / `GNN-Urgency` vs. Pareto knee-point hypothesis definitions.

- [x] **Step 1: Replace Chapter 1 sections (`Statement of the Problem` through `Definition of Terms`) in `Attachment 4 - Thesis Outline Format.md`**

Use `replace_file_content` on `c:\Users\GUEST-PC\raft\Attachment 4 - Thesis Outline Format.md` (lines 110–180) with the following exact `TargetContent` and `ReplacementContent`:

**TargetContent:**
```markdown
**Statement of the Problem**	

Empirical observations and post-disaster situation reports from the NDRRMC and the PDRRMO indicate that severe meteorological disturbances such as Typhoons Paeng (Nalgae), Carina (Gaemi), and Kristine (Trami) routinely trigger catastrophic coastal inundation and flash riverine overflow across the low-lying coastal corridor of Cavite, notably within Bacoor, Cavite City, Kawit, Noveleta, and Rosario. At present, local logistics personnel rely on subjective human judgment or consumer-grade navigation applications (such as Google Maps or Waze) that calculate paths based strictly on Euclidean shortest distance or nominal dry-pavement traffic conditions. These off-the-shelf tools possess zero awareness of localized hydrological depths, temporal flood cresting, or the specific wading tolerances of deployment vehicles, routinely stranding relief personnel, damaging perishable aid, and producing uncoordinated, delayed deliveries to isolated evacuation centers (Pregnolato et al., 2017; Petricola et al., 2022).

In humanitarian logistics literature, vehicle routing within disaster-stricken environments is recognized as a complex variant of the VRP and TSP, fundamentally classified as NP-hard. Traditional logistics optimization models focus predominantly on minimizing monetary cost or travel distance across stable, fully traversable networks (Liu et al., 2020). However, in post-disaster scenarios characterized by physical network degradation and sudden link destruction, conventional single-objective and deterministic routing algorithms become computationally insufficient and fail to scale when handling dynamically changing road impassability and multiple multi-stop delivery loops (Boonmee et al., 2017; de Veluz et al., 2023; Phongmoo et al., 2023).

Consequently, a critical operational gap exists due to the absence of an automated, constraint-aware dynamic routing decision support system capable of integrating topological road network data, spatial flood hazard layers, and physical vehicle wading limits for the flood-vulnerable coastal municipalities of Cavite. Current dispatch mechanisms lack the algorithmic capacity to simultaneously weigh route distances against localized urgency demands while proactively bypassing inundated road segments, resulting in high logistics failure rates and inequitable aid arrival times during acute disaster response windows.

To address this problem, this study develops a web-based dynamic routing decision support engine utilizing a DMO-PSO algorithm. By interfacing OpenStreetMap road networks with UP NOAH flood hazard layers and vehicle wading depth limits, the system provides emergency dispatchers with Pareto-optimal route schedules that minimize total transit distance and urgency-weighted arrival latency across the vulnerable coastal areas of Bacoor, Cavite City, Kawit, Noveleta, and Rosario.

**Objectives of the Study**

	The general objective of this study is to develop a web-based dynamic routing decision support system for disaster relief distribution in Cavite using a Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) algorithm under simulated return-period flood constraints and interactive roadblock inputs. Specifically, it aims to:

1. Extract and construct a mathematical road network graph of the target coastal Cavite municipalities from OpenStreetMap data using the OSMnx library, and spatially intersect its edges with digitized UP NOAH flood hazard shapefiles.  
2. Build a DMO-PSO model in a Python-based backend environment using permutation strings and swap operators to simultaneously minimize total transit distance and urgency-weighted arrival latencies across multi-stop routing loops.  
3. Establish a vehicle classification framework (Class A, B, and C) that treats manufacturer-standard wading depth (${W}_{max}$) limits as mathematical hard-penalties within the fitness function to classify road segments as impassable under the assumed flood-depth scenario.   
4. Test and validate the DMO-PSO engine through simulated flood scenarios against a baseline Greedy Nearest-Neighbor (GNN) heuristic to statistically evaluate comparative solution quality specifically total transit distance, urgency-weighted arrival latency, and constraint satisfaction rate while profiling algorithmic convergence stability and execution runtime (${T}_{exec}$) as descriptive computational performance metrics.

**Hypothesis**

	To validate the computational effectiveness and operational performance of the proposed Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) dynamic routing engine compared to the baseline Greedy Nearest-Neighbor (GNN) heuristic across the vulnerable coastal corridor of Cavite under simulated flood constraints, the following null (${H}_{0}$) and alternative (${H}_{a}$) hypotheses are tested:

1. **Total Transit Distance**  
* **${H}_{01}:{\ }$**There is no significant difference in the total transit distance of relief distribution routes generated by the DMO-PSO algorithm compared to routes generated by the baseline GNN heuristic under simulated flood constraints.  
* ${H}_{a1}:{\ }$Relief distribution routes generated by the DMO-PSO algorithm achieve a significantly lower total transit distance compared to those generated by the baseline GNN heuristic under simulated flood constraints.  
  2. **Urgency-Weighted Arrival Latency**  
* **${H}_{02}:{\ }$**There is no significant difference in the cumulative urgency-weighted arrival latency achieved by the DMO-PSO algorithm compared to the baseline GNN heuristic across designated distribution nodes.  
* ${H}_{a2}:{\ }$The DMO-PSO algorithm achieves a significantly lower cumulative urgency-weighted arrival latency compared to the baseline GNN heuristic by effectively prioritizing delivery to high-severity evacuation locations.  
  3. **Constraint Satisfaction Rate**   
* **${H}_{03}:{\ }$**There is no significant difference in the Constraint Satisfaction Rate with respect to manufacturer-standard vehicle wading depths (${W}_{max}$) between routes computed by the DMO-PSO algorithm and those generated by the baseline GNN heuristic under simulated flood depths.  
* ${H}_{a3}:{\ }$The DMO-PSO algorithm achieves a significantly higher Constraint Satisfaction Rate than the baseline GNN heuristic by enforcing mathematical penalty functions that effectively bypass road segments exceeding vehicle wading limits.


**Significance of the Study**

This study provides technical and practical value to several key stakeholders:

1. Local Government Units and DRRM Offices: Provides a specialized, web-based decision support system that replaces subjective dispatch estimates with scientifically validated, constraint-aware routing layouts.  
2. Relief Drivers and Logistics Teams: Mitigates logistical routing failures by proactively identifying road segments where estimated flood depths exceed vehicle limits and generating detours that comply with vehicle wading thresholds before deployment.  
3. Affected Communities: Optimizes delivery order based on quantified disaster urgency metrics and priority, ensuring that underserved, remote, or highly critical areas are prioritized over basic geographical proximity.  
4. Academic Community: Contributes to the fields of Data Science and Web Engineering by demonstrating how continuous metaheuristic algorithms can be successfully discretized and integrated into modern web prototypes to solve spatial network routing problems.

**Scope and Limitations**

	The primary focus of this study is the development and algorithmic validation of a web-based dynamic routing decision support system for humanitarian disaster relief operations. The system formulates relief distribution as a multi-objective variant of Traveling Salesperson Problem (TSP) under environmental hazard constraints. The specific scope encompasses the following components:

1. **Geographic Delimitation**: The scope area of this study strictly focuses on the low-lying, highly flooded vulnerable coastal part of Cavite specifically covering the City of Bacoor, Cavite City, Kawit, Noveleta, and Rosario. These specific areas are prioritized due to their low topographic elevation and high flood depths, high exposure to coastal storm surges, backwater river flow, and recurring isolation during monsoon seasons and tropical cyclones. Other municipalities of Cavite are excluded from the active routing network to maintain computational focus on high-risk coastal zones.  
2. **Static and Simulated Hazard Layers**: Flood hazard assessments rely on digitized static return-period models from UP NOAH and simulated hydrological data rather than live, real-time physical sensors. Road condition changes depend on manual input from dispatcher via dashboard’s interactive roadblock override feature rather than automated sensor ingestion.  
3. **Logistics and Dispatch Assumptions**: The routing model assumes a centralized single-depot dispatch workflow following standard LGU/MDRRMO relief operations, where relief goods are pre-positioned at a designated municipal command center and dispatched in single-vehicle loops to designated barangay evacuation centers with pre-assessed urgency weights. Furthermore, because the study formulates the routing loop as a constrained Multi-Objective TSP rather than a split-delivery Capacitated VRP, each dispatched vehicle is assumed to carry sufficient payload for its assigned loop. Vehicle mechanical failures, traffic signal timings, driver fatigue limits, and fuel consumption thermodynamics are outside the scope of the mathematical formulation.

**Definition of Terms**

**Class A, B, and C Relief Vehicles.** Categorized transportation assets classified according to physical payload capacity, chassis height, and operational wading capability under flood constraints: Class A (Light Commercial Vans, ${W}_{max}=0.30\text{ m}$), Class B (Medium $4\times 4$ Support Trucks, ${W}_{max}=0.60\text{ m}$), and Class C (Heavy Utility Trucks, ${W}_{max}=1.00\text{ m}$).

**Constraint Satisfaction Rate (CSR).** Represents the percentage of planned relief delivery loops generated by the routing algorithm that do not route any vehicle across a road edge whose flood depth exceeds that vehicle's certified wading depth (${W}_{max}$).

**Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO).** An optimization technique derived from swarm intelligence that refers to the specialized algorithm developed in Python that models relief routing sequences as discrete permutation vectors, utilizing swap operators and swap sequences to navigate the Pareto front and simultaneously minimize total travel distance (${f}_{1}$) and urgency-weighted arrival latency (${f}_{2}$).

**Greedy Nearest-Neighbor (GNN).** A deterministic heuristic algorithm that builds a routing path by iteratively choosing the unvisited node closest to the current location (or highest in priority). It serves as a baseline benchmark algorithm against which the solution quality, route latency, and constraint compliance of the DMO-PSO engine are comparatively evaluated.

**Maximum Wading Depth (${W}_{max}$).** The highest water depth through which a specific motorized vehicle can safely traverse without stalling, hydrodynamic lift, or engine water ingestion. It is the numerical threshold in meters/millimeters assigned to each vehicle class and used as the hard constraint ceiling against the intersected UP NOAH flood depth values.

**OpenStreetMap (OSM) / OSMnx.** The primary computational pipeline used to extract the raw spatial roadway geometry of the target coastal Cavite municipalities and convert it into a NetworkX mathematical graph structure $G=(V,E)$.

**Pareto Front and External Archive.** The set of non-dominated routing solutions in a multi-objective search space where neither total travel distance (${f}_{1}$) nor urgency-weighted arrival latency (${f}_{2}$) can be improved without degrading the other, maintained across swarm iterations via an external repository pruned by crowding distance.

**Return-Period Flood Depth.** The simulated maximum inundation depth (classified into low: $0.1\text{ m}\text{--}0.5\text{ m}$, medium: $0.5\text{ m}\text{--}1.5\text{ m}$, and high: $>1.5\text{ m}$ hazard levels) derived from UP NOAH hydrological models corresponding to statistical rainfall recurrence intervals (such as the 5-year, 25-year, and 100-year return periods) used as spatial constraints in the routing graph.

**Urgency-Weighted Arrival Latency (${f}_{2}$).** A humanitarian logistics metric that prioritizes rapid aid delivery to populations facing the highest severity of distress over pure geographic proximity. It is computed as the sum of the products of the cumulative transit time to reach each delivery node $k$ (${T}_{\pi(k)}$) and that node's urgency rating $U(\pi_k) \in [1, 5]$, formulated as ${f}_{2}(\pi)=\sum_{k=1}^{n} U(\pi_k)\times {T}_{\pi(k)}$ such that higher-priority evacuation centers penalize late arrivals more heavily in the multi-objective fitness function.
```

**ReplacementContent:**
```markdown
**Statement of the Problem**	

Post-disaster situational reports from the National Disaster Risk Reduction and Management Council (NDRRMC, 2024) indicate that severe meteorological disturbances such as Typhoons Paeng (Nalgae), Carina (Gaemi), and Kristine (Trami) routinely trigger widespread coastal inundation and riverine overflow across the low-lying coastal corridor of Cavite, notably within Bacoor, Cavite City, Kawit, Noveleta, and Rosario. During acute flood emergencies when low-clearance vehicles are grounded by deep water and flood-capable trucks are scarce, a single dispatched relief unit must sequentially service multiple isolated barangay evacuation centers in a consolidated multi-stop tour rather than returning to the depot after every single drop (Ferrer et al., 2018; Phongmoo et al., 2023). However, conventional consumer navigation applications (such as Google Maps or Waze) and greedy shortest-path heuristics calculate routes strictly based on nominal dry-pavement distances. Because these tools possess zero awareness of localized flood inundation depths, vehicle-class hydrostatic wading limits, or differentiated shelter urgency levels, they frequently route relief vehicles into impassable flooded corridors or delay critical deliveries to high-severity evacuation centers (Kramer et al., 2016; Pregnolato et al., 2017; Petricola et al., 2022).

In humanitarian operations research, multi-stop relief routing across disrupted infrastructure is formulated as a constrained, multi-objective variant of the Traveling Salesperson Problem (TSP) and Vehicle Routing Problem (VRP), which is fundamentally NP-hard. Traditional logistics optimization models focus predominantly on minimizing monetary cost or travel distance across stable, fully traversable road networks (Liu et al., 2020). Under post-disaster network degradation, however, single-objective deterministic and greedy heuristics become computationally myopic—either selecting locally proximate stops while stranding high-urgency nodes at the end of the tour, or failing to bypass road segments that exceed vehicle wading depth ceilings (Boonmee et al., 2017; de Veluz et al., 2023; Phongmoo et al., 2023).

Consequently, a critical methodological gap exists due to the absence of a constraint-aware multi-objective routing algorithm that unifies real-world OpenStreetMap road topologies, multi-return-period UP NOAH flood hazard layers (5-year, 25-year, and 100-year recurrence intervals), and stratified vehicle wading depth thresholds (${W}_{max}$) for the flood-vulnerable coastal corridor of Cavite. Existing routing mechanisms lack the metaheuristic capacity to simultaneously minimize total tour distance and cumulative urgency-weighted arrival latency while enforcing hard flood-passability constraints across degraded street graphs.

To address this problem, this study develops and validates a dynamic routing optimization engine powered by a Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) algorithm, paired with a lightweight web-based map visualization interface. Using the high-risk coastal municipalities of Bacoor, Cavite City, Kawit, Noveleta, and Rosario as an empirical geospatial testbed, the engine intersects OpenStreetMap road networks with UP NOAH flood hazard shapefiles and hydrostatic vehicle wading constraints to generate Pareto-optimal multi-stop relief delivery schedules.

**Objectives of the Study**

	The general objective of this study is to develop and validate a Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) dynamic routing engine—supported by an interactive web-based map visualization—for multi-stop disaster relief distribution across the high-risk coastal areas of Cavite under UP NOAH return-period flood constraints and manual roadblock overrides. Specifically, it aims to:

1. Extract and construct a mathematical road network graph $G=(V,E)$ of the target coastal Cavite municipalities (Bacoor, Cavite City, Kawit, Noveleta, and Rosario) from OpenStreetMap data using the OSMnx library, and spatially intersect its edges with digitized 5-year, 25-year, and 100-year UP NOAH flood hazard shapefiles.  
2. Build a DMO-PSO algorithmic model in Python utilizing discrete permutation encoding, swap operators, swap sequences, and crowding-distance Pareto archiving to simultaneously minimize total transit distance (${f}_{1}$) and urgency-weighted arrival latency (${f}_{2}$) across multi-stop relief routing loops.  
3. Establish a two-tier vehicle classification framework (Class A, B, and C) grounded in empirical hydrostatic flood-trafficability criteria (Kramer et al., 2016; Martínez-Gomariz et al., 2018) and manufacturer wading depth (${W}_{max}$) specifications as mathematical hard-penalties and speed-degradation factors within the fitness evaluation.   
4. Test and validate the DMO-PSO engine across simulated 5-year, 25-year, and 100-year flood scenarios (and manual roadblock injections) against baseline Greedy Nearest-Neighbor heuristics (`GNN-Distance` and `GNN-Urgency`) to statistically evaluate comparative solution quality—specifically total transit distance (${f}_{1}$), urgency-weighted arrival latency (${f}_{2}$), and Constraint Satisfaction Rate (CSR)—while profiling algorithmic convergence stability and execution runtime (${T}_{exec}$) as descriptive computational performance metrics.

**Hypothesis**

	To validate the computational effectiveness and solution quality of the proposed Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) routing engine (evaluated via its Pareto-optimal frontier and compromise knee-point routes) against the unconstrained deterministic Greedy Nearest-Neighbor baselines (`GNN-Distance` and `GNN-Urgency`) across the coastal Cavite testbed under simulated 5-year, 25-year, and 100-year flood constraints, the following null (${H}_{0}$) and alternative (${H}_{a}$) hypotheses are tested:

1. **Total Transit Distance (${f}_{1}$)**  
* **${H}_{01}:{\ }$**There is no significant difference in the total traversable transit distance (${f}_{1}$) of relief distribution routes generated by the DMO-PSO algorithm compared to routes generated by the baseline GNN heuristics under simulated flood constraints.  
* ${H}_{a1}:{\ }$Relief distribution routes generated by the DMO-PSO algorithm achieve a significantly lower total traversable transit distance (${f}_{1}$) compared to those generated by the baseline GNN heuristics under simulated flood constraints.  
  2. **Urgency-Weighted Arrival Latency (${f}_{2}$)**  
* **${H}_{02}:{\ }$**There is no significant difference in the cumulative urgency-weighted arrival latency (${f}_{2}$) achieved by the DMO-PSO algorithm compared to the baseline GNN heuristics across designated distribution nodes.  
* ${H}_{a2}:{\ }$The DMO-PSO algorithm achieves a significantly lower cumulative urgency-weighted arrival latency (${f}_{2}$) compared to the baseline GNN heuristics by effectively prioritizing early delivery to high-urgency evacuation nodes along feasible detours.  
  3. **Constraint Satisfaction Rate (CSR)**   
* **${H}_{03}:{\ }$**There is no significant difference in the Constraint Satisfaction Rate (CSR) with respect to vehicle hydrostatic wading depth limits (${W}_{max}$) between routes computed by the DMO-PSO algorithm and those generated by conventional unconstrained GNN baseline routing under simulated flood depths.  
* ${H}_{a3}:{\ }$The DMO-PSO algorithm achieves a significantly higher Constraint Satisfaction Rate (CSR) than conventional unconstrained GNN baseline routing by enforcing mathematical hard-penalty functions that prune road segments exceeding vehicle wading limits.


**Significance of the Study**

This study provides algorithmic, methodological, and practical value to the following stakeholders:

1. Disaster Logistics Planners and DRRM Agencies: Provides an empirically validated algorithmic reference model and visual simulation tool that demonstrates how multi-objective swarm optimization can generate flood-safe, priority-aware multi-stop dispatch schedules during fleet-constrained coastal flood emergencies.  
2. Relief Operations and Fleet Dispatch Teams: Illustrates how mathematical wading-depth constraint handling proactively identifies inundated road corridors exceeding vehicle tolerances (${W}_{max}$) and computes feasible detours before vehicle deployment.  
3. Vulnerable Coastal Communities: Prioritizes delivery sequencing using quantified urgency weights alongside network travel times, ensuring that severely affected or isolated barangay shelters are favored over pure Euclidean proximity.  
4. Computer Science and Operations Research Community: Contributes to the fields of Combinatorial Optimization, Swarm Intelligence, and Geospatial Computing by demonstrating how continuous multi-objective PSO can be discretized via swap-sequence operators and coupled with real-world OSMnx and UP NOAH spatial layers to solve hazard-constrained routing problems.

**Scope and Limitations**

	The primary focus of this study is the mathematical formulation, algorithmic implementation, and empirical simulation validation of a Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) routing engine for flood-constrained disaster relief distribution, accompanied by a web-based visualization interface for rendering route outputs and interactive roadblock scenarios. The study formulates relief distribution as a constrained Multi-Objective Traveling Salesperson Problem (MO-TSP) over a directed road network graph. The specific scope and boundaries encompass the following:

1. **Geographic Testbed Delimitation**: The spatial network is strictly delimited to the low-lying, flood-vulnerable coastal corridor of Cavite covering the City of Bacoor, Cavite City, Kawit, Noveleta, and Rosario. These five municipalities serve as an empirical geospatial case study due to their low topographic elevation, exposure to Manila Bay storm surges and riverine backwater overflow, and dense road networks subject to recurring inundation. Inland upland municipalities of Cavite are excluded to maintain computational focus on high-risk coastal topologies.  
2. **Static Return-Period Flood Layers and Discrete Tier Mapping**: Flood hazard constraints are derived from digitized UP NOAH 5-year, 25-year, and 100-year return-period shapefiles rather than live telemetric water-level sensors. Because UP NOAH shapefiles encode inundation severity as discrete categorical polygons (`Var = 1` for Low: $0.1\text{--}0.5\text{ m}$; `Var = 2` for Medium: $0.5\text{--}1.5\text{ m}$; `Var = 3` for High: $>1.5\text{ m}$), road edges intersecting these polygons are assigned representative tier inundation depths and evaluated against vehicle wading thresholds (${W}_{max}$), supplemented by manual roadblock overrides in the simulation visualization interface.  
3. **Two-Tier Vehicle Classification and Multi-Stop Tour Assumptions**: Vehicle wading classes (Class A: ${W}_{max}=0.30\text{ m}$, Class B: ${W}_{max}=0.60\text{ m}$, and Class C: ${W}_{max}=1.00\text{ m}$) are established using a two-tier parameterization: baseline hydrostatic trafficability ceilings are anchored in peer-reviewed urban flood trafficability and vehicle stability studies (Kramer et al., 2016; Martínez-Gomariz et al., 2018), onto which actual Cavite PDRRMO / local DRRM response vehicles are mapped according to their manufacturer-certified wading depth specifications. Furthermore, following established last-mile humanitarian routing models under acute fleet scarcity (Ferrer et al., 2018; Phongmoo et al., 2023), the dispatch workflow models a single-depot, multi-stop tour in which a deployed relief vehicle sequentially visits a designated set of $n$ affected barangay evacuation nodes before returning to the command hub. Each dispatched vehicle is assumed to carry sufficient payload for its assigned tour loop; split deliveries, multi-echelon warehouse transfers, mechanical breakdowns, traffic signal phase timings, driver fatigue, and fuel thermodynamics are outside the scope of the mathematical formulation.

**Definition of Terms**

**Class A, B, and C Relief Vehicles.** A two-tier classification of disaster response transportation assets anchored in peer-reviewed hydrostatic flood-trafficability criteria (Kramer et al., 2016; Martínez-Gomariz et al., 2018) and mapped to DRRM fleet manufacturer specifications: Class A (Light Commercial / Utility Vans, ${W}_{max}=0.30\text{ m}$), Class B (Medium $4\times 4$ Emergency / Field Support Vehicles, ${W}_{max}=0.60\text{ m}$), and Class C (Heavy High-Clearance Off-Road / Disaster Response Trucks, ${W}_{max}=1.00\text{ m}$).

**Constraint Satisfaction Rate (CSR).** Represents the percentage of planned relief delivery loops generated by the routing algorithm that do not route any vehicle across a road edge whose flood depth exceeds that vehicle's certified wading depth (${W}_{max}$).

**Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO).** An optimization technique derived from swarm intelligence that refers to the specialized algorithm developed in Python that models relief routing sequences as discrete permutation vectors, utilizing swap operators and swap sequences to navigate the Pareto front and simultaneously minimize total travel distance (${f}_{1}$) and urgency-weighted arrival latency (${f}_{2}$).

**Greedy Nearest-Neighbor (GNN).** A deterministic constructive heuristic that builds a routing tour step-by-step by iteratively selecting the unvisited node with the shortest immediate leg distance (`GNN-Distance`) or highest immediate urgency rating (`GNN-Urgency`) over the nominal road network. It serves as the baseline benchmark against which the Pareto-optimal solutions of the DMO-PSO engine are statistically evaluated.

**Maximum Wading Depth (${W}_{max}$).** The highest standing water depth (in meters/millimeters) through which a given vehicle class can safely traverse without buoyant instability, loss of traction, or engine water ingestion (Kramer et al., 2016; Martínez-Gomariz et al., 2018), enforced as a hard-penalty threshold against intersected UP NOAH flood hazard tiers.

**OpenStreetMap (OSM) / OSMnx.** The primary computational pipeline used to extract the raw spatial roadway geometry of the target coastal Cavite municipalities and convert it into a NetworkX mathematical graph structure $G=(V,E)$.

**Pareto Front and External Archive.** The set of non-dominated routing solutions in a multi-objective search space where neither total travel distance (${f}_{1}$) nor urgency-weighted arrival latency (${f}_{2}$) can be improved without degrading the other, maintained across swarm iterations via an external repository pruned by crowding distance.

**Return-Period Flood Depth.** The simulated maximum inundation depth (classified into Low: $0.1\text{ m}\text{--}0.5\text{ m}$ [`Var = 1`], Medium: $0.5\text{ m}\text{--}1.5\text{ m}$ [`Var = 2`], and High: $>1.5\text{ m}$ [`Var = 3`] hazard levels) derived from UP NOAH hydrological models corresponding to the 5-year (20% annual exceedance probability), 25-year (4% annual exceedance probability), and 100-year (1% annual exceedance probability) rainfall recurrence scenarios used as spatial constraints in the routing graph.

**Urgency-Weighted Arrival Latency (${f}_{2}$).** A humanitarian logistics metric that prioritizes rapid aid delivery to populations facing the highest severity of distress over pure geographic proximity. It is computed as the sum of the products of the cumulative transit time to reach each delivery node $k$ (${T}_{\pi(k)}$) and that node's urgency rating $U(\pi_k) \in [1, 5]$, formulated as ${f}_{2}(\pi)=\sum_{k=1}^{n} U(\pi_k)\times {T}_{\pi(k)}$ such that higher-priority evacuation centers penalize late arrivals more heavily in the multi-objective fitness function.
```

- [x] **Step 2: Verify Task 1 changes in `Attachment 4 - Thesis Outline Format.md`**

Run:
```powershell
python -c "text = open('Attachment 4 - Thesis Outline Format.md', encoding='utf-8').read(); assert 'NDRRMC, 2024' in text and 'Kramer et al., 2016' in text and 'GNN-Distance' in text; print('Task 1 OK')"
```
Expected: `Task 1 OK`

---

### Task 2: Draft Complete 4-Subsection Chapter 3 Methodology

**Files:**
- Modify: `c:\Users\GUEST-PC\raft\Attachment 4 - Thesis Outline Format.md:204-212`

**Interfaces:**
- Consumes: End of `**Synthesis**` in Chapter 2 and start of `**REFERENCES**`.
- Produces: Complete `**METHODOLOGY**` section containing all 4 subsections matching the Table of Contents:
  1. `**Research Design and System Architecture**`
  2. `**Spatial Network Extraction and Flood Hazard Intersection**`
  3. `**DMO-PSO Mathematical Formulation and Constraint Handling**`
  4. `**Experimental Setup, Evaluation Metrics, and Validation**`

- [x] **Step 1: Insert the complete `METHODOLOGY` section between `Synthesis` and `REFERENCES`**

Use `replace_file_content` on `c:\Users\GUEST-PC\raft\Attachment 4 - Thesis Outline Format.md` around lines 204–212 with the following exact `TargetContent` and `ReplacementContent`:

**TargetContent:**
```markdown
**Synthesis**  
Collectively, the reviewed literature establishes the theoretical and empirical foundations required for flood-constrained relief routing. Geospatial studies confirm that OpenStreetMap road networks extracted via OSMnx (Boeing, 2017, 2025) can be intersected with high-resolution UP NOAH return-period flood hazard maps (Lagmay et al., 2017; Cadiz, 2018) to identify inundated transportation corridors (Klipper et al., 2021; Petricola et al., 2022). Hydrodynamic trafficability and vehicle stability studies establish multi-class wading depth limits (${W}_{max}$) of $0.30\text{ m}$ for light vehicles, $0.60\text{ m}$ for $4\times 4$ emergency vehicles, and $1.00\text{ m}$ for heavy off-road disaster response trucks (Kramer et al., 2016; Martínez-Gomariz et al., 2018), alongside continuous depth-speed attenuation curves (Pregnolato et al., 2017). Concurrently, humanitarian operations research underscores that post-disaster distribution must balance transit distance against urgency-weighted arrival latency using non-dominated Pareto optimization rather than myopic greedy heuristics (Boonmee et al., 2017; Ferrer et al., 2018; Liu et al., 2020; Lu et al., 2022; Altinoz & Altinoz, 2023; Phongmoo et al., 2023). Finally, algorithmic studies validate swap-sequence Discrete PSO, crowding-distance Pareto archiving, and hard-penalty constraint handling for combinatorial routing (Bacar & Rawhoudine, 2021; Emambocus et al., 2021; de Veluz et al., 2023; Zou et al., 2025). However, existing studies either assess flood road disruption statically without multi-objective tour optimization or optimize humanitarian VRP models over abstract networks without vehicle-class wading depth constraints. This study bridges that gap by integrating OSMnx road topologies, UP NOAH flood hazard tiers, Class A/B/C vehicle wading depth hard penalties, and urgency-weighted arrival latency into a unified DMO-PSO routing engine tailored to the high-risk coastal municipalities of Cavite.

**REFERENCES**  
```

**ReplacementContent:**
```markdown
**Synthesis**  
Collectively, the reviewed literature establishes the theoretical and empirical foundations required for flood-constrained relief routing. Geospatial studies confirm that OpenStreetMap road networks extracted via OSMnx (Boeing, 2017, 2025) can be intersected with high-resolution UP NOAH return-period flood hazard maps (Lagmay et al., 2017; Cadiz, 2018) to identify inundated transportation corridors (Klipper et al., 2021; Petricola et al., 2022). Hydrodynamic trafficability and vehicle stability studies establish multi-class wading depth limits (${W}_{max}$) of $0.30\text{ m}$ for light vehicles, $0.60\text{ m}$ for $4\times 4$ emergency vehicles, and $1.00\text{ m}$ for heavy off-road disaster response trucks (Kramer et al., 2016; Martínez-Gomariz et al., 2018), alongside continuous depth-speed attenuation curves (Pregnolato et al., 2017). Concurrently, humanitarian operations research underscores that post-disaster distribution must balance transit distance against urgency-weighted arrival latency using non-dominated Pareto optimization rather than myopic greedy heuristics (Boonmee et al., 2017; Ferrer et al., 2018; Liu et al., 2020; Lu et al., 2022; Altinoz & Altinoz, 2023; Phongmoo et al., 2023). Finally, algorithmic studies validate swap-sequence Discrete PSO, crowding-distance Pareto archiving, and hard-penalty constraint handling for combinatorial routing (Bacar & Rawhoudine, 2021; Emambocus et al., 2021; de Veluz et al., 2023; Zou et al., 2025). However, existing studies either assess flood road disruption statically without multi-objective tour optimization or optimize humanitarian VRP models over abstract networks without vehicle-class wading depth constraints. This study bridges that gap by integrating OSMnx road topologies, UP NOAH flood hazard tiers, Class A/B/C vehicle wading depth hard penalties, and urgency-weighted arrival latency into a unified DMO-PSO routing engine tailored to the high-risk coastal municipalities of Cavite.

**METHODOLOGY**

**Research Design and System Architecture**  
This study employs an experimental and developmental computational research design centered on the mathematical formulation, implementation, and empirical simulation benchmarking of a Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) routing engine. Rather than relying on human-subject surveys or proprietary municipal software deployment, the coastal corridor of Cavite—specifically the City of Bacoor, Cavite City, Kawit, Noveleta, and Rosario—is utilized as a real-world geospatial simulation testbed. The system architecture is structured into three decoupled computational tiers:

1. **Geospatial Ingestion and Graph Preprocessing Tier (Python / OSMnx / GeoPandas):** Extracts drivable street topologies from OpenStreetMap, aligns coordinate reference systems (`EPSG:4326`), and performs spatial polygon-to-edge intersections against the 5-year, 25-year, and 100-year UP NOAH flood hazard shapefiles to generate hazard-weighted pairwise distance and travel-time matrices.
2. **Combinatorial Optimization Tier (Python DMO-PSO & Baseline Engine):** Executes the permutation-based DMO-PSO metaheuristic alongside deterministic Greedy Nearest-Neighbor (`GNN-Distance` and `GNN-Urgency`) baselines, enforcing vehicle-class wading depth constraints (${W}_{max}$) and maintaining an external Pareto archive pruned via crowding distance.
3. **Interactive Simulation Visualization Tier (React / FastAPI / MapLibre GL JS):** Serves strictly as a visual presentation interface that renders the flood-intersected road graph, displays the computed Pareto-optimal route trajectories vs. baseline routes, and allows users to inject simulated manual roadblock overrides ($M_e = 1$) to observe dynamic tour re-computation.

**Spatial Network Extraction and Flood Hazard Intersection**  
To fulfill Objective 1, the drivable road network of Bacoor, Cavite City, Kawit, Noveleta, and Rosario is extracted from OpenStreetMap via the OSMnx library (Boeing, 2017, 2025) and modeled as a primal directed multigraph $G = (V, E)$, where $V$ represents street intersections and terminal nodes, and $E$ represents directed road segments. Each edge $e \in E$ possesses a baseline metric length $l_e$ (in kilometers) and a nominal dry-pavement speed $v_0$ ($30\text{ km/h}$ default urban relief dispatch speed). Within $V$, a designated command center node $v_0 \in V$ acts as the central relief depot (Node $0$), and a subset of $n$ barangay evacuation nodes $V_d = \{1, 2, \dots, n\} \subset V$ represents the target delivery stops, each assigned a pre-assessed humanitarian urgency weight $U(i) \in \{1, 2, 3, 4, 5\}$ ($1 = \text{Low}$, $5 = \text{Critical}$).

The street graph $G=(V,E)$ is converted into a spatial edge GeoDataFrame projected in WGS 84 (`EPSG:4326`) and spatially intersected (`geopandas.sjoin` / `overlay`) with the UP NOAH 5-year, 25-year, and 100-year return-period flood hazard shapefiles (Lagmay et al., 2017; Cadiz, 2018). Each UP NOAH flood polygon encodes a discrete hazard tier variable $\text{Var} \in \{1.0, 2.0, 3.0\}$, which is mapped to a representative standing water depth $W_e$ on every intersected road edge $e \in E$:
* **Unflooded ($\text{Var} = 0$):** No polygon intersection; $W_e = 0.00\text{ m}$.
* **Low Hazard ($\text{Var} = 1.0$, $0.1\text{ m}\text{--}0.5\text{ m}$ inundation):** Assigned representative depth $W_e = 0.30\text{ m}$.
* **Medium Hazard ($\text{Var} = 2.0$, $0.5\text{ m}\text{--}1.5\text{ m}$ inundation):** Assigned representative depth $W_e = 0.80\text{ m}$.
* **High Hazard ($\text{Var} = 3.0$, $>1.5\text{ m}$ inundation):** Assigned representative depth $W_e = 1.50\text{ m}$.

When a road edge spans multiple flood polygons, the conservative maximum intersecting hazard tier is assigned to $e$ to guarantee operational safety.

**DMO-PSO Mathematical Formulation and Constraint Handling**  
To fulfill Objectives 2 and 3, vehicle physical tolerances are structured using a two-tier classification framework: the class wading depth boundaries (${W}_{max}$) are anchored in peer-reviewed urban flood trafficability and stability criteria (Kramer et al., 2016; Martínez-Gomariz et al., 2018), onto which actual Cavite PDRRMO / MDRRMO disaster response vehicles are mapped according to their manufacturer-certified wading specifications:
* **Class A (Light Commercial / Utility Vans, ${W}_{max} = 0.30\text{ m}$ / $300\text{ mm}$):** Anchored in the $h_E = 0.30\text{ m}$ light-vehicle trafficability ceiling (Kramer et al., 2016; Pregnolato et al., 2017); accommodates standard LGU utility vans (e.g., Mitsubishi L300, Toyota HiAce). Traverses unflooded and Low Hazard edges; blocked by Medium and High Hazard edges.
* **Class B (Medium $4\times 4$ Emergency / Field Support Vehicles, ${W}_{max} = 0.60\text{ m}$ / $600\text{ mm}$):** Anchored in the $h_E = 0.60\text{ m}$ hydrostatic limit for $4\times 4$ and standard emergency response vehicles (Kramer et al., 2016; Martínez-Gomariz et al., 2018); accommodates provincial/municipal $4\times 4$ rescue pickups (e.g., Toyota Hilux, Isuzu D-Max, Ford Ranger $4\times 4$). Safely traverses Low Hazard edges with reduced wading speed; blocked by Medium and High Hazard edges ($>0.60\text{ m}$).
* **Class C (Heavy High-Clearance Off-Road / Disaster Response Trucks, ${W}_{max} = 1.00\text{ m}$ / $1,000\text{ mm}$):** Anchored in the $0.90\text{ m}\text{--}1.20\text{ m}$ trafficability range for specialized off-road and military/fire disaster response trucks with elevated air intakes (Kramer et al., 2016); accommodates heavy DRRM utility and military trucks (e.g., Isuzu FVR, KM250 / M35 $6\times 6$ relief trucks). Traverses Low and Medium Hazard edges; blocked by High Hazard edges ($>1.00\text{ m}$).

For a selected vehicle class with threshold ${W}_{max}$ and manual roadblock indicator $M_e \in \{0, 1\}$, the flood-constrained effective edge traversal time $\tau_e$ and effective edge distance $d'_e$ are governed by a hard-penalty constraint function and hydrodynamic speed attenuation (Kramer et al., 2016; Pregnolato et al., 2017; Zou et al., 2025):

$$d'_e = \begin{cases} \infty \text{ (or } P_{\text{hard}} = 10^6\text{ km)}, & \text{if } W_e > W_{\max} \text{ or } M_e = 1 \\ l_e, & \text{if } 0 \le W_e \le W_{\max} \end{cases}$$

$$v_e = v_0 \left(1 - \alpha \frac{W_e}{W_{\max}}\right), \quad \tau_e = \frac{l_e}{v_e} \quad \text{for } 0 \le W_e \le W_{\max}$$

where $\alpha = 0.50$ represents the hydrodynamic water-drag speed reduction factor across passable inundated segments (Pregnolato et al., 2017). Pairwise shortest traversable network distances $d(u, v)$ and travel times $t(u, v)$ between all node pairs $u, v \in \{0\} \cup V_d$ are precomputed over the flood-constrained graph using Dijkstra's algorithm.

Each particle $i$ in a swarm of size $N_p$ encodes a candidate multi-stop relief tour as a discrete permutation vector $\pi_i = [\pi_{i,1}, \pi_{i,2}, \dots, \pi_{i,n}]$ of the $n$ delivery nodes, forming the closed loop $0 \rightarrow \pi_{i,1} \rightarrow \dots \rightarrow \pi_{i,n} \rightarrow 0$. The bi-objective fitness function evaluates two conflicting minimization objectives:

1. **Objective 1 — Total Traversable Transit Distance (${f}_{1}$):**
   $$\min f_1(\pi) = d(0, \pi_1) + \sum_{k=1}^{n-1} d(\pi_k, \pi_{k+1}) + d(\pi_n, 0) + P_{\text{hard}} \cdot \Omega(\pi)$$
   where $\Omega(\pi)$ counts the number of impassable legs ($W_e > W_{\max}$ or $M_e = 1$) traversed by tour $\pi$, and $P_{\text{hard}} = 10^6$ acts as the mathematical hard penalty (Zou et al., 2025).

2. **Objective 2 — Cumulative Urgency-Weighted Arrival Latency (${f}_{2}$):**
   $$\min f_2(\pi) = \sum_{k=1}^{n} U(\pi_k) \times T_{\pi(k)} + P_{\text{hard}} \cdot \Omega(\pi)$$
   where $T_{\pi(k)} = t(0, \pi_1) + \sum_{j=1}^{k-1} t(\pi_j, \pi_{j+1})$ is the cumulative arrival time (in hours) from the depot to the $k$-th stop in the sequence (excluding the depot return leg, since community relief receipt occurs upon arrival at stop $k$).

To navigate the discrete permutation space, particle velocity is modeled as an ordered Swap Sequence $V_i = [SO_1, SO_2, \dots, SO_m]$, where each Swap Operator $SO(a, b)$ exchanges the nodes at indices $a$ and $b$ in permutation $\pi_i$ (Emambocus et al., 2021). Given personal best permutation $pBest_i$ and global archive leader $gBest$, the permutation difference operator $\ominus$ computes the minimal sequence of swap operators transforming $\pi_i(t)$ into the target tour. At iteration $t+1$, velocity and position are updated via:

$$V_i(t+1) = \left(w \otimes V_i(t)\right) \oplus \left(c_1 r_1 \otimes \left(pBest_i \ominus \pi_i(t)\right)\right) \oplus \left(c_2 r_2 \otimes \left(gBest \ominus \pi_i(t)\right)\right)$$

$$\pi_i(t+1) = \pi_i(t) \oplus V_i(t+1)$$

where $\oplus$ denotes swap-sequence concatenation, $w, c_1, c_2 \in [0, 1]$ control probabilistic swap retention, and $r_1, r_2 \sim U(0, 1)$. Solutions are compared via Pareto dominance: tour $A$ dominates tour $B$ ($A \prec B$) if and only if $f_1(A) \le f_1(B)$ and $f_2(A) \le f_2(B)$ with at least one strict inequality. Non-dominated tours are stored in a bounded External Pareto Archive $\mathcal{A}$, where crowding distance is computed in $(f_1, f_2)$ objective space to prune crowded solutions and select diverse $gBest$ leaders via binary tournament selection (Bacar & Rawhoudine, 2021).

**Experimental Setup, Evaluation Metrics, and Validation**  
To fulfill Objective 4 and test Hypotheses ${H}_{01}$, ${H}_{02}$, and ${H}_{03}$, the DMO-PSO engine is benchmarked in a two-stage validation protocol:

1. **Stage 1 — Exact Ground-Truth Verification ($n = 6$ Toy Benchmark):** Prior to full-scale spatial execution, algorithmic correctness is verified on a 6-node benchmark instance ($6! = 720$ total permutations) where exact Pareto-optimal solutions are enumerated via exhaustive brute-force search. The DMO-PSO engine must recover the exact non-dominated Pareto frontier, confirming zero mathematical or encoding defects.
2. **Stage 2 — Coastal Cavite Multi-Scenario Flood Simulation:** The DMO-PSO engine is executed across a factorial matrix of simulated disaster scenarios spanning the three UP NOAH return periods (**5-year**, **25-year**, and **100-year** flood shapefiles), the three vehicle classes (**Class A**, **Class B**, and **Class C**), and randomized manual roadblock injections ($M_e = 1$). Because DMO-PSO is a stochastic metaheuristic, $R = 30$ independent Monte Carlo runs are executed per scenario (with fixed swarm size $N_p = 50$ and maximum iterations $T_{\max} = 200$).

Across each scenario, the DMO-PSO Pareto solutions (specifically the minimum-$f_1$ extreme, minimum-$f_2$ extreme, and normalized minimum-Euclidean-distance compromise knee-point route) are compared against two deterministic Greedy Nearest-Neighbor baselines operating on nominal road distances:
* **`GNN-Distance`:** Iteratively selects the closest unvisited barangay node $\arg\min_{j} d_{\text{nominal}}(\text{curr}, j)$.
* **`GNN-Urgency`:** Iteratively selects the unvisited barangay node with the highest urgency-to-distance ratio $\arg\max_{j} [U(j) / d_{\text{nominal}}(\text{curr}, j)]$.

Statistical hypothesis testing for **Total Transit Distance (${H}_{01}$)**, **Urgency-Weighted Arrival Latency (${H}_{02}$)**, and **Constraint Satisfaction Rate (${H}_{03}$)** is conducted at a significance level of $\alpha = 0.05$. Normality of paired differences across scenarios is first assessed using the Shapiro–Wilk test; parametric comparisons use the paired-samples $t$-test, while non-normal distributions use the non-parametric Wilcoxon signed-rank test. Finally, **convergence stability** (hypervolume / objective trajectory across iterations $t = 1 \dots T_{\max}$ and standard deviation across 30 runs) and **execution runtime (${T}_{exec}$)** (mean wall-clock computation time in seconds) are profiled as descriptive computational performance metrics.

**REFERENCES**  
```

- [x] **Step 2: Verify Task 2 Methodology insertion**

Run:
```powershell
python -c "text = open('Attachment 4 - Thesis Outline Format.md', encoding='utf-8').read(); assert '**METHODOLOGY**' in text and '**Research Design and System Architecture**' in text and '**Spatial Network Extraction and Flood Hazard Intersection**' in text and '**DMO-PSO Mathematical Formulation and Constraint Handling**' in text and '**Experimental Setup, Evaluation Metrics, and Validation**' in text; print('Task 2 OK')"
```
Expected: `Task 2 OK`

---

### Task 3: Add NDRRMC (2024) to References & Enhance Appendices

**Files:**
- Modify: `c:\Users\GUEST-PC\raft\Attachment 4 - Thesis Outline Format.md` (References and Appendices sections at the bottom of the file)

**Interfaces:**
- Consumes: `**REFERENCES**` and `**APPENDICES**` sections in `Attachment 4 - Thesis Outline Format.md`.
- Produces: Complete 21-entry APA 7th Reference list (including `Kramer et al., 2016`, `Martínez-Gomariz et al., 2018`, and `National Disaster Risk Reduction and Management Council [NDRRMC], 2024`) and Appendices A, B, and C.

- [x] **Step 1: Add NDRRMC (2024) reference entry and Appendix C in `Attachment 4 - Thesis Outline Format.md`**

Use `replace_file_content` on the bottom of `c:\Users\GUEST-PC\raft\Attachment 4 - Thesis Outline Format.md` with the following exact `TargetContent` and `ReplacementContent`:

**TargetContent:**
```markdown
Martínez-Gomariz, E., Gómez, M., Russo, B., & Djordjević, S. (2018). Stability criteria for flooded vehicles: A state-of-the-art review. *Journal of Flood Risk Management*, *11*(S2), S817–S826. [https://doi.org/10.1111/jfr3.12262](https://doi.org/10.1111/jfr3.12262)

Petricola, S., Reinmuth, M., Lautenbach, S., Hatfield, C., & Zipf, A. (2022). Assessing road criticality and loss of healthcare accessibility during floods: The case of Cyclone Idai, Mozambique 2019. *International Journal of Health Geographics*, *21*(1), 14. [https://doi.org/10.1186/s12942-022-00315-2](https://doi.org/10.1186/s12942-022-00315-2)

Phongmoo, S., Leksakul, K., Charoenchai, N., & Boonmee, C. (2023). Vehicle routing problem for humanitarian relief distribution under hybrid uncertainty. *Kybernetes*, *52*(4), 1503–1527. [https://doi.org/10.1108/K-09-2021-0839](https://doi.org/10.1108/K-09-2021-0839)

Pregnolato, M., Ford, A., Wilkinson, S. M., & Dawson, R. J. (2017). The impact of flooding on road transport: A depth-disruption function. *Transportation Research Part D: Transport and Environment*, *55*, 67–81. [https://doi.org/10.1016/j.trd.2017.06.020](https://doi.org/10.1016/j.trd.2017.06.020)

Republic Act No. 10121. (2010). *An Act Strengthening the Philippine Disaster Risk Reduction and Management System, Providing for the National Disaster Risk Reduction and Management Framework and Institutionalizing the National Disaster Risk Reduction and Management Plan, Appropriating Funds Therefor and for Other Purposes*. Official Gazette of the Republic of the Philippines.

Zou, Z., Zeng, H., Zheng, X., & Chen, J. (2025). Research on multi-center path optimization for emergency events based on an improved particle swarm optimization algorithm. *Mathematics*, *13*(4), 654. [https://doi.org/10.3390/math13040654](https://doi.org/10.3390/math13040654)

**APPENDICES**

**Appendix A**  
UP NOAH Flood Hazard Overlay and Target Coastal Road Network of Cavite (Bacoor, Cavite City, Kawit, Noveleta, and Rosario)

**Appendix B**  
Political Boundary Map of Cavite (District Level)
```

**ReplacementContent:**
```markdown
Martínez-Gomariz, E., Gómez, M., Russo, B., & Djordjević, S. (2018). Stability criteria for flooded vehicles: A state-of-the-art review. *Journal of Flood Risk Management*, *11*(S2), S817–S826. [https://doi.org/10.1111/jfr3.12262](https://doi.org/10.1111/jfr3.12262)

National Disaster Risk Reduction and Management Council. (2024). *Situational reports on the combined effects of Southwest Monsoon and tropical cyclones in CALABARZON (Cavite Province)*. Office of Civil Defense, Camp General Emilio Aguinaldo, Quezon City, Philippines.

Petricola, S., Reinmuth, M., Lautenbach, S., Hatfield, C., & Zipf, A. (2022). Assessing road criticality and loss of healthcare accessibility during floods: The case of Cyclone Idai, Mozambique 2019. *International Journal of Health Geographics*, *21*(1), 14. [https://doi.org/10.1186/s12942-022-00315-2](https://doi.org/10.1186/s12942-022-00315-2)

Phongmoo, S., Leksakul, K., Charoenchai, N., & Boonmee, C. (2023). Vehicle routing problem for humanitarian relief distribution under hybrid uncertainty. *Kybernetes*, *52*(4), 1503–1527. [https://doi.org/10.1108/K-09-2021-0839](https://doi.org/10.1108/K-09-2021-0839)

Pregnolato, M., Ford, A., Wilkinson, S. M., & Dawson, R. J. (2017). The impact of flooding on road transport: A depth-disruption function. *Transportation Research Part D: Transport and Environment*, *55*, 67–81. [https://doi.org/10.1016/j.trd.2017.06.020](https://doi.org/10.1016/j.trd.2017.06.020)

Republic Act No. 10121. (2010). *An Act Strengthening the Philippine Disaster Risk Reduction and Management System, Providing for the National Disaster Risk Reduction and Management Framework and Institutionalizing the National Disaster Risk Reduction and Management Plan, Appropriating Funds Therefor and for Other Purposes*. Official Gazette of the Republic of the Philippines.

Zou, Z., Zeng, H., Zheng, X., & Chen, J. (2025). Research on multi-center path optimization for emergency events based on an improved particle swarm optimization algorithm. *Mathematics*, *13*(4), 654. [https://doi.org/10.3390/math13040654](https://doi.org/10.3390/math13040654)

**APPENDICES**

**Appendix A**  
UP NOAH Return-Period Flood Hazard Overlay (5-Year, 25-Year, and 100-Year) and Target Coastal Road Network of Cavite (Bacoor, Cavite City, Kawit, Noveleta, and Rosario)

**Appendix B**  
Two-Tier Vehicle Classification Matrix (Class A, B, and C) Based on Kramer et al. (2016) and Cavite DRRM Fleet Specifications

**Appendix C**  
Political Boundary Map of Cavite (District Level)
```

- [x] **Step 2: Run full manuscript integrity check**

Run:
```powershell
python -c "text = open('Attachment 4 - Thesis Outline Format.md', encoding='utf-8').read(); required = ['**INTRODUCTION**', '**Statement of the Problem**', '**Objectives of the Study**', '**Hypothesis**', '**Significance of the Study**', '**Scope and Limitations**', '**Definition of Terms**', '**REVIEW OF RELATED LITERATURE**', '**Technical Background**', '**Humanitarian Logistics and Vehicle Routing Problems**', '**Multi-Objective Swarm Optimization and Constraint Handling**', '**Synthesis**', '**METHODOLOGY**', '**Research Design and System Architecture**', '**Spatial Network Extraction and Flood Hazard Intersection**', '**DMO-PSO Mathematical Formulation and Constraint Handling**', '**Experimental Setup, Evaluation Metrics, and Validation**', '**REFERENCES**', '**APPENDICES**']; missing = [r for r in required if r not in text]; assert not missing, f'Missing: {missing}'; assert 'google.com/search' not in text; assert 'Survey Questionnaire' not in text; print('ALL MANUSCRIPT CHECKS PASSED')"
```
Expected: `ALL MANUSCRIPT CHECKS PASSED`
