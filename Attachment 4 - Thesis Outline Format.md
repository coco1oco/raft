**DYNAMIC ROUTING OF RELIEF GOODS IN HIGH-RISK COASTAL AREAS OF CAVITE USING DISCRETE MULTI-OBJECTIVE PARTICLE SWARM OPTIMIZATION UNDER FLOOD CONSTRAINTS**  
1  
2  
3  
4  
5  
6  
7  
8  
9  
10  
An Undergraduate Thesis Outline  
Submitted to the Faculty of  
College of Engineering and Information Technology  
Cavite State University  
Indang, Cavite  
1  
2  
3  
   4  
5  
6  
7  
8  
9  
10  
In partial fulfillment  
of the requirements for the degree of  
Bachelor of Science in Computer Science  
1  
2  
3  
4  
5  
6  
7  
10  
11  
12  
13  
14  
15  
16  
17  
18  
19  
20  
21  
22  
**ALCRIS S. AMULONG**  
**PRINCESS TRISHA M. CARIAS**  
**KURT MICHAEL L. MIRAFELIX**  
October 2026

**TABLE OF CONTENTS**  
1  
2  
3  
**Page**

| INTRODUCTION…………………………………………………………….. | 1 |
| :---- | :---: |
|            Statement of the Problem…………………………………………... | 2 |
|            Objectives of the Study……………………………………………... | 4 |
|            Hypothesis……………….…………………………………………... | 4 |
|            Significance of the Study........……………………………………... | 6 |
|            Scope and Limitations…………………………………………… | 6 |
|            Definition of Terms………………..………………………………… | 7 |
| **REVIEW OF RELATED LITERATURE**…………………………………… | 10 |
|            Technical Background….…………...……………………………… | 10 |
|            Humanitarian Logistics and Vehicle Routing Problems………… | 10 |
|            Multi-Objective Swarm Optimization and Constraint Handling… | 11 |
|            Synthesis……………………………………………………………... | 12 |
| **METHODOLOGY**……………………………………………………………. | X |
|            Topic 1…………………………………………………………………… | X |
|            Topic 2…………………………………………………………………… | X |
|            Topic 3…………………………………………………………………… | X |
|            Topic 4…………………………………………………………………… | X |
| **REFERENCES**………………………………………………………………. | X |
| **APPENDICES**……………………………………………………………….. | X |

**DYNAMIC ROUTING OF RELIEF GOODS IN HIGH-RISK COASTAL AREAS OF CAVITE USING DISCRETE MULTI-OBJECTIVE PARTICLE SWARM OPTIMIZATION**   
**UNDER FLOOD CONSTRAINTS**  
1  
2  
3  
**Alcris S. Amulong**  
**Princess Trisha M. Carias**  
**Kurt Michael L. Mirafelix**  
1  
2  
3

| An undergraduate thesis outline submitted to the faculty of the Department of Information Technology, College of Engineering and Information Technology, Cavite State University, Indang, Cavite in partial fulfillment for the degree of Bachelor of Science in Computer Science with Contribution No. \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_. Prepared under the supervision of Mr. Ace Amiel E. Malicsi. |
| :---- |

1  
2  
3  
**INTRODUCTION**  
1  
2  
3  
	The geographical location of the Philippines makes it highly susceptible to severe typhoons and monsoon rains, frequently resulting in catastrophic flooding. In response to these persistent environmental threats, the national government enacted Republic Act No. 10121 (the Philippine Disaster Risk Reduction and Management Act), establishing a national framework for proactive disaster mitigation, preparedness, and response. During extreme weather events in Cavite, relief logistics encounter critical operational bottlenecks because standard consumer navigation applications calculate routes solely based on distance or typical traffic flow. These systems fail to account for environmental hazards, vehicle-specific physical tolerances, and localized humanitarian priorities, often resulting in stranded relief vehicles and delayed aid distribution across affected barangays.

This study addresses the gap in humanitarian logistics by moving beyond traditional, static shortest-path algorithms that handle routing purely on a point-to-point basis. Managing multi-stop relief distribution under variable environmental threats is a complex variant of the Traveling Salesperson Problem (TSP) / Multi-Stop Route Optimization problem, which is fundamentally NP-hard. When multiple, conflicting objectives such as minimizing transit distance while enforcing flood-passability constraints and addressing varying levels of location urgency must be balanced simultaneously, deterministic algorithms fail to scale effectively.

To resolve these limitations, this research proposes a dynamic routing engine that integrates open-source geographic data from OpenStreetMap (via OSMnx) with standardized LiDAR-derived flood hazard maps from UP NOAH (Lagmay et al., 2017; Cadiz, 2018). Employing a Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) algorithm allows the system to evaluate candidate delivery sequences as holistic loops rather than step-by-step choices. This global evaluation ensures that Local Government Units (LGUs) and disaster logistics planners can evaluate resilient, adaptive logistical dispatch schedules even when physical infrastructure degrades.

**Statement of the Problem**	

