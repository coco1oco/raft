"""
Unit tests for Phase 2 Toy Problem, Brute Force Solver, and GNN Baselines.
"""

import pytest
from scripts.phase2_toy_problem import (
    NOMINAL_SPEED_KMH,
    URGENCY,
    Solution,
    brute_force_solve,
    dist,
    dominates,
    evaluate_route,
    find_pareto_front,
    route_arrival_latencies,
    route_distance,
    route_urgency_latency,
    solve_gnn_distance,
    solve_gnn_urgency,
)


def test_dist_symmetry_and_identity() -> None:
    """Distance lookup should be symmetric and 0.0 for identical nodes."""
    for i in range(7):
        assert dist(i, i) == 0.0
        for j in range(7):
            assert dist(i, j) == dist(j, i)
            if i != j:
                assert dist(i, j) > 0.0


def test_optimal_route_distance() -> None:
    """Optimal tour 0->1->6->5->3->2->4->0 should equal 16.90 km."""
    assert route_distance([]) == 0.0
    assert route_distance([1, 6, 5, 3, 2, 4]) == pytest.approx(16.90, abs=1e-4)


def test_route_urgency_latency_calculation() -> None:
    """Verify urgency-weighted cumulative arrival latency f2(pi)."""
    route = [4, 1, 6, 3, 5, 2]
    lat_hr, lat_min = route_urgency_latency(route, speed_kmh=NOMINAL_SPEED_KMH)
    assert lat_hr == pytest.approx(4.8167, abs=1e-4)
    assert lat_min == pytest.approx(289.0, abs=1e-2)

    # Verify stop-by-stop cumulative arrival latencies
    stops = route_arrival_latencies(route, speed_kmh=NOMINAL_SPEED_KMH)
    assert len(stops) == 6
    assert stops[0][0] == 4
    assert stops[0][1] == pytest.approx(1.9, abs=1e-4)


def test_dominates_logic() -> None:
    """Verify dual-minimization Pareto dominance criteria."""
    sol_a = Solution(route=(1, 6, 5, 3, 2, 4), distance=16.90, latency_hr=5.0733, latency_min=304.40)
    sol_b = Solution(route=(4, 1, 6, 2, 3, 5), distance=18.90, latency_hr=5.0733, latency_min=304.40)
    sol_c = Solution(route=(4, 1, 6, 3, 5, 2), distance=18.30, latency_hr=4.8167, latency_min=289.00)

    # sol_a has strictly shorter distance and equal latency vs sol_b -> dominates
    assert dominates(sol_a, sol_b) is True
    assert dominates(sol_b, sol_a) is False

    # sol_a and sol_c trade off f1 vs f2 -> mutually non-dominated
    assert dominates(sol_a, sol_c) is False
    assert dominates(sol_c, sol_a) is False

    # A solution never dominates itself
    assert dominates(sol_a, sol_a) is False


def test_brute_force_and_pareto_front() -> None:
    """Brute force over 6! = 720 permutations should yield the 3 exact Pareto solutions."""
    delivery_nodes = list(URGENCY.keys())
    all_solutions = brute_force_solve(delivery_nodes)
    assert len(all_solutions) == 720

    pareto = find_pareto_front(all_solutions)
    assert len(pareto) == 3

    expected_routes = [
        (1, 6, 5, 3, 2, 4),  # f1=16.90, f2=5.0733
        (1, 6, 3, 5, 2, 4),  # f1=17.60, f2=4.8933
        (4, 1, 6, 3, 5, 2),  # f1=18.30, f2=4.8167
    ]
    assert [s.route for s in pareto] == expected_routes
    assert pareto[0].distance == pytest.approx(16.90, abs=1e-4)
    assert pareto[-1].latency_hr == pytest.approx(4.8167, abs=1e-4)


def test_gnn_baselines_are_dominated() -> None:
    """Both GNN-Distance and GNN-Urgency baselines are strictly dominated by all 3 Pareto solutions."""
    delivery_nodes = list(URGENCY.keys())
    pareto = find_pareto_front(brute_force_solve(delivery_nodes))

    gnn_dist = solve_gnn_distance(delivery_nodes)
    gnn_urg = solve_gnn_urgency(delivery_nodes)

    assert gnn_dist.distance == pytest.approx(18.90, abs=1e-4)
    assert gnn_dist.latency_hr == pytest.approx(5.0733, abs=1e-4)
    assert gnn_urg.distance == pytest.approx(20.10, abs=1e-4)
    assert gnn_urg.latency_hr == pytest.approx(5.3600, abs=1e-4)

    for p in pareto:
        assert dominates(p, gnn_dist) is True
        assert dominates(p, gnn_urg) is True
