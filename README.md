# Flood-Aware Disaster Relief Routing

A dynamic routing system for disaster relief distribution in Cavite, Philippines, using a Discrete Multi-Objective Particle Swarm Optimization (DMO-PSO) algorithm with flood constraints.

## Overview

This project implements a multi-objective optimization algorithm to determine optimal delivery routes for disaster relief, considering:
- **Distance minimization** - Reduce travel time and fuel consumption
- **Urgency maximization** - Prioritize critical deliveries based on need
- **Flood constraints** - Account for road flooding and vehicle wading depth limits

## Project Structure

```
raft/
├── src/                  # Source code
│   ├── algorithms/       # Optimization algorithms (PSO, Pareto)
│   ├── routing/          # Routing logic and graph operations
│   └── data/             # Data loading utilities
├── tests/                # Unit and integration tests
├── docs/                 # Documentation
├── scripts/              # Standalone phase scripts
├── data/                 # Input data (shapefiles, etc.)
├── results/              # Output visualizations and reports
├── requirements.txt      # Python dependencies
├── LICENSE               # MIT License
├── CONTRIBUTING.md       # Contribution guidelines
└── README.md             # This file
```

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd raft

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## Usage

### Phase Scripts

Each phase is implemented as a standalone script in `scripts/`:

```bash
# Phase 1: Download and visualize OSM road network
python scripts/phase1_osmnx.py

# Phase 2: Toy problem with brute-force solver
python scripts/phase2_toy_problem.py

# Phase 3: Single-objective PSO (to be implemented)
python scripts/phase3_pso_single.py

# Phase 4: Multi-objective PSO (to be implemented)
python scripts/phase4_pso_multi.py
```

### Running Tests

```bash
pytest tests/ -v
```

## Algorithms

### Discrete Multi-Objective PSO

The implementation uses a particle swarm optimization algorithm with:
- **Permutation-based encoding** for route representation
- **Velocity operators** based on swap operations
- **Pareto dominance** for multi-objective comparison
- **External archive** for maintaining non-dominated solutions

## Data Sources

- **Road Network**: OpenStreetMap (via OSMnx)
- **Flood Data**: Cavite Flood Maps (shapefile format)
- **Delivery Nodes**: Based on barangay locations in Cavite

## Development

### Adding New Features

1. Create a new branch: `git checkout -b feature/your-feature`
2. Implement your feature following the project structure
3. Add tests for new functionality
4. Run tests: `pytest tests/ -v`
5. Submit a pull request

### Code Style

- Follow PEP 8 style guidelines
- Use type hints for all functions
- Write docstrings for all public functions
- Add tests for new functionality

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Built as part of a discrete optimization research project.

## Acknowledgments

- OSMnx for road network data extraction
- OpenStreetMap contributors for map data
- Cavite Provincial Government for flood hazard maps