Post-disaster situational reports from the National Disaster Risk Reduction and Management Council (NDRRMC, 2022, 2024) indicate that severe meteorological disturbances such as Severe Tropical Storm Paeng (Nalgae) in 2022, Super Typhoon Carina (Gaemi) in 2024, and Severe Tropical Storm Kristine (Trami) in 2024 routinely trigger widespread inundation and riverine overflow across the low-lying coastal corridor of Cavite, notably within Bacoor, Cavite City, Kawit, Noveleta, and Rosario. During acute flood emergencies when low-clearance vehicles are grounded by deep water and flood-capable trucks are scarce, a single dispatched relief unit must sequentially service multiple isolated barangay evacuation centers in a consolidated multi-stop tour rather than returning to the depot after every single drop (Ferrer et al., 2018; Phongmoo et al., 2023). However, conventional consumer navigation applications (such as Google Maps or Waze) and greedy shortest-path heuristics calculate routes strictly based on nominal dry-pavement distances. Because these tools possess zero awareness of localized flood inundation depths, vehicle-class hydrostatic wading limits, or differentiated shelter urgency levels, they frequently route relief vehicles into impassable flooded corridors or delay critical deliveries to high-severity evacuation centers (Kramer et al., 2016; Pregnolato et al., 2017; Petricola et al., 2022).

In humanitarian operations research, multi-stop relief routing across disrupted infrastructure is formulated as a constrained, multi-objective variant of the Traveling Salesperson Problem (TSP) and Vehicle Routing Problem (VRP), which is fundamentally NP-hard. Traditional logistics optimization models focus predominantly on minimizing monetary cost or travel distance across stable, fully traversable road networks (Liu et al., 2020). Under post-disaster network degradation, however, single-objective deterministic and greedy heuristics exhibit step-by-step myopic selection—either choosing locally proximate stops while stranding high-urgency nodes at the end of the tour, or failing to bypass road segments that exceed vehicle wading depth ceilings (Boonmee et al., 2017; de Veluz et al., 2023; Phongmoo et al., 2023).

Consequently, a critical methodological gap exists due to the absence of a constraint-aware multi-objective routing algorithm that unifies real-world OpenStreetMap road topologies, multi-return-period UP NOAH flood hazard layers (5-year, 25-year, and 100-year recurrence intervals), and stratified vehicle wading depth thresholds (${W}_{max}$) for the flood-vulnerable coastal corridor of Cavite. Existing routing mechanisms lack the metaheuristic capacity to simultaneously minimize total tour distance and cumulative urgency-weighted arrival latency while enforcing hard flood-passability constraints across degraded street graphs.

To address this problem, this study develops and validates a dynamic routing optimization engine powered by a Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) algorithm, paired with a lightweight web-based map visualization interface. Using the high-risk coastal municipalities of Bacoor, Cavite City, Kawit, Noveleta, and Rosario as an empirical geospatial testbed (see Appendix A and Appendix C), the engine intersects OpenStreetMap road networks with UP NOAH flood hazard shapefiles and hydrostatic vehicle wading constraints (see Appendix B) to generate Pareto-optimal multi-stop relief delivery schedules.

**Objectives of the Study**

	The general objective of this study is to develop and validate a Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) dynamic routing engine—supported by an interactive web-based map visualization—for multi-stop disaster relief distribution across the high-risk coastal areas of Cavite under UP NOAH return-period flood constraints and manual roadblock overrides. Specifically, it aims to:

1. Extract and construct a mathematical road network graph $G=(V,E)$ of the target coastal Cavite municipalities (Bacoor, Cavite City, Kawit, Noveleta, and Rosario) from OpenStreetMap data using the OSMnx library, and spatially intersect its edges with digitized 5-year, 25-year, and 100-year UP NOAH flood hazard shapefiles (see Appendix A and Appendix C).  
2. Build a DMO-PSO algorithmic model in Python utilizing discrete permutation encoding, swap operators, swap sequences, and crowding-distance Pareto archiving to simultaneously minimize total transit distance (${f}_{1}$) and urgency-weighted arrival latency (${f}_{2}$) across multi-stop relief routing loops.  
3. Establish a two-tier vehicle classification framework (Class A, B, and C) grounded in empirical hydrostatic flood-trafficability criteria (Kramer et al., 2016; Martínez-Gomariz et al., 2018) and representative commercial manufacturer wading depth (${W}_{max}$) specifications as mathematical hard-penalties and speed-degradation factors within the fitness evaluation (see Appendix B).   
4. Test and validate the DMO-PSO engine across simulated 5-year, 25-year, and 100-year flood scenarios (and manual roadblock injections) against both flood-constrained Greedy Nearest-Neighbor baselines (`C-GNN-Distance` and `C-GNN-Urgency`) and unconstrained nominal Greedy Nearest-Neighbor baselines (`U-GNN-Distance` and `U-GNN-Urgency`) to statistically evaluate comparative solution quality—specifically total traversable transit distance (${f}_{1}$), urgency-weighted arrival latency (${f}_{2}$), and Constraint Satisfaction Rate (CSR)—while profiling algorithmic convergence stability, sensitivity to hazard-depth mapping, and execution/re-optimization runtime (${T}_{exec}$) as computational performance metrics.

**Hypothesis**

	To validate the computational effectiveness and solution quality of the proposed Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) routing engine across the coastal Cavite testbed under simulated 5-year, 25-year, and 100-year flood constraints, specific solutions from the DMO-PSO Pareto archive are paired against flood-constrained (`C-GNN`) and unconstrained (`U-GNN`) deterministic Greedy Nearest-Neighbor baselines. The following null (${H}_{0}$) and alternative (${H}_{a}$) hypotheses are tested:

