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

Flood depth data is provided in ESRI Shapefile format from UP NOAH (Nationwide Operational Assessment of Hazards) return-period flood models (Lagmay et al., 2017; Cadiz, 2018).

### Data Structure

- Shapefiles: 5-year, 25-year, and 100-year return period shapefiles (e.g., `Cavite_Flood_100year.shp`)
- Format: ESRI Shapefile (MULTIPOLYGON)
- Coordinate System: WGS84 (EPSG:4326)
- Bounding Box: [120.563°E, 14.057°N] to [121.077°E, 14.500°N]

### Data Fields & Tier Depth Parameterization

| Column | Type | Values | Description | Assigned Model Depth ($W_e$) | Passability |
|--------|------|--------|-------------|-----------------------------|-------------|
| `Var` | float64 | `1.0` | Low Hazard: inundation depth 0.1m – 0.5m | $W_e = 0.50\text{ m}$ (conservative upper bound) | Blocks Class A; passes Class B & C |
| | | `2.0` | Medium Hazard: inundation depth 0.5m – 1.5m | $W_e = 1.00\text{ m}$ (midpoint; sensitivity at 1.50m) | Blocks Class A & B; passes Class C |
| | | `3.0` | High Hazard: inundation depth > 1.5m | $W_e = 1.50\text{ m}$ (hazard threshold) | Impassable to all land vehicle classes |
| `geometry` | MULTIPOLYGON | — | Flood extent polygons | — | — |

**Note:** Road segments carrying OpenStreetMap attribute `bridge=yes` are exempted from ground-level flood polygon intersection ($W_e = 0.00\text{ m}$).

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

Due to operational variability across municipal fleets, relief vehicles are modeled using generalized representative commercial vehicle archetypes anchored in peer-reviewed hydrostatic flood-trafficability criteria (Kramer et al., 2016; Martínez-Gomariz et al., 2018) and commercial manufacturer wading-depth specifications:

| Class | Archetype / Representative Commercial Models | Operational Wading Limit ($W_{max}$) | Manufacturer Range & Source Justification |
|-------|----------------------------------------------|--------------------------------------|-------------------------------------------|
| Class A | Light Commercial Utility Vans (e.g., Mitsubishi L300, Toyota HiAce, standard multicabs) | 0.30 m (300 mm) | 200–300 mm; standard curb clearance and air-intake ceiling; impassable in low-tier standing floods. |
| Class B | Medium 4×4 Support & Rescue Pickups (e.g., Isuzu D-Max, Toyota Hilux 4×4) | 0.60 m (600 mm) | 600–700 mm; hydrostatic 4WD safety ceiling and typical factory wading depth rating for mid-size 4WD utility vehicles. |
| Class C | Heavy Cargo & High-Clearance Utility Trucks (e.g., Isuzu Forward, 6-wheeler cargo haulers, military-spec 2.5-ton trucks) | 1.00 m (1000 mm) | 1000–1200 mm; high-clearance heavy/military chassis capable of traversing Medium Hazard (`Var = 2`) flood corridors. |

