# Installation Guide

## System Requirements

- Python 3.8+
- pip package manager
- 4GB RAM minimum (8GB recommended)
- 500MB free disk space

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd raft
```

### 2. Create Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Verify Installation

```bash
python -c "import osmnx; print('OSMnx installed successfully')"
```

## Troubleshooting

### Common Issues

1. **OSMnx installation fails**
   - Ensure Python 3.8+ is installed
   - Try installing pyproj separately: `pip install pyproj`

2. **Matplotlib backend errors**
   - Set backend explicitly: `matplotlib.use('Agg')`

3. **Geopandas import errors**
   - Ensure GDAL is installed on your system