1. **Total Traversable Transit Distance (${f}_{1}$)**  
* **${H}_{01}:{\ }$**There is no significant difference in the unpenalized total traversable transit distance (${f}_{1}$) between the DMO-PSO minimum-${f}_{1}$ and compromise knee-point routes and the routes generated by the flood-constrained baseline heuristic (`C-GNN-Distance`) over the same flood-pruned road network.  
* ${H}_{a1}:{\ }$The DMO-PSO minimum-${f}_{1}$ and compromise knee-point routes achieve a significantly lower unpenalized total traversable transit distance (${f}_{1}$) than the flood-constrained baseline heuristic (`C-GNN-Distance`) over the same flood-pruned road network.  
  2. **Urgency-Weighted Arrival Latency (${f}_{2}$)**  
* **${H}_{02}:{\ }$**There is no significant difference in the unpenalized cumulative urgency-weighted arrival latency (${f}_{2}$) between the DMO-PSO minimum-${f}_{2}$ and compromise knee-point routes and the routes generated by the flood-constrained urgency baseline heuristic (`C-GNN-Urgency`) across reachable distribution nodes.  
* ${H}_{a2}:{\ }$The DMO-PSO minimum-${f}_{2}$ and compromise knee-point routes achieve a significantly lower unpenalized cumulative urgency-weighted arrival latency (${f}_{2}$) than the flood-constrained urgency baseline heuristic (`C-GNN-Urgency`) by globally optimizing the multi-stop sequence of high-urgency evacuation nodes along feasible detours.  
  3. **Constraint Satisfaction Rate (CSR)**   
* **${H}_{03}:{\ }$**There is no significant difference in the Constraint Satisfaction Rate (CSR) with respect to vehicle hydrostatic wading depth limits (${W}_{max}$) between routes computed by the flood-aware DMO-PSO algorithm and those generated by conventional unconstrained nominal GNN routing (`U-GNN-Distance` and `U-GNN-Urgency`) under simulated flood depths.  
* ${H}_{a3}:{\ }$The DMO-PSO algorithm achieves a significantly higher Constraint Satisfaction Rate (CSR) than conventional unconstrained nominal GNN routing (`U-GNN-Distance` and `U-GNN-Urgency`) by enforcing mathematical hard-penalty functions that prune road segments exceeding vehicle wading limits.


**Significance of the Study**

This study provides algorithmic, methodological, and practical value to the following stakeholders:

1. Disaster Logistics Planners and DRRM Agencies: Provides an empirically validated algorithmic reference model and visual simulation tool that demonstrates how multi-objective swarm optimization can generate flood-safe, priority-aware multi-stop dispatch schedules during fleet-constrained coastal flood emergencies.  
2. Relief Operations and Fleet Dispatch Teams: Illustrates how mathematical wading-depth constraint handling proactively identifies inundated road corridors exceeding vehicle tolerances (${W}_{max}$) and computes feasible detours before vehicle deployment.  
3. Vulnerable Coastal Communities: Prioritizes delivery sequencing using quantified urgency weights alongside network travel times, ensuring that severely affected or isolated barangay shelters are favored over pure Euclidean proximity.  
4. Computer Science and Operations Research Community: Contributes to the fields of Combinatorial Optimization, Swarm Intelligence, and Geospatial Computing by demonstrating how continuous multi-objective PSO can be discretized via swap-sequence operators and coupled with real-world OSMnx and UP NOAH spatial layers to solve hazard-constrained routing problems.

**Scope and Limitations**

	The primary focus of this study is the mathematical formulation, algorithmic implementation, and empirical simulation validation of a Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) routing engine for flood-constrained disaster relief distribution, accompanied by a web-based visualization interface for rendering route outputs and interactive roadblock scenarios. The study formulates relief distribution as a constrained Multi-Objective Traveling Salesperson Problem (MO-TSP) over a directed road network graph. The specific scope and boundaries encompass the following:

