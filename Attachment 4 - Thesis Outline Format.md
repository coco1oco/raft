**DYNAMIC ROUTING OF RELIEF GOODS IN HIGH COASTAL AREA OF CAVITE USING DISCRETE MULTI-OBJECTIVE PARTICLE SWARM OPTIMIZATION**

**UNDER FLOOD CONSTRAINTS**

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

In partial fulfilment

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

October 2026![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4XmP4//8/AwAI/AL+GwXmLwAAAABJRU5ErkJggg==)

**TABLE OF CONTENTS**

1

2

3

**Page**

| **INTRODUCTION**……………………………………………………………..          | 1   |
| -------------------------------------------------- | --- |
| Statement of the Problem…………………………………………...        | 2   |
| Objectives of the Study……………………………………………...        | 3   |
| Hypothesis……………….…………………………………………...               | 0   |
| Significance of the Study........……………………………………... | 4   |
| Scope and Limitation of the Study…………………………………     | 5   |
| Definition of Terms………………..…………………………………           | 6   |
| **REVIEW OF RELATED LITERATURE**……………………………………     | X   |
| Technical Background….…………...………………………………          | X   |
| Topic 2………………………………...………………………………                 | X   |
| Topic 3………………………………...………………………………                 | X   |
| **METHODOLOGY**…………………………………………………………….            | X   |
| Topic 1………………………………...………………………………                 | X   |
| Topic 2………………………………...………………………………                 | X   |
| Topic 3………………………………...………………………………                 | X   |
| **REFERENCES**……………………………………………………………….            | X   |
| **APPENDICES**………………………………………………………………..           | X   |

**DYNAMIC ROUTING OF RELIEF GOODS IN HIGH COASTAL AREA OF CAVITE USING DISCRETE MULTI-OBJECTIVE PARTICLE SWARM OPTIMIZATION**

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

An undergraduate thesis outline submitted to the faculty of the Department of Information Technology, College of Engineering and Information Technology, Cavite State University, Indang, Cavite in partial fulfillment for the degree of Bachelor of Science in Computer Science with Contribution No. \_**\_**\_**\_**\___. Prepared under the supervision of Mr. Ace Amiel E. Malicsi.

1

2

3

**INTRODUCTION**

1

2

3

The geographical location of the Philippines makes it highly susceptible to severe typhoons and monsoon rains, frequently resulting in catastrophic flooding. In response to these persistent environmental threats, the national government enacted Republic Act No. 10121 (the Philippine Disaster Risk Reduction and Management Act), mandating the development of data-driven frameworks for disaster mitigation, preparedness, and response. During extreme weather events in Cavite, relief logistics encounter critical operational bottlenecks because standard consumer navigation applications calculate routes solely based on distance or typical traffic flow. These systems completely fail to account for environmental hazards, vehicle-specific physical tolerances, or localized humanitarian priorities that often leads to stranded relief vehicles that causes delayed distribution of critical aid across affected barangays.

This study addresses the gap in humanitarian logistics by moving beyond traditional, static shortest-path algorithms that handle routing purely on a point-to-point basis. Managing multi-stop relief distribution under variable environmental threats is a complex variant of the Traveling Salesperson Problem (TSP) / Multi-Stop Route Optimization problem, which is fundamentally NP-hard. When multiple, conflicting objectives such as minimizing transit distance while enforcing flood-passability constraints and addressing varying levels of location urgency must be balanced simultaneously, deterministic algorithms fail to scale effectively.

To resolve these limitations, this research proposes a dynamic routing engine that integrates open-source geographic data from OpenStreetMap (via OSMnx) with peer-reviewed flood hazard maps from UP NOAH. Employing a Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) algorithm allows the system to evaluate candidate delivery sequences as holistic loops rather than step-by-step choices. This global evaluation ensures that Local Government Units (LGUs) can maintain resilient, adaptive logistical dispatch operations, and optimize resource distribution even when physical infrastructure degrades.

**Statement of the Problem**

Insert a paragraph to introduce how you identified the actual problem. In this case, you can collect data from experts – survey or interview; or thru reading existing social science research; empirically; or media outlets, etc. In-text citations are needed, if applicable.

With the growing need for secure data transmission in the digital age, image steganography has become an essential technique for covert communication. However, traditional steganography methods are vulnerable to steganalysis attacks and may compromise data integrity. This creates a challenge for individuals and organizations seeking secure and reliable means of data transmission.

