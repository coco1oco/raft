"""
Phase 2: Toy Problem & Brute Force Solver
==========================================
Defines a small, self-contained delivery problem with:
  - 1 depot (node 0) + 6 delivery nodes (nodes 1-6)
  - Symmetric distance matrix (km)
  - Urgency score per delivery node (1 = low, 10 = critical)

The brute-force solver enumerates ALL permutations of delivery nodes
to find ground-truth optimal routes for two objectives:
  1. Minimize total travel distance
  2. Maximize total urgency (serve highest-urgency nodes first via route order)

These results will be used to VALIDATE the PSO algorithms in Phases 3 & 4.
"""

import itertools
import math
from typing import NamedTuple


# ---------------------------------------------------------------------------
# 1. PROBLEM DEFINITION
# ---------------------------------------------------------------------------

# Node labels (0 = depot / distribution hub)
NODE_LABELS = {
    0: "Depot (Hub)",
    1: "Barangay Salinas",
    2: "Barangay Julugan",
    3: "Barangay San Agustin",
    4: "Barangay Toclong",
    5: "Barangay Magdalo",
    6: "Barangay Recodo",
}

# Urgency scores per delivery node (depot has no urgency)
# Scale: 1 (routine) to 10 (life-threatening)
URGENCY = {
    1: 9,   # Salinas   - flooded, critical medical supplies
    2: 3,   # Julugan   - food packs, low urgency
    3: 7,   # San Agustin - elderly population, high urgency
    4: 5,   # Toclong   - moderate damage
    5: 10,  # Magdalo   - stranded families, maximum urgency
    6: 4,   # Recodo    - water supply, moderate urgency
}

# Symmetric distance matrix in km (0 = depot)
# DIST[i][j] == DIST[j][i]
DIST = {
    (0, 1): 2.1, (0, 2): 3.4, (0, 3): 4.8, (0, 4): 1.9, (0, 5): 6.2, (0, 6): 3.7,
    (1, 2): 2.8, (1, 3): 3.5, (1, 4): 2.5, (1, 5): 4.4, (1, 6): 1.8,
    (2, 3): 1.9, (2, 4): 3.1, (2, 5): 3.8, (2, 6): 2.0,
    (3, 4): 4.0, (3, 5): 2.6, (3, 6): 2.3,
    (4, 5): 5.1, (4, 6): 2.9,
    (5, 6): 3.5,
}


def dist(i: int, j: int) -> float:
    """Return distance between nodes i and j (symmetric)."""
    if i == j:
        return 0.0
    key = (min(i, j), max(i, j))
    return DIST[key]


def route_distance(route: list) -> float:
    """
    Compute total distance of a route.
    Route is a sequence of delivery nodes; depot (0) is implicit start & end.
    Full path: 0 -> route[0] -> route[1] -> ... -> route[-1] -> 0
    """
    if not route:
        return 0.0
    total = dist(0, route[0])
    for i in range(len(route) - 1):
        total += dist(route[i], route[i + 1])
    total += dist(route[-1], 0)
    return round(total, 4)


def route_urgency_score(route: list) -> float:
    """
    Compute a position-weighted urgency score.
    Nodes visited earlier in the route contribute MORE urgency value
    (earlier delivery = faster relief). Weight = 1 / position_index.

    This converts the ordering into a scalar so brute force can rank routes.
    A higher score = better urgency performance.

    Formula: sum( urgency[node] / (rank+1) ) for rank 0,1,2,...
    """
    return round(sum(URGENCY[node] / (rank + 1) for rank, node in enumerate(route)), 4)


def total_urgency(route: list) -> int:
    """Sum of urgency values of all nodes in the route (order-independent)."""
    return sum(URGENCY[node] for node in route)


# ---------------------------------------------------------------------------
# 2. BRUTE-FORCE SOLVER
# ---------------------------------------------------------------------------

class Solution(NamedTuple):
    route: tuple          # sequence of delivery node IDs
    distance: float       # total round-trip distance (km)
    urgency_score: float  # position-weighted urgency (higher is better)
    total_urgency: int    # raw sum of urgency values (for reference)


def brute_force_solve(delivery_nodes: list) -> list:
    """
    Enumerate all permutations of delivery_nodes and return all Solutions,
    sorted by ascending distance.
    """
    solutions = []
    for perm in itertools.permutations(delivery_nodes):
        perm = list(perm)
        d = route_distance(perm)
        u = route_urgency_score(perm)
        tu = total_urgency(perm)
        solutions.append(Solution(route=tuple(perm), distance=d, urgency_score=u, total_urgency=tu))
    return solutions