1. **Geographic Testbed Delimitation**: The spatial network is strictly delimited to the low-lying, flood-vulnerable coastal corridor of Cavite covering the City of Bacoor, Cavite City, Kawit, Noveleta, and Rosario (see Appendix A and Appendix C). These five municipalities serve as an empirical geospatial case study due to their low topographic elevation, susceptibility to riverine backwater overflow and extreme rainfall inundation, and dense road networks. While these coastal municipalities are also physically exposed to Manila Bay coastal hazards, the spatial hazard layers utilized in this study strictly model extreme rainfall return-period inundation (pluvial and fluvial flooding) rather than wind-driven storm surge hydrodynamics. Inland upland municipalities of Cavite are excluded to maintain computational focus on high-risk coastal topologies.  
2. **Static Return-Period Flood Layers and Tier Depth Parameterization**: Flood hazard constraints are derived from digitized UP NOAH 5-year, 25-year, and 100-year rainfall return-period shapefiles (Lagmay et al., 2017; Cadiz, 2018) rather than live telemetric water-level sensors. Because UP NOAH shapefiles encode inundation severity as discrete categorical polygons (`Var = 1` for Low: $0.1\text{--}0.5\text{ m}$; `Var = 2` for Medium: $0.5\text{--}1.5\text{ m}$; `Var = 3` for High: $>1.5\text{ m}$), road edges intersecting these polygons are mapped to tier-specific standing water depths ($W_e = 0.50\text{ m}$ conservative upper bound for Low Hazard; $W_e = 1.00\text{ m}$ tier midpoint for Medium Hazard, evaluated alongside a $1.50\text{ m}$ upper-bound sensitivity check; and $W_e = 1.50\text{ m}$ for High Hazard) and evaluated against vehicle wading thresholds (${W}_{max}$), supplemented by manual roadblock overrides ($M_e = 1$) in the simulation visualization interface.  
3. **Logistical, Dispatch, and Representative Vehicle Archetype Assumptions**: The operational model assumes a centralized single-depot dispatch architecture consistent with the disaster response protocols outlined in Republic Act No. 10121 (2010) and established Philippine and international relief logistics literature (De Lara et al., 2014; Ferrer et al., 2018; Putong & De Leon, 2018; de Veluz et al., 2023; Phongmoo et al., 2023). Relief packages are dispatched from designated inland staging hubs to prioritized coastal destination nodes ($n = 15\text{--}30$ reachable barangay evacuation centers in full-scale coastal simulations) in consolidated multi-stop tour loops within a single shift. Due to operational variability across municipal fleets, fleets are modeled using generalized representative vehicle wading classes—Class A (light commercial utility vans, e.g., Mitsubishi L300, Toyota HiAce, standard multicabs; ${W}_{max}=0.30\text{ m}$), Class B (medium $4\times 4$ support and rescue pickups, e.g., Isuzu D-Max, Toyota Hilux $4\times 4$; ${W}_{max}=0.60\text{ m}$), and Class C (heavy cargo and high-clearance utility trucks, e.g., Isuzu Forward, 6-wheeler cargo haulers, military-spec $2.5$-ton trucks; ${W}_{max}=1.00\text{ m}$)—defined by standard commercial automotive specifications and peer-reviewed hydrostatic trafficability criteria (Kramer et al., 2016; Martínez-Gomariz et al., 2018) rather than proprietary local inventory datasets (see Appendix B). Under the tier depth parameterization, Class A (${W}_{max}=0.30\text{ m}$), Class B (${W}_{max}=0.60\text{ m}$), and Class C (${W}_{max}=1.00\text{ m}$) unlock strictly distinct, nested passable road subgraphs ($G_{\text{safe}}^{A} \subset G_{\text{safe}}^{B} \subset G_{\text{safe}}^{C}$), while barangays completely isolated by floodwaters exceeding ${W}_{max}$ on all incident corridors are partitioned prior to routing and flagged for higher-class or amphibious dispatch. Each dispatched vehicle is assumed to carry sufficient payload for its assigned tour loop; split deliveries, multi-echelon warehouse transfers, dynamic fuel consumption, mechanical failure, traffic signal timings, driver fatigue, and inter-agency bureaucratic handoffs are excluded from the algorithmic formulation.

**Definition of Terms**

**Class A, B, and C Relief Vehicles.** A two-tier classification of disaster response transportation assets anchored in peer-reviewed hydrostatic flood-trafficability criteria (Kramer et al., 2016; Martínez-Gomariz et al., 2018) and defined by representative commercial automotive manufacturer specifications rather than a single agency's proprietary inventory (see Appendix B): Class A (Light Commercial Utility Vans, e.g., Mitsubishi L300, Toyota HiAce, ${W}_{max}=0.30\text{ m}$), Class B (Medium $4\times 4$ Support and Rescue Pickups, e.g., Isuzu D-Max, Toyota Hilux $4\times 4$, ${W}_{max}=0.60\text{ m}$), and Class C (Heavy Cargo and High-Clearance Off-Road Utility Trucks, e.g., Isuzu Forward, military-spec $2.5$-ton trucks, ${W}_{max}=1.00\text{ m}$).

**Constraint Satisfaction Rate (CSR).** Represents the percentage of planned relief delivery loops (and constituent node-to-node legs) generated by a routing algorithm that do not traverse any road segment whose flood depth exceeds the deployed vehicle's certified wading depth (${W}_{max}$) or manual roadblock flag ($M_e = 1$).

**Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO).** An optimization technique derived from swarm intelligence that refers to the specialized algorithm developed in Python that models relief routing sequences as discrete permutation vectors, utilizing swap operators and swap sequences to navigate the Pareto front and simultaneously minimize total travel distance (${f}_{1}$) and urgency-weighted arrival latency (${f}_{2}$).

**Greedy Nearest-Neighbor (GNN).** A deterministic constructive heuristic that builds a routing tour step-by-step from current node $u$ by iteratively selecting the unvisited node $v$ that minimizes immediate leg distance $\arg\min_{v} d(u,v)$ (`GNN-Distance`) or minimizes the distance-to-urgency ratio $\arg\min_{v} [d(u,v)/U(v)]$ (equivalently maximizing $\arg\max_{v} [U(v)/d(u,v)]$, `GNN-Urgency`). In this study, GNN is evaluated in two regimes: **Unconstrained GNN (`U-GNN`)** over nominal dry-pavement distances to test flood-violation rates (${H}_{03}$), and **Flood-Constrained GNN (`C-GNN`)** over the flood-pruned shortest-path graph to provide a fair like-for-like combinatorial benchmark for ${f}_{1}$ (${H}_{01}$) and ${f}_{2}$ (${H}_{02}$).

**Maximum Wading Depth (${W}_{max}$).** The highest standing water depth (in meters/millimeters) through which a given vehicle class can safely traverse without buoyant instability, loss of traction, or engine water ingestion (Kramer et al., 2016; Martínez-Gomariz et al., 2018), enforced as a hard-penalty threshold against intersected UP NOAH flood hazard tiers.