Insert a paragraph to introduce the literature where the research problems originated, and it is in the form of a review. If multiple literature (which is ideal), two or more paragraphs (review) can be provided. In-text citations are needed.

The research problem is the lack of a comprehensive method that effectively combines image steganography with robust integrity features. Existing methods may not provide adequate protection against steganalysis attacks, nor do they consistently verify data integrity once data is extracted. This gap in existing approaches presents a critical need for a novel method that enhances security by incorporating features such as error correction codes, checksums, or cryptographic hashes directly into the image. Such an approach would improve resistance to attacks and ensure data remains unaltered, providing a higher level of trustworthiness for users.

This study aims to address this gap by developing a novel image steganography method that integrates integrity features for improved security and data reliability.

**Objectives of the Study**

The general objective of this study is to develop a web-based dynamic routing decision support system for disaster relief distribution in Cavite using a Discrete Multi-Objective Particle Swarm Optimization (PSO) algorithm under simulated return-period flood constraints and interactive roadblock inputs. Specifically, it aims to:

1. Extract and construct a mathematical road network graph of Cavite constructed from OpenStreetMap data using the OSMnx library and spatially intersect it with digitized local flood hazard shapefiles.
2. Build a Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) model in a Python-based backend environment using permutation strings and swap operators to simultaneously minimize total transit distance and urgency-weighted arrival latencies across multi-stop routing loops.
3. Establish a vehicle classification framework (Class A, B, and C) that treats manufacturer-standard wading depth () limits as mathematical hard-penalties within the fitness function to classify road segments as impassable under the assumed flood-depth scenario.
4. Develop an interactive web-based dispatcher dashboard prototype using React and MapLibre GL JS to visualize computed route tracks, handle fleet configurations, and allow interactive manual hazard override injections by dispatchers.
5. Test and validate the DMO-PSO engine through simulated flood scenarios against a baseline Greedy Nearest-Neighbor (GNN) heuristic to evaluate comparative solution quality (total distance and urgency-weighted latency), convergence stability, constraint satisfaction rates, and execution runtimes ().

**Significance of the Study**

This study provides technical and practical value to several key stakeholders:

1. Local Government Units and DRRM Offices: Provides a specialized, web-based decision support system that replaces subjective dispatch estimates with scientifically validated, constraint-aware routing layouts
2. Relief Drivers and Logistics Teams: Mitigates logistical routing failures by proactively identifying road segments where estimated flood depths exceed vehicle limits and generating detours that comply with vehicle wading thresholds before deployment.
3. Affected Communities: Optimizes delivery order based on quantified disaster urgency metrics and priority, ensuring that underserved, remote, or highly critical areas are prioritized over basic geographical proximity.
4. Academic Community: Contributes to the fields of Data Science and Web Engineering by demonstrating how continuous metaheuristic algorithms can be successfully discretized and integrated into modern web prototypes to solve spatial network routing problems.

**Scope and Limitations**

The primary focus of this study is the development and algorithmic validation of a web-based dynamic routing decision support system for humanitarian disaster relief operations. The system formulates relief distribution as a multi-objective variant of Traveling Salesperson Problem (TSP) under environmental hazard constraint. The specific scope encompasses the following components:

1. **Geographic Delimitation**: The scope area of this study strictly focuses on the low-lying, highly flooded vulnerable coastal part of Cavite specifically covering the City of Bacoor, Cavite City, Kawit, Noveleta, and Rosario. These specific areas are prioritized due to their high flood elevations, high exposure to coastal storm surges, backwater river flow, and recurring isolation during monsoon seasons and tropical cyclones. Other municipalities of Cavite are excluded from the active routing network to maintain computational focus on high-risk coastal zones.
2. **Static and Simulated Hazard Layers**: Flood hazard assessments rely on digitized static return-period models from UP NOAH and simulated hydrological data rather than live, real-time physical sensors. Road condition changes depend on manual input from dispatcher via dashboard's interactive roadblock override feature rather than automated sensor ingestion.
3. **Logistics and Dispatch Assumptions**: &lt;yung process ng LGU/DRRMC ng distribution&gt; Vehicle mechanical failures, driver fatigue limits, and fuel consumption thermodynamics are outside the scope of the mathematical formulation.

**Definition of Terms**

**Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO).** An optimization technique derived from swarm intelligence that refers to the specialized algorithm developed in Python that models relief routing sequences as discrete permutation vectors, utilizing swap operators and swap sequences to navigate the Pareto front and simultaneously minimize total travel distance and urgency-weighted arrival latency.

**Class A, B, and C Relief Vehicles.** Categorized transportation assets classified according to physical payload capacity, chassis height, and operational capability of a vehicle under flood constraints.

**Greedy Nearest-Neighbor (GNN).** A deterministic heuristic algorithm that builds a routing path by iteratively choosing the unvisited node closest to the current location. It serves as a baseline benchmark algorithm against which the solution quality, route latency, and constraint compliance of the DMO-PSO engine are comparatively evaluated.

**REVIEW OF RELATED LITERATURE**

Effective humanitarian logistics is heavily dependent on the ability to rapidly adapt to a compromised transportation network. Traditional vehicle routing problems (VRP) primarily focus on minimizing cost or distance under normal operating conditions. However, emergency vehicle scheduling requires a distinct approach where travel time uncertainty and road network degradation must be accounted for mathematically (Zhang et al., 2020)

To address the volatile conditions of active crisis zones, contemporary research models disaster distribution networks as complex, dynamic variants of the VRP. This approach is supported by a comprehensive survey on humanitarian operations, which found that post-disaster networks face extreme operational chaos, making conventional single-objective optimization models insufficient and necessitating highly flexible metaheuristic frameworks capable of dynamically reacting to real-time infrastructure failures (Boonmee et al., 2021).

To process spatial data for logistical computation, tools like OSMnx are utilized to model urban street networks derived from OpenStreetMap (OSM) data as computable mathematical graphs (Boeing, 2025). This computational approach allows street network corridors to be represented as vertices and weighted edges, enabling direct network analysis within algorithmic environments.

In the Philippines, the Nationwide Operational Assessment of Hazards (UP NOAH) successfully mapped highly granular (1:10,000 scale) hazard maps that provide empirical baselines for flood susceptibility (Lagmay, 2018). When these high-resolution hydrological layers are intersected with network topologies, they provide the empirical boundaries required to assess road passability. The validity of applying this type of swarm optimization to regional Philippine topographies has been verified by recent location-routing studies, which successfully deployed multi-objective frameworks to navigate complex local municipal assets and hazard zones (German et al., 2023).

Once the graph is established, finding the optimal path through disrupted infrastructure becomes a multi-objective challenge. While standard shortest-path algorithms evaluate a single parameter, emergency logistics requires scheduling models that balance conflicting operational criteria under network degradation and travel time uncertainty (Zhang et al., 2020). To resolve these trade-offs without arbitrary weighting, multi-objective Particle Swarm Optimization (MO-PSO) algorithms provide the metaheuristic flexibility needed to evaluate conflicting criteria such as route latency, distance, and flood-depth constraint compliance across multi-dimensional search spaces (Jiang et al., 2024).

Recent developments in disaster response optimization show that incorporating mathematical penalty functions directly into a swarm's fitness evaluation prevents the selection of constraint-violating paths. For instance, emergency dispatch models achieve consistent constraint compliance when strict penalty costs are integrated directly into a Particle Swarm Optimization (PSO) framework to penalize solutions that violate critical operational boundaries and time-sensitive delivery thresholds (Zou et al., 2025). These formulations demonstrate that discrete and hybrid PSO architectures can effectively resolve complex emergency routing dilemmas under severe operational constraints without sacrificing algorithmic convergence.

