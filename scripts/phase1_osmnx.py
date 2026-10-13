"""
Phase 1: OSMnx Road Network Extraction & Visualization
=======================================================
Download and visualize the road network for Cavite, Philippines.
"""

import os
import sys
import osmnx as ox
import matplotlib.pyplot as plt


def main():
    place_name = "Cavite, Philippines"
    output_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "results")
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Downloading road network for: {place_name}")
    
    # Download the street network for the place
    # network_type 'drive' gets drivable public streets (useful for delivery vehicles)
    G = ox.graph_from_place(place_name, network_type='drive')
    
    # Print some basic stats
    print(f"Graph downloaded successfully!")
    print(f"Number of nodes: {len(G.nodes)}")
    print(f"Number of edges: {len(G.edges)}")
    
    # Plot and save the graph
    fig, ax = ox.plot_graph(
        G, 
        show=False, 
        close=False, 
        edge_color='#999999', 
        node_color='red', 
        node_size=10,
        bgcolor='black'
    )
    
    output_filename = os.path.join(output_dir, f'{place_name.replace(", ", "_")}_road_network.png')
    fig.savefig(output_filename, dpi=300, bbox_inches='tight', facecolor='black')
    plt.close(fig)
    
    print(f"Graph visualization saved to {output_filename}")


if __name__ == "__main__":
    main()