**OpenStreetMap (OSM) / OSMnx.** The primary computational pipeline used to extract the raw spatial roadway geometry of the target coastal Cavite municipalities and convert it into a NetworkX mathematical graph structure $G=(V,E)$.

**Pareto Front and External Archive.** The set of non-dominated routing solutions in a multi-objective search space where neither total travel distance (${f}_{1}$) nor urgency-weighted arrival latency (${f}_{2}$) can be improved without degrading the other, maintained across swarm iterations via an external repository pruned by crowding distance.

**Return-Period Flood Depth.** The simulated maximum inundation depth (classified into Low: $0.1\text{ m}\text{--}0.5\text{ m}$ [`Var = 1`], Medium: $0.5\text{ m}\text{--}1.5\text{ m}$ [`Var = 2`], and High: $>1.5\text{ m}$ [`Var = 3`] hazard levels) derived from UP NOAH hydrological models corresponding to the 5-year (20% annual exceedance probability), 25-year (4% annual exceedance probability), and 100-year (1% annual exceedance probability) rainfall recurrence scenarios used as spatial constraints in the routing graph.

**Urgency-Weighted Arrival Latency (${f}_{2}$).** A humanitarian logistics metric that prioritizes rapid aid delivery to populations facing the highest severity of distress over pure geographic proximity. It is computed as the sum of the products of the cumulative transit time to reach each delivery node $k$ (${T}_{\pi(k)}$) and that node's urgency rating $U(\pi_k) \in [1, 5]$, formulated as ${f}_{2}(\pi)=\sum_{k=1}^{n} U(\pi_k)\times {T}_{\pi(k)}$ such that higher-priority evacuation centers penalize late arrivals more heavily in the multi-objective fitness function.

**REVIEW OF RELATED LITERATURE**

**Technical Background**  
The computational architecture of disaster routing decision systems relies on the intersection of spatial network graph theory, hydrological hazard modeling, and empirical vehicle disruption functions. To construct computable network topologies from open geospatial repositories, street networks derived from OpenStreetMap (OSM) vector data are extracted and modeled via the OSMnx Python library as primal, non-planar directed multigraphs $G=(V,E)$, where street intersections and dead-ends constitute vertices $V$ and traversable road corridors are formulated as weighted edges $E$ containing spatial geometry, length, bridge status, and speed attributes (Boeing, 2017, 2025). Unlike simplified Euclidean grid abstractions, OSMnx preserves topological street continuity, one-way flow restrictions, and true curvilinear road lengths, enabling realistic shortest-path and network centrality computations within Python scientific workflows.

To evaluate how hydrometeorological hazards compromise these street graphs, high-resolution flood inundation layers must be spatially intersected with road edge geometries. In the Philippines, the Nationwide Operational Assessment of Hazards (UP NOAH) generated granular (1:10,000 scale) LiDAR-derived flood hazard maps across major river basins and coastal zones, categorizing rainfall return-period inundation extents into discrete hazard tiers corresponding to low ($0.1\text{ m}\text{--}0.5\text{ m}$), medium ($0.5\text{ m}\text{--}1.5\text{ m}$), and high ($>1.5\text{ m}$) flood depths across 5-year, 25-year, and 100-year recurrence intervals (Lagmay et al., 2017; Cadiz, 2018). Recent geospatial accessibility studies demonstrate that intersecting flood extent polygons with OpenStreetMap road networks reveals severe topological fragmentation during extreme weather events. For instance, Klipper et al. (2021) overlaid flood footprints onto OSM road graphs in Jakarta to quantify travel-time inflation and corridor loss toward critical facilities, while Petricola et al. (2022) utilized open street networks during Cyclone Idai to identify critical road segments whose inundation completely isolated vulnerable communities from emergency response hubs.

Translating intersected flood depths into actionable routing constraints requires both a depth-speed disruption model and class-specific hydrostatic wading thresholds. Pregnolato et al. (2017) synthesized experimental hydrodynamics, safety records, and empirical observations to formulate a nonlinear depth-disruption function relating standing water depth to maximum safe vehicle speed, establishing $300\text{ mm}$ ($0.30\text{ m}$) as the ultimate stability and roadworthiness limit for standard passenger and light vehicles. However, because disaster response fleets operate heterogeneous vehicle types with higher ground clearances and elevated air intakes, Kramer et al. (2016) and Martínez-Gomariz et al. (2018) investigated hydrostatic stability and trafficability criteria across distinct vehicle classes in inundated urban road networks. Specifically, Kramer et al. (2016) established stratified hydrostatic wading thresholds ($h_E$) across vehicle classes: $0.30\text{ m}$ for standard passenger and light commercial vehicles, $0.50\text{ m}\text{--}0.60\text{ m}$ for emergency response and four-wheel-drive ($4\times 4$) utility vehicles, and $0.90\text{ m}\text{--}1.00\text{ m}$ for heavy off-road civil defense and disaster response trucks. Complementing these thresholds, Martínez-Gomariz et al. (2018) confirmed that heavier high-clearance vehicles resist buoyancy and sliding instability at significantly greater inundation depths than light vehicles, while Pregnolato et al. (2017) demonstrated that even when water depths remain below a vehicle's maximum wading threshold (${W}_{max}$), hydrodynamic drag imposes progressive travel speed reductions across partially inundated edges.

