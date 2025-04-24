import "leaflet/dist/leaflet.css";
import L from "leaflet"
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import ValidatedInput from "~/components/validated-input";

export default function ChooseLocationMap() {
    const [searchQuery, setSearchQuery] = useState("");

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
        <div className="pt-4">
            <div className="pb-4">
                <ValidatedInput 
                    label="Buscar dirección"
                    placeholder="Dirección"
                    type="text"
                    name="address"
                    id="address"
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
            </div>
            <div id="map" className={styles.selectLocationMap} />
        </div>
    )
}