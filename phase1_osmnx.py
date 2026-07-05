import osmnx as ox
import matplotlib.pyplot as plt

def main():
    place_name = "Dasmarinas, Cavite, Philippines"
    print(f"Downloading road network for: {place_name}")
    
    # Download the street network for the place
    # network_type 'drive' gets drivable public streets (useful for delivery vehicles)
    G = ox.graph_from_place(place_name, network_type='drive')
    
    # Print some basic stats
    print(f"Graph downloaded successfully!")
    print(f"Number of nodes: {len(G.nodes)}")
    print(f"Number of edges: {len(G.edges)}")
    
    # Plot and save the graph
    fig, ax = ox.plot_graph(G, show=False, close=False, edge_color='#999999', node_color='red', node_size=10)
    
    output_filename = f'{place_name}.png'
    fig.savefig(output_filename, dpi=300, bbox_inches='tight', facecolor='black')
    print(f"Graph visualization saved to {output_filename}")

if __name__ == "__main__":
    main()