**Humanitarian Logistics and Vehicle Routing Problems**  
Effective humanitarian logistics is heavily dependent on the ability to rapidly adapt to a compromised transportation network during the immediate post-disaster response phase. Traditional commercial Vehicle Routing Problems (VRP) and Traveling Salesperson Problems (TSP) primarily focus on minimizing monetary cost or travel distance across stable, fully connected road networks under normal operating conditions. However, emergency relief scheduling requires a fundamentally different mathematical paradigm in which road network degradation, link impassability, and travel-time uncertainty are explicitly modeled (Boonmee et al., 2017; Liu et al., 2020). In a comprehensive review of humanitarian operations, Boonmee et al. (2017) emphasized that post-disaster distribution networks face acute structural chaos, rendering static, single-objective deterministic optimization models insufficient when links fail dynamically. Within the Philippine operational context, De Lara et al. (2014) modeled regional relief distribution across calamity-prone areas in Region IV-A (CALABARZON, including Cavite) using centralized staging and dispatch architectures, while Putong and De Leon (2018) adapted last-mile relief distribution modeling to originate from centralized local distribution centers and dispatch vehicle routing loops over open road networks.

Furthermore, last-mile disaster relief distribution involves inherent multi-criteria trade-offs that cannot be captured by distance minimization alone. Ferrer et al. (2018) demonstrated in last-mile humanitarian distribution benchmarks—including flood and earthquake test cases—that optimizing solely for transit distance or operational cost frequently delays aid to the most severely affected shelters. Similarly, Liu et al. (2020) showed that post-disaster rescue and relief routing must evaluate rescue efficiency and cumulative arrival times alongside road network disruption rather than relying on greedy, point-to-point shortest paths. When road segments are degraded by hybrid uncertainties in demand and link traversability (Phongmoo et al., 2023), constructive heuristics such as Greedy Nearest-Neighbor (GNN) exhibit locally myopic behavior—selecting proximate stops step-by-step while inadvertently stranding high-priority nodes at the tail end of the tour.

To overcome this limitation, recent humanitarian VRP formulations explicitly incorporate node urgency weights and arrival latency into multi-objective fitness functions. Lu et al. (2022) formulated a multi-objective humanitarian routing model that minimizes arrival times to critical demand nodes while balancing resource fulfillment, demonstrating that time-sensitive prioritization substantially reduces unmet survival needs. In a similar vein, Altinoz and Altinoz (2023) modeled the multi-objective routing problem with explicit vertex urgency coefficients, demonstrating that weighting cumulative arrival times by facility urgency forces the optimizer to schedule high-severity nodes early in the tour sequence even when doing so requires a marginally longer total loop distance.

**Multi-Objective Swarm Optimization and Constraint Handling**  
Solving NP-hard combinatorial routing problems with competing objectives requires metaheuristic frameworks capable of navigating discrete permutation spaces without combinatorial explosion. While canonical Particle Swarm Optimization (PSO) was originally designed for continuous real-valued search spaces, adapting PSO to the TSP and VRP requires discretizing particle positions and velocities. Emambocus et al. (2021) formalized an enhanced swap-sequence-based Discrete PSO for the TSP in which each particle's position is encoded as an ordered permutation of nodes, and velocity is represented as a Swap Sequence ($SS$) composed of elementary Swap Operators ($SO$) that exchange pairs of nodes within the tour. By replacing continuous vector subtraction with permutation difference operators ($\ominus$) and probabilistic swap applications ($\oplus$), swap-sequence DPSO preserves valid tour permutations at every iteration while avoiding premature stagnation on complex routing topologies (Emambocus et al., 2021).

When extending discrete PSO to simultaneous conflicting objectives—such as total transit distance (${f}_{1}$) and urgency-weighted arrival latency (${f}_{2}$)—scalarizing the objectives into a single weighted sum introduces subjective bias and fails to capture concave portions of the trade-off surface. Instead, Pareto-based Multi-Objective PSO (MO-PSO) frameworks maintain an external archive of non-dominated solutions governed by Pareto dominance relations and crowding-based diversity preservation (Bacar & Rawhoudine, 2021). Bacar and Rawhoudine (2021) demonstrated that combining discrete attractor updates with archive diversity management preserves solution spread along the Pareto front in multi-objective vehicle routing problems, enabling decision-makers to select trade-off routes based on operational priorities. Within the Philippine disaster planning context, de Veluz et al. (2023) validated a scenario-based Multi-Objective Particle Swarm Optimization model for pre-disaster location-routing, confirming that MO-PSO effectively navigates complex regional municipal networks and hazard zones to generate non-dominated relief schedules.

Finally, ensuring that swarm particles never select physically hazardous routes requires rigorous constraint-handling mechanisms embedded directly within the fitness evaluation. Recent advances in emergency path optimization demonstrate that incorporating strict mathematical penalty functions into a PSO framework prevents the propagation of constraint-violating trajectories across the swarm (Zou et al., 2025). Specifically, Zou et al. (2025) showed that assigning severe penalty costs to road segments that violate operational safety thresholds or time-critical boundaries forces personal best ($pBest$) and global best ($gBest$) leaders to converge exclusively within the feasible subgraph, resolving complex multi-stop emergency routing dilemmas without sacrificing algorithmic convergence stability.

