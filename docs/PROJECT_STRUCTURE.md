# Project Structure

```
raft/
├── .git/                    # Git repository
├── .gitignore              # Git ignore rules
├── README.md               # Project overview
├── requirements.txt        # Python dependencies
├── src/                    # Source code
│   ├── __init__.py
│   ├── algorithms/         # Optimization algorithms
│   │   ├── __init__.py
│   │   ├── pso.py         # Single-objective DPSO implementation
│   │   ├── dmo_pso.py     # Multi-objective DPSO implementation
│   │   └── pareto.py      # Pareto front & archive operations
│   ├── routing/           # Routing logic
│   │   ├── __init__.py
│   │   ├── graph.py       # Graph & objective evaluation operations
│   │   └── flood.py       # Flood constraint & wading depth handling
│   └── data/              # Data loading utilities
│       ├── __init__.py
│       └── loader.py      # Data file loaders
├── tests/                 # Unit and integration tests
│   ├── __init__.py
│   ├── test_toy_problem.py
│   ├── test_pso.py
│   ├── test_routing.py
│   └── test_flood.py
├── docs/                  # Documentation
│   ├── PROJECT_STRUCTURE.md  # This file
│   ├── INSTALLATION.md
│   ├── ALGORITHM.md
│   └── DATA_SOURCES.md
├── scripts/               # Standalone phase scripts
│   ├── phase1_osmnx.py    # Network extraction
│   └── phase2_toy_problem.py  # Brute force validation
├── data/                  # Input data
│   ├── flood_shapefiles/  # Shapefile data
│   └── cache/             # Cached OSM data
└── results/               # Output files
    └── *.png              # Visualizations
```

## Directory Descriptions

### src/
Contains all source code organized by functionality.

### tests/
Unit tests using pytest. Run with `pytest tests/ -v`.

### docs/
Project documentation including installation guides and algorithm specs.

### scripts/
Standalone Python scripts for each development phase.

### data/
Raw input data including flood maps and node locations.

### results/
Generated output including visualizations and reports.
