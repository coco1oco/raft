# Data Sources

## OpenStreetMap (OSM)

Road network data is downloaded directly from OpenStreetMap using OSMnx.

### Data Coverage

- Country: Philippines
- Region: Cavite
- Network Type: Drive (public streets accessible to vehicles)

### Data Fields

- Node IDs
- Latitude/Longitude coordinates
- Street names
- Edge lengths (meters)
- OSM way IDs

## Flood Data

Flood depth data is provided in shapefile format from the Cavite provincial government.

### Data Structure

- Shapefile: Cavite_Flood_100year.shp
- Format: ESRI Shapefile
- Coordinate System: WGS84 (EPSG:4326)

### Data Fields

- Flood depth (meters)
- Area ID
- Zone classification

## Delivery Nodes

Delivery locations are based on barangay locations in Cavite.

### Data Fields

- Node ID
- Name
- Urgency score (1-10)
- Latitude/Longitude
