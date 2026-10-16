# Data Sources

## OpenStreetMap (OSM)

Road network data is downloaded directly from OpenStreetMap using the OSMnx library (Boeing, 2025).

### Data Coverage

- Country: Philippines
- Target Area: Coastal municipalities of Cavite (Bacoor, Cavite City, Kawit, Noveleta, Rosario)
- Network Type: `drive` (public streets accessible to motor vehicles)

### Data Fields

- Node IDs (OSM node identifiers)
- Latitude/Longitude coordinates (WGS84)
- Street names
- Edge lengths (meters)
- OSM way IDs
- Highway classification tags

### Usage

```python
import osmnx as ox

# Download drivable street network
G = ox.graph_from_place("Kawit, Cavite, Philippines", network_type='drive')
nodes, edges = ox.graph_to_gdfs(G)
```

---

## Flood Hazard Data

Flood depth data is provided in ESRI Shapefile format from UP NOAH (Nationwide Operational Assessment of Hazards) return-period flood models (Lagmay, 2018).

### Data Structure

- Shapefile: `Cavite_Flood_100year.shp` (100-year return period)
- Format: ESRI Shapefile (MULTIPOLYGON)
- Coordinate System: WGS84 (EPSG:4326)
- Bounding Box: [120.563°E, 14.057°N] to [121.077°E, 14.500°N]

### Data Fields

| Column | Type | Values | Description |
|--------|------|--------|-------------|
| `Var` | float64 | `1.0` | Low Hazard: inundation depth 0.1m – 0.5m |
| | | `2.0` | Medium Hazard: inundation depth 0.5m – 1.5m |
| | | `3.0` | High Hazard: inundation depth > 1.5m |
| `geometry` | MULTIPOLYGON | — | Flood extent polygons |

**Note:** The shapefile uses discrete hazard severity tiers, not continuous depth measurements. Vehicle wading depth constraints ($W_{max}$) are compared against representative depths for each tier.

### Usage

```python
import geopandas as gpd

flood_data = gpd.read_file('data/flood_shapefiles/Cavite_Flood_100year.shp')
# flood_data.crs == 'EPSG:4326'
# flood_data['Var'] contains hazard tier (1.0, 2.0, 3.0)
```

---

## Delivery Nodes

Delivery locations represent barangays in the target coastal municipalities of Cavite.

### Data Fields

- Node ID (integer, 0 = depot)
- Barangay name
- Urgency rating: U(i) ∈ [1, 5]
  - 1 = Low (routine relief packs)
  - 2 = Moderate (potable water replenishment)
  - 3 = Significant (shelter & dry food kits)
  - 4 = High (vulnerable elderly/infant population)
  - 5 = Critical (flooded, stranded families, emergency medical supplies)
- Latitude/Longitude (for GIS integration)

---

## Vehicle Classification

Relief vehicles are categorized by wading depth tolerance:

| Class | Vehicle Type | Wading Depth Limit ($W_{max}$) |
|-------|-------------|-------------------------------|
| Class A | Light Commercial Vans | 0.30 m (300 mm) |
| Class B | Medium 4×4 Support Trucks | 0.60 m (600 mm) |
| Class C | Heavy Utility Trucks | 1.00 m (1000 mm) |
