# Flood Shapefiles

100-year return period flood hazard data for Cavite, Philippines.

## Data Source

UP NOAH (Nationwide Operational Assessment of Hazards) — University of the Philippines
Return-period flood models at 1:10,000 scale (Lagmay, 2018).

## File: `Cavite_Flood_100year.shp`

| Component | Description |
|-----------|-------------|
| `.shp` | Shapefile geometry (MULTIPOLYGON) |
| `.shx` | Shape index |
| `.dbf` | Attribute database |
| `.prj` | Projection: WGS84 (EPSG:4326) |
| `.xml` | Metadata |

## Schema

| Column | Type | Values | Meaning |
|--------|------|--------|---------|
| `Var` | float64 | `1.0` | Low Hazard (0.1m – 0.5m depth) |
| | | `2.0` | Medium Hazard (0.5m – 1.5m depth) |
| | | `3.0` | High Hazard (> 1.5m depth) |
| `geometry` | MULTIPOLYGON | — | Flood extent polygons |

## Usage

```python
import geopandas as gpd

flood_data = gpd.read_file('data/flood_shapefiles/Cavite_Flood_100year.shp')
print(flood_data.crs)       # EPSG:4326
print(flood_data.columns)   # ['Var', 'geometry']
print(flood_data['Var'].unique())  # [1.0, 2.0, 3.0]
```
