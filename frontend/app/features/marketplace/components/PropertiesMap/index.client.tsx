import "leaflet/dist/leaflet.css";
import L from "leaflet"
import { useEffect, useRef, useState } from "react";

export default function PropertiesMap() {
    const mapRef = useRef<L.Map>();

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

    return (
        <div id="map" className="w-full h-full z-10">

        </div>
    )
}
