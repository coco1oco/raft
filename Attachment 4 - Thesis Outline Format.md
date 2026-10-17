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
|            Scope and Limitation of the Study………………………………… | 6 |
|            Definition of Terms………………..………………………………… | 7 |
| **REVIEW OF RELATED LITERATURE**…………………………………… | 10 |
|            Technical Background….…………...……………………………… | 10 |
|            Humanitarian Logistics and Vehicle Routing Problems………… | 10 |
|            Multi-Objective Swarm Optimization and Constraint Handling… | 11 |
|            Synthesis……………………………………………………………... | 12 |
| **METHODOLOGY**……………………………………………………………. | X |
|            Research Design and System Architecture……………………… | X |
|            Spatial Network Extraction and Flood Hazard Intersection…… | X |
|            DMO-PSO Mathematical Formulation and Constraint Handling | X |
|            Experimental Setup, Evaluation Metrics, and Validation……… | X |
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
	The geographical location of the Philippines makes it highly susceptible to severe typhoons and monsoon rains, frequently resulting in catastrophic flooding. In response to these persistent environmental threats, the national government enacted Republic Act No. 10121 (the Philippine Disaster Risk Reduction and Management Act), mandating the development of data-driven frameworks for disaster mitigation, preparedness, and response. During extreme weather events in Cavite, relief logistics encounter critical operational bottlenecks because standard consumer navigation applications calculate routes solely based on distance or typical traffic flow. These systems fail to account for environmental hazards, vehicle-specific physical tolerances, and localized humanitarian priorities often resulting in stranded relief vehicles and delayed aid distribution across affected barangays.

This study addresses the gap in humanitarian logistics by moving beyond traditional, static shortest-path algorithms that handle routing purely on a point-to-point basis. Managing multi-stop relief distribution under variable environmental threats is a complex variant of the Traveling Salesperson Problem (TSP) / Multi-Stop Route Optimization problem, which is fundamentally NP-hard. When multiple, conflicting objectives such as minimizing transit distance while enforcing flood-passability constraints and addressing varying levels of location urgency must be balanced simultaneously, deterministic algorithms fail to scale effectively.

To resolve these limitations, this research proposes a dynamic routing engine that integrates open-source geographic data from OpenStreetMap (via OSMnx) with peer-reviewed flood hazard maps from UP NOAH. Employing a Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) algorithm allows the system to evaluate candidate delivery sequences as holistic loops rather than step-by-step choices. This global evaluation ensures that Local Government Units (LGUs) can maintain resilient, adaptive logistical dispatch operations, and optimize resource distribution even when physical infrastructure degrades.

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

**REVIEW OF RELATED LITERATURE**

**Technical Background**  
The computational architecture of disaster routing decision systems relies on the intersection of spatial network graph theory, hydrological hazard modeling, and empirical vehicle disruption functions. To construct computable network topologies from open geospatial repositories, street networks derived from OpenStreetMap (OSM) vector data are extracted and modeled via the OSMnx Python library as primal, non-planar directed multigraphs $G=\left(V,E\right)$, where street intersections and dead-ends constitute vertices $V$ and traversable road corridors are formulated as weighted edges $E$ containing spatial geometry, length, and speed attributes (Boeing, 2017, 2025). Unlike simplified Euclidean grid abstractions, OSMnx preserves topological street continuity, one-way flow restrictions, and true curvilinear road lengths, enabling realistic shortest-path and network centrality computations within Python scientific workflows.

To evaluate how hydrometeorological hazards compromise these street graphs, high-resolution flood inundation layers must be spatially intersected with road edge geometries. In the Philippines, the Nationwide Operational Assessment of Hazards (UP NOAH) generated granular (1:10,000 scale) LiDAR-derived flood hazard maps across major river basins and coastal zones, categorizing inundation extents into discrete hazard tiers corresponding to low ($0.1\text{ m}\text{--}0.5\text{ m}$), medium ($0.5\text{ m}\text{--}1.5\text{ m}$), and high ($>1.5\text{ m}$) flood depths across 5-year, 25-year, and 100-year rainfall return periods (Lagmay et al., 2017; Cadiz, 2018). Recent geospatial accessibility studies demonstrate that intersecting flood extent polygons with OpenStreetMap road networks reveals severe topological fragmentation during extreme weather events. For instance, Klipper et al. (2021) overlaid flood footprints onto OSM road graphs in Jakarta to quantify travel-time inflation and corridor loss toward critical facilities, while Petricola et al. (2022) utilized open street networks during Cyclone Idai to identify critical road segments whose inundation completely isolated vulnerable communities from emergency response hubs.

