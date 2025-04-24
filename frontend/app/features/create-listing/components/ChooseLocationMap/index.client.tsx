import "leaflet/dist/leaflet.css";
import L from "leaflet"
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import ValidatedInput from "~/components/validated-input";
import { useQueryLocation } from "../../api";
import { LocationQueryResult } from "../../types";

export default function ChooseLocationMap() {
    const mapRef = useRef<L.Map>();
    const markerRef = useRef<L.Marker>();

    const { queryLocation, isPending } = useQueryLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [queryResults, setQueryResults] = useState<LocationQueryResult[]>([]);
    const [resultsFocused, setResultsFocused] = useState(false);

    useEffect(() => {
        let map = L.map('map').setView(
            [21.110303, -89.611401], 14
        );

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            tileSize: 256
        }).addTo(map);

        mapRef.current = map;

        return () => {
            map.remove();
        }
    }, []);

    const searchLocation = async (query: string) => {
        if(!query) return;

        const data = await queryLocation(query);

        if(!data.data?.locations) return;

        setQueryResults(data.data.locations);
    }

    const selectLocation = (location: LocationQueryResult) => {        
        if(!mapRef.current) return;
        console.log(location);
        

        const { lat, lon } = location;
        

        if(markerRef.current) {
            markerRef.current.setLatLng([lat, lon]);
        } else {
            markerRef.current = L.marker([lat, lon]).addTo(mapRef.current);
        }

        mapRef.current.setView([lat, lon], 14);
    }

    useEffect(() => {
        let timeout = setTimeout(() => {
            searchLocation(searchQuery);
        }, 500);
        
        return () => clearTimeout(timeout);
    }, [searchQuery]);
    
    return (
        <div className="pt-4">
            <div className="pb-4 relative">
                <ValidatedInput 
                    label="Buscar dirección"
                    placeholder="Dirección"
                    type="text"
                    name="address"
                    id="address"
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onFocus={() => setResultsFocused(true)}
                    onBlur={() => setResultsFocused(false)}
                />
                {!!(queryResults.length && resultsFocused) && (
                    <div className={styles.locationQueryResults}>
                        {queryResults.map((location) => (
                            <button className={styles.locationQueryResult} key={location.place_id} onMouseDown={() => selectLocation(location)}>
                                {location.display_name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div id="map" className={styles.selectLocationMap} />
        </div>
    )
}