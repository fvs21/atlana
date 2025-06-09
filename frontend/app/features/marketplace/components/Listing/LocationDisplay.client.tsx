import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

export default function LocationDisplay({ location }: { location: { latitude: number; longitude: number; radius: number } }) {
    const mapRef = useRef<L.Map>();
    const circleRef = useRef<L.Circle>();

    useEffect(() => {
        let map = L.map('map').setView(
            [location.latitude || 21.110303, location.longitude || -89.611401], 14
        ).setZoom(15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            tileSize: 256
        }).addTo(map);

        mapRef.current = map;

        circleRef.current = L.circle([location.latitude, location.longitude], {
            color: '#3b82f6',
            fillColor: '#00246b',
            stroke: false,
            fillOpacity: 0.3,
            radius: location.radius
        }).addTo(mapRef.current as L.Map);

        return () => {
            map.remove();
        }
    }, []);

    return (
        <div id="map" className="w-full h-full z-40" style={{ borderRadius: 6}}/>
    )
}