Translating intersected flood depths into actionable routing constraints requires establishing physical vehicle wading tolerances and speed-degradation rules. Pregnolato et al. (2017) synthesized experimental hydrodynamics, safety literature, and empirical incident records to formulate a widely adopted depth-disruption function relating standing water depth to maximum safe vehicle speed and passability. Their findings establish $300\text{ mm}$ ($0.30\text{ m}$) as the critical stability ceiling for standard passenger cars and light commercial vans (beyond which buoyancy and air-intake water ingestion cause stalling or floating), while higher-clearance four-wheel-drive support vehicles and heavy utility trucks tolerate approximately $600\text{ mm}$ ($0.60\text{ m}$) to $1,000\text{ mm}$ ($1.00\text{ m}$) of standing water before losing traction or suffering mechanical failure (Pregnolato et al., 2017). Furthermore, when water depths remain below a vehicle's maximum wading threshold (${W}_{max}$), hydrodynamic drag and reduced visibility still impose progressive travel speed reductions, directly increasing cumulative arrival times across partially inundated edges.

**Humanitarian Logistics and Vehicle Routing Problems**  
Effective humanitarian logistics is heavily dependent on the ability to rapidly adapt to a compromised transportation network during the immediate post-disaster response phase. Traditional commercial Vehicle Routing Problems (VRP) and Traveling Salesperson Problems (TSP) primarily focus on minimizing monetary cost or travel distance across stable, fully connected road networks under normal operating conditions. However, emergency relief scheduling requires a fundamentally different mathematical paradigm in which road network degradation, link impassability, and travel-time uncertainty are explicitly modeled (Boonmee et al., 2017; Liu et al., 2020). In a comprehensive review of humanitarian operations, Boonmee et al. (2017) emphasized that post-disaster distribution networks face acute structural chaos, rendering static, single-objective deterministic optimization models insufficient when links fail dynamically.

Furthermore, last-mile disaster relief distribution involves inherent multi-criteria trade-offs that cannot be captured by distance minimization alone. Ferrer et al. (2018) demonstrated in last-mile humanitarian distribution benchmarks—including flood and earthquake test cases—that optimizing solely for transit distance or operational cost frequently delays aid to the most severely affected shelters. Similarly, Liu et al. (2020) showed that post-disaster rescue and relief routing must evaluate rescue efficiency and cumulative arrival times alongside road network disruption rather than relying on greedy, point-to-point shortest paths. When road segments are degraded by hybrid uncertainties in demand and link traversability, deterministic heuristics such as Greedy Nearest-Neighbor (GNN) exhibit myopic behavior—selecting locally proximate stops first while inadvertently stranding high-priority nodes at the tail end of the tour or routing into impassable bottlenecks (Phongmoo et al., 2023).

To overcome this limitation, recent humanitarian VRP formulations explicitly incorporate node urgency weights and arrival latency into multi-objective fitness functions. Lu et al. (2022) formulated a multi-objective humanitarian routing model that minimizes arrival times to critical demand nodes while balancing resource fulfillment, demonstrating that time-sensitive prioritization substantially reduces unmet survival needs. In a similar vein, Altinoz and Altinoz (2023) modeled the multi-objective routing problem with explicit vertex urgency coefficients, proving that weighting cumulative arrival times by facility urgency forces the optimizer to schedule high-severity nodes early in the tour sequence even when doing so requires a marginally longer total loop distance.

**Multi-Objective Swarm Optimization and Constraint Handling**  
Solving NP-hard combinatorial routing problems with competing objectives requires metaheuristic frameworks capable of navigating discrete permutation spaces without combinatorial explosion. While canonical Particle Swarm Optimization (PSO) was originally designed for continuous real-valued search spaces, adapting PSO to the TSP and VRP requires discretizing particle positions and velocities. Emambocus et al. (2021) formalized an enhanced swap-sequence-based Discrete PSO for the TSP in which each particle's position is encoded as an ordered permutation of nodes, and velocity is represented as a Swap Sequence ($SS$) composed of elementary Swap Operators ($SO$) that exchange pairs of nodes within the tour. By replacing continuous vector subtraction with permutation difference operators ($\ominus$) and probabilistic swap applications ($\oplus$), swap-sequence DPSO preserves valid tour permutations at every iteration while avoiding premature stagnation on complex routing topologies (Emambocus et al., 2021).

When extending discrete PSO to simultaneous conflicting objectives—such as total transit distance (${f}_{1}$) and urgency-weighted arrival latency (${f}_{2}$)—scalarizing the objectives into a single weighted sum introduces subjective bias and fails to capture concave portions of the trade-off surface. Instead, Pareto-based Multi-Objective PSO (MO-PSO) frameworks maintain an external archive of non-dominated solutions governed by Pareto dominance relations and crowding distance metrics (Bacar & Rawhoudine, 2021). Bacar and Rawhoudine (2021) demonstrated that combining discrete attractor updates with crowding-distance archiving preserves solution diversity along the Pareto front in multi-objective vehicle routing problems, enabling decision-makers to select trade-off routes based on operational priorities. Within the Philippine disaster planning context, de Veluz et al. (2023) validated a scenario-based Multi-Objective Particle Swarm Optimization model for pre-disaster location-routing, confirming that MO-PSO effectively navigates complex regional municipal networks and hazard zones to generate non-dominated relief schedules.