**Synthesis**  
Collectively, the reviewed literature establishes the theoretical and empirical foundations required for flood-constrained relief routing. Geospatial studies confirm that OpenStreetMap road networks extracted via OSMnx (Boeing, 2017, 2025) can be intersected with high-resolution UP NOAH return-period flood hazard maps (Lagmay et al., 2017; Cadiz, 2018) to identify inundated transportation corridors (Klipper et al., 2021; Petricola et al., 2022). Hydrodynamic trafficability and vehicle stability studies establish multi-class wading depth limits (${W}_{max}$) of $0.30\text{ m}$ for light vehicles, $0.60\text{ m}$ for $4\times 4$ emergency vehicles, and $1.00\text{ m}$ for heavy off-road disaster response trucks (Kramer et al., 2016; Martínez-Gomariz et al., 2018), alongside depth-speed disruption principles (Pregnolato et al., 2017). Concurrently, Philippine and international humanitarian operations research underscores that post-disaster distribution from centralized staging hubs over open road networks (De Lara et al., 2014; Putong & De Leon, 2018) must balance transit distance against urgency-weighted arrival latency using non-dominated Pareto optimization rather than myopic greedy heuristics (Boonmee et al., 2017; Ferrer et al., 2018; Liu et al., 2020; Lu et al., 2022; Altinoz & Altinoz, 2023; Phongmoo et al., 2023). Finally, algorithmic studies validate swap-sequence Discrete PSO, Pareto archiving, and hard-penalty constraint handling for combinatorial routing (Bacar & Rawhoudine, 2021; Emambocus et al., 2021; de Veluz et al., 2023; Zou et al., 2025). However, among the reviewed works, flood-accessibility studies primarily evaluate static point-to-point network connectivity without multi-objective tour optimization, whereas humanitarian VRP studies optimize multi-stop tours without integrating multi-return-period UP NOAH flood layers and stratified vehicle wading depth limits. This study bridges that gap by integrating OSMnx road topologies, UP NOAH flood hazard tiers, representative Class A/B/C vehicle wading depth hard penalties, and urgency-weighted arrival latency into a unified DMO-PSO routing engine tailored to the high-risk coastal municipalities of Cavite.

**METHODOLOGY**  
1  
2  
3  
**Topic 1**  

**Topic 2**  

**Topic 3**  

**Topic 4**  

