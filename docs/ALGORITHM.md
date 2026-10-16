# Algorithm Specification

## Discrete Multi-Objective PSO (DMO-PSO)

### Overview

The DMO-PSO algorithm solves the multi-objective relief delivery routing problem under flood constraints. It finds Pareto-optimal delivery sequences that balance transit distance against urgency-weighted arrival latency, while respecting vehicle wading depth limits.

### Problem Formulation

**Objective Functions (dual minimization):**

1. **Minimize total tour distance ($f_1$):**
   ```
   f1(π) = d(0, π₁) + Σ_{k=1}^{n-1} d(π_k, π_{k+1}) + d(π_n, 0)
   ```
   Where d(u, v) is the shortest traversable network distance between nodes u and v. The route starts and ends at the depot (node 0).

2. **Minimize urgency-weighted arrival latency ($f_2$):**
   ```
   f2(π) = Σ_{k=1}^{n} U(π_k) × T_{π(k)}
   ```
   Where:
   - U(i) ∈ [1, 5] is the urgency rating of barangay i
   - T_{π(k)} = cumulative travel time from depot to stop k = (cumulative distance to stop k) / speed
   - Minimizing f2 penalizes late arrival to high-urgency communities

**Constraints:**
- **Vehicle wading depth limits:** Edges where flood depth W_e > W_max are pruned (cost = ∞)
  - Class A (Light Commercial Vans): W_max = 0.30 m
  - Class B (Medium 4×4 Support Trucks): W_max = 0.60 m
  - Class C (Heavy Utility Trucks): W_max = 1.00 m
- **Manual dispatcher override:** Edges flagged M_e = 1 are also pruned

**Pareto Dominance (dual minimization):**
Solution A dominates B (A ≺ B) iff:
- f1(A) ≤ f1(B) AND f2(A) ≤ f2(B)
- with at least one strict inequality

### Particle Representation

Each particle is a **permutation vector** π = [π₁, π₂, ..., π_n] of delivery node IDs. The depot (node 0) is implicit as the start and end of every tour.

### Velocity Representation

Velocity is a **sequence of swap operators** (transpositions). Each swap operator (i, j) exchanges the positions of two elements in the permutation.

### Velocity Update

```
v(t+1) = w · v(t) ⊕ c₁ · r₁ · (pBest ⊖ x(t)) ⊕ c₂ · r₂ · (gBest ⊖ x(t))
```

Where:
- `⊖` computes the swap sequence needed to transform one permutation into another
- `⊕` concatenates swap sequences
- `·` probabilistically includes swap operators (scaling by coefficient × random)

### Algorithm Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| swarm_size | 50 | Number of particles |
| inertia_weight (w) | 0.7 | Particle momentum (scales prior velocity) |
| cognitive_coef (c₁) | 1.5 | Personal best influence |
| social_coef (c₂) | 1.5 | Global best influence |
| max_iterations | 100 | Termination condition |
| mutation_rate | 0.1 | Diversity preservation (random swap probability) |
| archive_capacity | 100 | Maximum external archive size |

### Pareto Front Maintenance

Non-dominated solutions are maintained in an external archive with:
- **Crowding distance calculation** for diversity preservation
- **Adaptive archive pruning** when capacity is reached (remove most crowded)
- **Leader selection (gBest):** Selected from the archive (e.g., tournament selection biased by crowding distance)

### Baseline Comparisons

The DMO-PSO is validated against:
1. **Brute-force exhaustive search** (exact ground truth, feasible for toy problem)
2. **GNN-Distance:** Greedy nearest-neighbor minimizing d(curr, next)
3. **GNN-Urgency:** Greedy nearest-neighbor minimizing d(curr, next) / U(next)
