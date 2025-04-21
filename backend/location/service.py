def generate_osm_fetching_url(query: str) -> str:
    '''
    Generate the URL to fetch data from OSM API
    '''
    return f"https://nominatim.openstreetmap.org/search?q={query}&format=json&addressdetails=1&limit=5"

