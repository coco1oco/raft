# Flood Shapefiles

These shapefiles contain flood depth data for Cavite, Philippines.

## Data Source

Provincial Government of Cavite - Flood Hazard Maps

## File Format

- **.shp**: Shapefile geometry
- **.shx**: Shape index
- **.dbf**: Attribute database
- **.prj**: Projection information
- **.xml**: Metadata in XML format

## Coordinate System

WGS84 (EPSG:4326)

## Usage

Load using geopandas:
```python
import geopandas as gpd
flood_data = gpd.read_file('Cavite_Flood_100year.shp')
```