def find_pareto_front(solutions: list) -> list:
    """
    Return non-dominated solutions for the two objectives:
      - Minimize distance (lower is better)
      - Maximize urgency_score (higher is better)

    A solution A dominates B if:
      A.distance <= B.distance AND A.urgency_score >= B.urgency_score
      with at least one strict inequality.
    """
    pareto = []
    for candidate in solutions:
        dominated = False
        for other in solutions:
            if other is candidate:
                continue
            if (other.distance <= candidate.distance and
                    other.urgency_score >= candidate.urgency_score and
                    (other.distance < candidate.distance or
                     other.urgency_score > candidate.urgency_score)):
                dominated = True
                break
        if not dominated:
            pareto.append(candidate)
    # Sort Pareto front by ascending distance (= descending urgency_score)
    pareto.sort(key=lambda s: s.distance)
    return pareto


# ---------------------------------------------------------------------------
# 3. MAIN - RUN & PRINT RESULTS
# ---------------------------------------------------------------------------

def print_route(label: str, sol: Solution):
    node_names = " -> ".join(NODE_LABELS[n] for n in sol.route)
    full_path = f"Depot -> {node_names} -> Depot"
    print(f"\n  {label}")
    print(f"    Route   : {full_path}")
    print(f"    Order   : 0 -> {' -> '.join(str(n) for n in sol.route)} -> 0")
    print(f"    Distance: {sol.distance} km")
    print(f"    Urgency Score (weighted): {sol.urgency_score}")
    print(f"    Total Urgency (raw):      {sol.total_urgency}")


def main():
    delivery_nodes = list(URGENCY.keys())  # [1, 2, 3, 4, 5, 6]
    n_perms = math.factorial(len(delivery_nodes))

    print("=" * 65)
    print("  PHASE 2 - TOY PROBLEM & BRUTE FORCE SOLVER")
    print("=" * 65)

    # --- Print problem definition ---
    print("\nDELIVERY NODES:")
    for nid, name in NODE_LABELS.items():
        if nid == 0:
            print(f"  Node {nid}: {name}")
        else:
            print(f"  Node {nid}: {name:<25} | Urgency: {URGENCY[nid]}/10")

    print("\nDISTANCE MATRIX (km):")
    nodes = list(NODE_LABELS.keys())
    header = "     " + "".join(f"  N{n}" for n in nodes)
    print(header)
    for i in nodes:
        row = f"  N{i} "
        for j in nodes:
            row += f"{dist(i, j):5.1f}"
        print(row)

    # --- Brute force ---
    print(f"\nEnumerating {n_perms:,} permutations...")
    all_solutions = brute_force_solve(delivery_nodes)
    print(f"Done. {len(all_solutions):,} solutions evaluated.")

    # --- Objective 1: Minimum distance ---
    best_dist = min(all_solutions, key=lambda s: s.distance)
    print("\n" + "-" * 65)
    print("  OBJECTIVE 1: Minimize Total Distance")
    print("-" * 65)
    print_route("BEST (shortest route):", best_dist)

    worst_dist = max(all_solutions, key=lambda s: s.distance)
    print_route("WORST (longest route, for reference):", worst_dist)

    # --- Objective 2: Maximum urgency score ---
    best_urgency = max(all_solutions, key=lambda s: s.urgency_score)
    print("\n" + "-" * 65)
    print("  OBJECTIVE 2: Maximize Position-Weighted Urgency Score")
    print("-" * 65)
    print_route("BEST (highest urgency score):", best_urgency)

    # --- Pareto front ---
    pareto = find_pareto_front(all_solutions)
    print("\n" + "-" * 65)
    print(f"  PARETO FRONT ({len(pareto)} non-dominated solutions)")
    print("-" * 65)
    print("  (These are the ground-truth targets for Phases 3 & 4)\n")
    print(f"  {'#':<3} {'Route':<35} {'Distance':>10} {'Urgency Score':>14}")
    print(f"  {'-'*3} {'-'*35} {'-'*10} {'-'*14}")
    for i, sol in enumerate(pareto):
        route_str = "0->" + "->".join(str(n) for n in sol.route) + "->0"
        print(f"  {i+1:<3} {route_str:<35} {sol.distance:>10.4f} {sol.urgency_score:>14.4f}")

    print("\n" + "=" * 65)
    print("  Phase 2 complete. Ground truth established.")
    print("  PSO in Phase 3 must reproduce the min-distance route.")
    print("  PSO in Phase 4 must reproduce (or approximate) the Pareto front.")
    print("=" * 65)


if __name__ == "__main__":
    main()
