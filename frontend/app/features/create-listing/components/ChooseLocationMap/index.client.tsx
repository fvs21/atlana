import "leaflet/dist/leaflet.css";
import L from "leaflet"
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import ValidatedInput from "~/components/validated-input";
import { useQueryLocation } from "../../api";
import { LocationQueryResult } from "../../types";
import { Slider } from "~/components/ui/slider";
import { Location } from "~/types/location";

export default function ChooseLocationMap({ location, setLocation }: { location: Location, setLocation: (location: Location) => void }) {
    const mapRef = useRef<L.Map>();
    const markerRef = useRef<L.Marker>();
    const circleRef = useRef<L.Circle>();

    const { queryLocation } = useQueryLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [queryResults, setQueryResults] = useState<LocationQueryResult[]>([]);
    const [resultsFocused, setResultsFocused] = useState(false);


    useEffect(() => {
        let map = L.map('map').setView(
            [location.latitude || 21.110303, location.longitude || -89.611401], 14
        );

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            tileSize: 256
        }).addTo(map);

        mapRef.current = map;
        map.on('click', mapClick);

        if(location.latitude && location.longitude) {
            markerRef.current = L.marker([location.latitude, location.longitude]).addTo(map);
            circleRef.current = L.circle([location.latitude, location.longitude], {
                color: '#3b82f6',
                fillColor: '#00246b',
                stroke: false,
                fillOpacity: 0.3,
                radius: 100
            }).addTo(mapRef.current as L.Map); 
        }

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

        const { lat, lon } = location;
        
        changeLocation(lat, lon);

        mapRef.current.setView([lat, lon], 14);
    }

    const mapClick = (e: L.LeafletMouseEvent) => {
        if(!mapRef.current) return;

        changeLocation(e.latlng.lat, e.latlng.lng);
    }

    const changeLocation = (lat: number, lon: number) => {
        if(!markerRef.current) {
            markerRef.current = L.marker([lat, lon]).addTo(mapRef.current as L.Map);
        } else {
            markerRef.current.setLatLng([lat, lon]);
        } 

        if(!circleRef.current) {
            circleRef.current = L.circle([lat, lon], {
                color: '#3b82f6',
                fillColor: '#00246b',
                stroke: false,
                fillOpacity: 0.3,
                radius: 100
            }).addTo(mapRef.current as L.Map);

            setLocation({
                latitude: Number(lat.toFixed(6)),
                longitude: Number(lon.toFixed(6)),
                radius: 100
            })
        } else {
            circleRef.current.setLatLng([lat, lon]);
            setLocation({
                ...location,
                latitude: Number(lat.toFixed(6)),
                longitude: Number(lon.toFixed(6))
            })
        }
    }

    const changeRadius = (value: number) => {
        if(!circleRef.current || !mapRef.current) return;

        circleRef.current.setRadius(value);
        setLocation({
            ...location,
            radius: value
        });
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
            <div className={styles.mapContainer}>
                <div id="map" className={styles.selectLocationMap} />
                {!!(location.latitude && location.longitude) && (
                    <div className={styles.radiusSlider}>
                        <span>Radio:</span>
                        <Slider 
                            defaultValue={[100]}
                            min={100}
                            max={2000}
                            step={1}
                            onValueChange={(value) => changeRadius(value[0])}
                        />
                    </div>
                )}
            </div>
            <div className="text-xs text-gray-500 mt-2">
                Recomendación: Elige una ubicación aproximada de la propiedad.
            </div>
        </div>
    )
}