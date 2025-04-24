from typing import Any, Dict, List
import urllib3
import json

def generate_osm_fetching_url(query: str) -> str:
    '''
    Generate the URL to fetch data from OSM API
    '''
    return f"https://nominatim.openstreetmap.org/search?q={query}&format=json&addressdetails=1&limit=5"

def find_location_by_street(query: str) -> List[Dict[str, Any]]:
    url = generate_osm_fetching_url(query)

    http = urllib3.PoolManager()

    response = http.request('GET', url)

    if response.status != 200:
        return []
    
    json_data = json.loads(response.data.decode('utf-8'))

    return json_data