**REFERENCES**![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4XmP4//8/AwAI/AL+GwXmLwAAAABJRU5ErkJggg==)![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4XmP4//8/AwAI/AL+GwXmLwAAAABJRU5ErkJggg==)

1

2

3

Ahmed, A. (1999). Risk management trends in the Hong Kong construction industry:

A comparison of contractors and owners perception. _Engineering, Construction_

_and Architectural Management_ 6(3), pp. 225-234.

Bender W. & Ayyub B. (2001). _Risk-based cost control for construction._ Construction

Management Department. Central Washington University.

Chapman C. & Ward S. (1997). _Project risk management: Processes, techniques_

_and insights_. John Wiley.

DOLE. _Department Order 13: Guidelines Governing Occupational Safety and Health_

_in the Construction Industry_

DPWH D.O. 39, S. 2020, _Revised Construction Safety Guidelines for the_

_Implementation of Infrastructure Projects during the COVID-19 Public Health Crisis, repealing D.O. No. 35, S. 2020_

Enshassi A. & Mayer P. (2001). _Managing risks in construction projects._

Flanagan R. & Norman G. (1993). _Risk management and construction_, 2nd Edition.

Blackwell Science.

Hillson, D. & Murray-Webster, R. (2005). _Understanding and managing risk attitude_.

Gower Publishing Limited.

International Labour Organization. (2021). Impact of COVID-19 on the construction

sector. _International Labour Organization._ Retrieved from [https://www.ilo.org/ wcmsp5/groups/public/---ed_dialogue/---sector/documents/briefingnote/wcms \_767303.pdf](https://www.ilo.org/%20wcmsp5/groups/public/---ed_dialogue/---sector/documents/briefingnote/wcms%20_767303.pdf)

Isaac I. (1995). Training in risk management. _International Journal of Project_

_Management_, 13, pp. 225-229.

Jaafari A. (2001). Management of risks, uncertainties and opportunities on projects:

Time for a fundamental shift. _International Journal of Project Management_,

19, pp. 89-101

Kloppenborg, T.J. (2014). _Contemporary project management_, Third Edition.

Cengage Learning

Maytorena, E., Winch, G., & Kiely, T. (2005). _Construction risk identification_.

Manchester Business School, The University of Manchester, M15 6PB, U.K.

Mousa, A. (2005). _Risk management in construction projects from contractors and_

_owners' perspectives_. Retrieved from [https://library.iugaza.edu.ps/ thesis/63916.pdf](https://library.iugaza.edu.ps/%20thesis/63916.pdf)

Mousa, A. & Hmaid, J. (2005). _Risk management in construction projects from_

_contractors and owners' perspectives_. The islamic university_._ Retrieved from

<http://hdl.handle.net/20.500.12358/19451>

Nassaji, H. (2015). _Qualitative and Descriptive Research: Data Type versus_

_Data Analysis_. Language Teaching Research, 19, 129-132. <https://doi.org/10.1177/1362168815572747>

Neeraj, S. & Balasubramanian, M. (2015). _Assessment of risk in construction_

_industry_. Retrieved from <https://www.irjet.net/archives/V2/i1/Irjet-v2i117.pdf>

Nicholas, J.M. & Steyn, H. (2011). _Project Management for Business, Engineering, and Technology Principles and Practice_. Butterworth- Heinemann, Oxford, United Kingdom

Oehmen, J., Olechowski, A., Kenley, C. R., & Ben-Daya, M. (2014). _Analysis of the_

_effect of risk management practices on the performance of new product_

_development programs_. Technovation, 34(8), 441–453. DOI: 10.1016/ j.technovation.2013.12.005

Petrovic, D. (2017). _Risk management in construction projects - A knowledge_

_management perspective from Swedish contractors_. Retrieved from

<https://www.diva-portal.org/smash/get/diva2:1150372/FULLTEXT01.pdf>

Project Management Institute (PMI) (1996). _Project management body of knowledge_.

Project Management Institute, (2016). _A Guide to the Project Management Body of Knowledge (PMBOK)_. Newton Square. Project Management Institute

R.A.11058, "_An Act Strengthening Compliance with Occupational Safety and Health Standards and Providing Penalties for Violations thereof" and its_

_Implementing Rules and Regulations as specified in DOLE D.O. 198 S. 2018_

Raz T. & Michael E. (2001). Use and benefits of tools for project risk management.

_International Journal of Project Management_, 19, pp. 9-17.

Simmons C. (2002). Risk management (managing standards). _Ken Rigby_. Retrieved

from [www.airtime.co.uk](http://www.airtime.co.uk).

Tummala V. & Burchett J. (1999). Applying a risk management process (RPM) to

manage cost risk for an EHV transmission line project. _International Journal of_

_Project Management,_ 17, pp. 223-235.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4XmP4//8/AwAI/AL+GwXmLwAAAABJRU5ErkJggg==)

**APPENDICES**

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4XmP4//8/AwAI/AL+GwXmLwAAAABJRU5ErkJggg==)

**Appendix A**

Survey Questionnaire

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4XmP4//8/AwAI/AL+GwXmLwAAAABJRU5ErkJggg==)

**Appendix B**

Political Boundary Map of Cavite (District Level)