**REFERENCES**  
1  
2  
3  
Altinoz, M., & Altinoz, O. T. (2023). Multiobjective problem modeling of the capacitated vehicle routing problem with urgency in a pandemic period. *Neural Computing and Applications*, *35*(9), 6935–6952. [https://doi.org/10.1007/s00521-022-07921-y](https://doi.org/10.1007/s00521-022-07921-y)

Bacar, A.-H. H., & Rawhoudine, S. A. C. (2021). An attractors-based particle swarm optimization for multiobjective capacitated vehicle routing problem. *RAIRO - Operations Research*, *55*(5), 2599–2614. [https://doi.org/10.1051/ro/2021119](https://doi.org/10.1051/ro/2021119)

Boeing, G. (2017). OSMnx: New methods for acquiring, constructing, analyzing, and visualizing complex street networks. *Computers, Environment and Urban Systems*, *65*, 126–139. [https://doi.org/10.1016/j.compenvurbsys.2017.05.004](https://doi.org/10.1016/j.compenvurbsys.2017.05.004)

Boeing, G. (2025). Modeling and analyzing urban networks and amenities with OSMnx. *Geographical Analysis*, *57*(4), 567–577. [https://doi.org/10.1111/gean.70009](https://doi.org/10.1111/gean.70009)

Boonmee, C., Arimura, M., & Asada, T. (2017). Facility location optimization model for emergency humanitarian logistics. *International Journal of Disaster Risk Reduction*, *24*, 485–498. [https://doi.org/10.1016/j.ijdrr.2017.01.017](https://doi.org/10.1016/j.ijdrr.2017.01.017)

Cadiz, N. R. (2018). UP NOAH in building resilient Philippines: Multi-hazard and risk mapping for the future. *Procedia Engineering*, *212*, 1018–1025. [https://doi.org/10.1016/j.proeng.2018.01.131](https://doi.org/10.1016/j.proeng.2018.01.131)

De Lara, M. L. D., Burgos, V. J. B., Silva, A. M. M., & Nazareno, A. L. (2014). Determining the optimal route of vehicles delivering relief goods to the calamity-prone areas in Region IV-A. *Journal of Nature Studies*, *13*(2), 13–24.

de Veluz, M. R. D., Redi, A. A. N. P., Maaliw, R. R., III, Persada, S. F., Prasetyo, Y. T., & Young, M. N. (2023). Scenario-based multi-objective location-routing model for pre-disaster planning: A Philippine case study. *Sustainability*, *15*(6), 4882. [https://doi.org/10.3390/su15064882](https://doi.org/10.3390/su15064882)

Emambocus, B. A. S., Jasser, M. B., Hamzah, M., Mustapha, A., & Amphawan, A. (2021). An enhanced swap sequence-based particle swarm optimization algorithm to solve TSP. *IEEE Access*, *9*, 164820–164836. [https://doi.org/10.1109/ACCESS.2021.3133493](https://doi.org/10.1109/ACCESS.2021.3133493)

Ferrer, J. M., Martín-Campo, F. J., Ortuño, M. T., Pedraza-Martínez, A. J., Tirado, G., & Vitoriano, B. (2018). Multi-criteria optimization for last mile distribution of disaster relief aid: Test cases and applications. *European Journal of Operational Research*, *269*(2), 501–515. [https://doi.org/10.1016/j.ejor.2018.02.043](https://doi.org/10.1016/j.ejor.2018.02.043)

Klipper, I. G., Zipf, A., & Lautenbach, S. (2021). Flood impact assessment on road network and healthcare access at the example of Jakarta, Indonesia. *AGILE: GIScience Series*, *2*, 4. [https://doi.org/10.5194/agile-giss-2-4-2021](https://doi.org/10.5194/agile-giss-2-4-2021)

Kramer, M., Terheiden, K., & Wieprecht, S. (2016). Safety criteria for the trafficability of inundated roads in urban floodings. *International Journal of Disaster Risk Reduction*, *17*, 77–84. [https://doi.org/10.1016/j.ijdrr.2016.04.003](https://doi.org/10.1016/j.ijdrr.2016.04.003)

Lagmay, A. M. F., Racoma, B. A., Aracan, K. A., Alconis-Ayco, J., & Saddi, I. L. (2017). Disseminating near-real-time hazards information and flood maps in the Philippines through Web-GIS. *Journal of Environmental Sciences*, *59*, 13–23. [https://doi.org/10.1016/j.jes.2017.03.014](https://doi.org/10.1016/j.jes.2017.03.014)

Liu, B., Sheu, J.-B., Zhao, X., Chen, Y., & Zhang, W. (2020). Decision making on post-disaster rescue routing problems from the rescue efficiency perspective. *European Journal of Operational Research*, *286*(1), 321–335. [https://doi.org/10.1016/j.ejor.2020.03.017](https://doi.org/10.1016/j.ejor.2020.03.017)

Lu, Y., Yang, C., & Yang, J. (2022). A multi-objective humanitarian pickup and delivery vehicle routing problem with drones. *Annals of Operations Research*, *319*(1), 291–353. [https://doi.org/10.1007/s10479-022-04816-y](https://doi.org/10.1007/s10479-022-04816-y)

Martínez-Gomariz, E., Gómez, M., Russo, B., & Djordjević, S. (2018). Stability criteria for flooded vehicles: A state-of-the-art review. *Journal of Flood Risk Management*, *11*(S2), S817–S826. [https://doi.org/10.1111/jfr3.12262](https://doi.org/10.1111/jfr3.12262)

National Disaster Risk Reduction and Management Council. (2022). *Situational Report No. 33 for the combined effects of Severe Tropical Storm Paeng (Nalgae) in CALABARZON (Cavite Province)*. Office of Civil Defense, Camp General Emilio Aguinaldo, Quezon City, Philippines.

National Disaster Risk Reduction and Management Council. (2024). *Situational reports on the combined effects of Southwest Monsoon, Super Typhoon Carina (Gaemi), and Severe Tropical Storm Kristine (Trami) in CALABARZON (Cavite Province)*. Office of Civil Defense, Camp General Emilio Aguinaldo, Quezon City, Philippines.

Petricola, S., Reinmuth, M., Lautenbach, S., Hatfield, C., & Zipf, A. (2022). Assessing road criticality and loss of healthcare accessibility during floods: The case of Cyclone Idai, Mozambique 2019. *International Journal of Health Geographics*, *21*(1), 14. [https://doi.org/10.1186/s12942-022-00315-2](https://doi.org/10.1186/s12942-022-00315-2)

Phongmoo, S., Leksakul, K., Charoenchai, N., & Boonmee, C. (2023). Vehicle routing problem for humanitarian relief distribution under hybrid uncertainty. *Kybernetes*, *52*(4), 1503–1527. [https://doi.org/10.1108/K-09-2021-0839](https://doi.org/10.1108/K-09-2021-0839)

Pregnolato, M., Ford, A., Wilkinson, S. M., & Dawson, R. J. (2017). The impact of flooding on road transport: A depth-disruption function. *Transportation Research Part D: Transport and Environment*, *55*, 67–81. [https://doi.org/10.1016/j.trd.2017.06.020](https://doi.org/10.1016/j.trd.2017.06.020)

Putong, L. G. L., & De Leon, M. M. (2018). A modified Balcik last mile distribution model for relief operations using open road networks. *Procedia Engineering*, *212*, 133–140. [https://doi.org/10.1016/j.proeng.2018.01.018](https://doi.org/10.1016/j.proeng.2018.01.018)

Republic Act No. 10121. (2010). *An Act Strengthening the Philippine Disaster Risk Reduction and Management System, Providing for the National Disaster Risk Reduction and Management Framework and Institutionalizing the National Disaster Risk Reduction and Management Plan, Appropriating Funds Therefor and for Other Purposes*. Official Gazette of the Republic of the Philippines.

Zou, Z., Zeng, H., Zheng, X., & Chen, J. (2025). Research on multi-center path optimization for emergency events based on an improved particle swarm optimization algorithm. *Mathematics*, *13*(4), 654. [https://doi.org/10.3390/math13040654](https://doi.org/10.3390/math13040654)

**APPENDICES**

**Appendix A**  
UP NOAH Return-Period Flood Hazard Overlay (5-Year, 25-Year, and 100-Year) and Target Coastal Road Network of Cavite (Bacoor, Cavite City, Kawit, Noveleta, and Rosario)

**Appendix B**  
Two-Tier Vehicle Classification Matrix (Class A, B, and C) Based on Kramer et al. (2016) and Representative Commercial Automotive Fleet Specifications

**Appendix C**  
Political Boundary Map of Cavite (District Level)

