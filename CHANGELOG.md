# Changelog

## [Unreleased]

### Project Cleanup (2026-10-13)

- **Directory Restructure**: Organized project into professional structure with clear separation of concerns
- **Added Directories**: src/, tests/, docs/, scripts/, data/, results/
- **File Organization**: Moved phase scripts to scripts/ folder
- **Data Organization**: Moved flood shapefiles to data/flood_shapefiles/
- **Documentation**: Added comprehensive documentation in docs/
- **README**: Created professional README.md with installation and usage instructions
- **Requirements**: Added requirements.txt with Python dependencies
- **License**: Added MIT LICENSE file
- **Contributing**: Added CONTRIBUTING.md guide
- **Git Ignore**: Updated .gitignore with proper Python patterns
- **Tests**: Added tests/ directory structure for unit tests
- **Source Code**: Organized src/ with algorithms/, routing/, data/ subdirectories

## Phase Scripts

### Phase 1: OSMnx Network Extraction
- Downloads road network for Cavite, Philippines
- Visualizes and saves graph to results/

### Phase 2: Toy Problem Solver
- Implements brute-force solver for small delivery problem
- Validates PSO algorithm implementation
- Computes Pareto front for multi-objective optimization