Finally, ensuring that swarm particles never select physically hazardous routes requires rigorous constraint-handling mechanisms embedded directly within the fitness evaluation. Recent advances in emergency path optimization demonstrate that incorporating strict mathematical penalty functions into a PSO framework prevents the propagation of constraint-violating trajectories across the swarm (Zou et al., 2025). Specifically, Zou et al. (2025) showed that assigning severe penalty costs to road segments that violate operational safety thresholds or time-critical boundaries forces personal best ($pBest$) and global best ($gBest$) leaders to converge exclusively within the feasible subgraph, resolving complex multi-stop emergency routing dilemmas without sacrificing algorithmic convergence stability.

**Synthesis**  
Collectively, the reviewed literature establishes the theoretical and empirical foundations required for flood-constrained relief routing. Geospatial studies confirm that OpenStreetMap road networks extracted via OSMnx (Boeing, 2017, 2025) can be intersected with high-resolution UP NOAH return-period flood hazard maps (Lagmay et al., 2017; Cadiz, 2018) to identify inundated transportation corridors (Klipper et al., 2021; Petricola et al., 2022), while hydrodynamic transport research provides empirical vehicle wading depth thresholds (${W}_{max}$) of $0.30\text{ m}$, $0.60\text{ m}$, and $1.00\text{ m}$ across vehicle classes (Pregnolato et al., 2017). Concurrently, humanitarian operations research underscores that post-disaster distribution must balance transit distance against urgency-weighted arrival latency using non-dominated Pareto optimization rather than myopic greedy heuristics (Boonmee et al., 2017; Ferrer et al., 2018; Liu et al., 2020; Lu et al., 2022; Altinoz & Altinoz, 2023; Phongmoo et al., 2023). Finally, algorithmic studies validate swap-sequence Discrete PSO, crowding-distance Pareto archiving, and hard-penalty constraint handling for combinatorial routing (Bacar & Rawhoudine, 2021; Emambocus et al., 2021; de Veluz et al., 2023; Zou et al., 2025). However, existing studies either assess flood road disruption statically without multi-objective tour optimization or optimize humanitarian VRP models over abstract networks without vehicle-class wading depth constraints. This study bridges that gap by integrating OSMnx road topologies, UP NOAH flood hazard tiers, Class A/B/C vehicle wading depth hard penalties, and urgency-weighted arrival latency into a unified DMO-PSO routing engine tailored to the high-risk coastal municipalities of Cavite.

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

de Veluz, M. R. D., Redi, A. A. N. P., Maaliw, R. R., III, Persada, S. F., Prasetyo, Y. T., & Young, M. N. (2023). Scenario-based multi-objective location-routing model for pre-disaster planning: A Philippine case study. *Sustainability*, *15*(6), 4882. [https://doi.org/10.3390/su15064882](https://doi.org/10.3390/su15064882)

Emambocus, B. A. S., Jasser, M. B., Hamzah, M., Mustapha, A., & Amphawan, A. (2021). An enhanced swap sequence-based particle swarm optimization algorithm to solve TSP. *IEEE Access*, *9*, 164820–164836. [https://doi.org/10.1109/ACCESS.2021.3133493](https://doi.org/10.1109/ACCESS.2021.3133493)

Ferrer, J. M., Martín-Campo, F. J., Ortuño, M. T., Pedraza-Martínez, A. J., Tirado, G., & Vitoriano, B. (2018). Multi-criteria optimization for last mile distribution of disaster relief aid: Test cases and applications. *European Journal of Operational Research*, *269*(2), 501–515. [https://doi.org/10.1016/j.ejor.2018.02.043](https://doi.org/10.1016/j.ejor.2018.02.043)

Klipper, I. G., Zipf, A., & Lautenbach, S. (2021). Flood impact assessment on road network and healthcare access at the example of Jakarta, Indonesia. *AGILE: GIScience Series*, *2*, 4. [https://doi.org/10.5194/agile-giss-2-4-2021](https://doi.org/10.5194/agile-giss-2-4-2021)

Lagmay, A. M. F., Racoma, B. A., Aracan, K. A., Alconis-Ayco, J., & Saddi, I. L. (2017). Disseminating near-real-time hazards information and flood maps in the Philippines through Web-GIS. *Journal of Environmental Sciences*, *59*, 13–23. [https://doi.org/10.1016/j.jes.2017.03.014](https://doi.org/10.1016/j.jes.2017.03.014)

Liu, B., Sheu, J.-B., Zhao, X., Chen, Y., & Zhang, W. (2020). Decision making on post-disaster rescue routing problems from the rescue efficiency perspective. *European Journal of Operational Research*, *286*(1), 321–335. [https://doi.org/10.1016/j.ejor.2020.03.017](https://doi.org/10.1016/j.ejor.2020.03.017)

Lu, Y., Yang, C., & Yang, J. (2022). A multi-objective humanitarian pickup and delivery vehicle routing problem with drones. *Annals of Operations Research*, *319*(1), 291–353. [https://doi.org/10.1007/s10479-022-04816-y](https://doi.org/10.1007/s10479-022-04816-y)

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

