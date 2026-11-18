# Kurt's Revised Presentation Script (Slides 9–10 + Live RAFT Demo)

> **Target Time:** ~7 minutes (~880 spoken words — leaves breathing room so you aren't rushing)
> **Style Tip:** Speak to the panel, don't read off the slide. Pause 1 second after **bold** points and let the live UI do the heavy lifting in Part 3.

---

## PART 1: Slide 9 — Dynamic Re-Optimization (~45 Seconds)

> **[Slide 9 on screen — sweep across the 3 boxes]**

"Picking up from Slide 8—in a real typhoon, road conditions change fast. So when we say **dynamic routing**, we don't mean waiting on live street sensors. We mean **instant scenario re-optimization** whenever the situation shifts.

Whether the dispatcher switches from a 5-year to a 100-year flood, swaps a light van for a heavy truck, or clicks a washed-out street on the map, RAFT runs a quick 3-step loop:

1. **Prune the map:** Drop any road deeper than the vehicle's limit or manually blocked, and verify which shelters are still reachable both ways.
2. **Re-run DMO-PSO:** Feed those updated safe paths back into the swarm to build a fresh set of trade-off routes.
3. **Update the screen:** Show the new safe routes and scores right away."

---

## PART 2: Slide 10 — Testing & Validation (~3.5 Minutes)

> **[Slide 10 on screen — frame it as 4 clear questions instead of reading a checklist]**

"On Slide 10, under the **Banks (2000)** simulation framework, our testing answers four practical questions:

### 1. First: Did we build the model right? *(Verification & Validation)*
- **Verification** checks our math. Before scaling up, we hand-checked test cases and ran an exact **brute-force solver** on small loops to prove our distance ($F_1$), urgency delay ($F_2$), and road pruning match 100%.
- **Validation** checks our map—making sure OSMnx roads, shelter coordinates, UP NOAH flood layers, and vehicle wading limits match real coastal Cavite.

### 2. Second: Does RAFT actually beat normal routing? *(Experiments & Baselines)*
We test **15 to 30 evacuation centers** across **nine core scenarios**—combining **3 UP NOAH rainfall levels** (5-, 25-, and 100-year) with **3 vehicle classes** (**Class A** `0.30 m`, **Class B** `0.60 m`, **Class C** `1.00 m`), plus manual roadblocks.

We compare DMO-PSO against two Greedy Nearest-Neighbor (**GNN**) baselines:
- **Unconstrained GNN (`U-GNN`)** drives like regular GPS—ignoring floods—so we can measure **Constraint Satisfaction Rate (`CSR`)**: how often standard routing sends a truck into impassable water. Even one flooded street fails the whole route.
- **Flood-Constrained GNN (`C-GNN`)** uses the exact same safe roads as DMO-PSO, giving a fair head-to-head test on **total distance ($F_1$)** and **urgency delay ($F_2$)**—checking whether urgent `Priority 5` shelters actually get supplies sooner.

### 3. Third: Is the swarm reliable, fast, and stress-tested? *(Performance & Sensitivity)*
- **Consistency:** Since PSO uses randomness, we run **multiple seeded trials** per scenario to confirm it converges to the same Pareto quality every time.
- **Speed:** We time **map preparation** separately from **DMO-PSO execution** ($T_{\text{exec}}$) so we know where any bottleneck lives.
- **Worst-Case Check:** Because UP NOAH's Medium flood tier spans `0.5 to 1.5 m`—right across our heavy truck's `1.00 m` limit—we run a sensitivity test comparing our **`1.00 m` baseline** against a **`1.50 m` worst-case**, measuring how many shelters get cut off when Medium corridors become impassable too.

### 4. Fourth: Are the gains statistically real—and does the app hold up?
Across repeated trials, we report mean, median, standard deviation, and range, and check paired differences with the **Wilcoxon signed-rank test**. Alongside that, we run **Pass/Fail software tests** on scenario switching, isolated-shelter warnings, map rendering, and live roadblock rerouting."

---

## PART 3: Live RAFT GUI Walkthrough (~2.5 Minutes)

> **[Switch to RAFT at `http://127.0.0.1:3000/` — keep it visual and click as you talk]**

"Let's see how this looks in practice inside our **RAFT prototype**—*Routing Algorithm for Flood Topographies*.

### 1. Set the Scene *(Left Panel)*
On the left, the dispatcher picks the conditions. Right now we're in a **25-year Severe Flood** (`4% AEP`) using a **Class B 4×4 Rescue Pickup**—safe up to `0.60 m`. Anything deeper is automatically off-limits.

### 2. Why Normal GPS Fails *(Center Map + GPS Toggle)*
Look at the map status bar: **`64 safe roads`**, **`4 blocked`**, and **`21 slowed`** by shallow water.
> **[Toggle ON "Compare with standard GPS"]**
If a driver just followed regular distance-only GPS, look what happens—it drives straight into **4 blocked crossings**. That's **`0% passability`**—the trip fails before it even finishes.

### 3. Three Safe Trade-Offs *(Right Panel)*
> **[Toggle OFF standard GPS, point to the 3 route cards]**
Instead of forcing one rigid answer, RAFT gives the dispatcher **three flood-safe Pareto options**:
1. **Balanced Route** (`48.16 km`, Delay `3.97`) — the middle sweet spot.
2. **Critical-First Route** (`55.18 km`, Delay `3.92`) — a slightly longer detour so high-urgency shelters get relief first.
3. **Shortest Distance** (`47.37 km`, Delay `4.71`) — saves fuel while staying 100% safe.

### 4. Live Roadblock + Simulation *(Click Map + Play)*
> **[Click one road segment on the map to add a roadblock, then click "Simulate truck dispatch"]**
If a caller reports a downed pole or landslide mid-storm, one click blocks that street and RAFT instantly recalculates around it. And when we hit **Simulate**, we can track the relief truck stop-by-stop back to the Kawit depot—and even inspect the Pareto trade-off chart under **Optimization Analytics**.

Thank you—we're ready for your questions!"
