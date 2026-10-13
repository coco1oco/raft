# Algorithm Specification

## Discrete Multi-Objective PSO (DMO-PSO)

### Overview

The DMO-PSO algorithm is designed to solve the multi-objective vehicle routing problem with time windows and flood constraints.

### Problem Formulation

**Objective Functions:**
1. Minimize total travel distance: `f1(route) = Σ distance(i, i+1)`
2. Maximize urgency score: `f2(route) = Σ urgency[i] / rank[i]`

**Constraints:**
- Vehicle wading depth limits
- Flood depth on road segments
- Delivery time windows (optional)

### Algorithm Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| swarm_size | 50 | Number of particles |
| inertia_weight | 0.7 | Particle momentum |
| cognitive_coef | 1.5 | Personal best influence |
| social_coef | 1.5 | Global best influence |
| max_iterations | 100 | Termination condition |
| mutation_rate | 0.1 | Diversity preservation |

### Velocity Update

Velocity is defined as a sequence of swap operators:
`v_new = w * v_old + c1 * rand1 * (pbest - current) + c2 * rand2 * (gbest - current)`

### Pareto Front Maintenance

Non-dominated solutions are maintained in an external archive with:
- Crowding distance calculation
- Adaptive archive pruning
- Diversity preservation
