"""
Phase 1: OSMnx Road Network Extraction & Visualization
=======================================================
Download and visualize the drivable road network for the target
coastal municipalities of Cavite, Philippines:
  - City of Bacoor
  - Cavite City
  - Kawit
  - Noveleta
  - Rosario
"""

import argparse
import os
from typing import List, Union
import osmnx as ox
import matplotlib.pyplot as plt

COASTAL_CAVITE_PLACES: List[str] = [
    "Bacoor, Cavite, Philippines",
    "Cavite City, Cavite, Philippines",
    "Kawit, Cavite, Philippines",
    "Noveleta, Cavite, Philippines",
    "Rosario, Cavite, Philippines",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Download and plot the OSM drivable road network for Cavite study areas."
    )
    parser.add_argument(
        "--place",
        type=str,
        default=None,
        help="Single place query (e.g., 'Kawit, Cavite, Philippines'). Defaults to the 5 coastal municipalities.",
    )
    parser.add_argument(
        "--full-province",
        action="store_true",
        help="Download the entire province ('Cavite, Philippines') instead of only the 5 coastal municipalities.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if args.full_province:
        query: Union[str, List[str]] = "Cavite, Philippines"
        slug = "Cavite_Province"
    elif args.place:
        query = args.place
        slug = args.place.replace(", ", "_").replace(" ", "_")
    else:
        query = COASTAL_CAVITE_PLACES
        slug = "Cavite_Coastal_Municipalities"

    output_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "results")
    os.makedirs(output_dir, exist_ok=True)

    print(f"Downloading drivable road network for: {query}")
    G = ox.graph_from_place(query, network_type="drive")

    print("Graph downloaded successfully!")
    print(f"Number of nodes: {len(G.nodes):,}")
    print(f"Number of edges: {len(G.edges):,}")

    fig, _ = ox.plot_graph(
        G,
        show=False,
        close=False,
        edge_color="#999999",
        node_color="red",
        node_size=10,
        bgcolor="black",
    )

    output_filename = os.path.join(output_dir, f"{slug}_road_network.png")
    fig.savefig(output_filename, dpi=300, bbox_inches="tight", facecolor="black")
    plt.close(fig)

    print(f"Graph visualization saved to {output_filename}")


if __name__ == "__main__":
    main()

