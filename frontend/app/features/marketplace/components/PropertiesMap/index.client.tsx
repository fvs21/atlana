import "leaflet/dist/leaflet.css";
import L from "leaflet"
import { useCallback, useEffect, useRef, useState } from "react";
import { PropertyMapBounds } from "../../types";
import { PropertyListingCard } from "~/types/listings";
import styles from "./styles.module.scss";

const mapPopupOptions = {
    closeButton: false,
    closeOnClick: false,
    closeOnEscapeKey: false,
    className: "property-map-popup",
}

type PropertiesMapProps = {
    setBounds: (bounds: PropertyMapBounds) => void;
    listings: PropertyListingCard[];
    isLoading?: boolean;
}

export default function PropertiesMap({ setBounds, listings, isLoading }: PropertiesMapProps) {
    const mapRef = useRef<L.Map>();
    const timeout = useRef<NodeJS.Timeout | null>(null); 
    const popupsRef = useRef<Map<number, L.Popup>>(new Map());

    const [boundsLoading, setBoundsLoading] = useState(false);

    const updateMapListings = useCallback((listings: PropertyListingCard[]) => {
        if (!mapRef.current) return;

        const currentIds = new Set(listings.map((listing) => listing.id));

        popupsRef.current.forEach((popup, id) => {
            if (!currentIds.has(id)) {
                mapRef.current?.removeLayer(popup);
                popupsRef.current.delete(id);
            }
        });

        listings.forEach((listing) => {
            if (popupsRef.current.has(listing.id))
                return;

            const price = Intl.NumberFormat("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(listing.price)

            const popup = L.popup(mapPopupOptions)
                .setLatLng([listing.property.location.latitude, listing.property.location.longitude])
                .setContent(`
                    <a href="/listing/${listing.id}" target="_blank" class="${styles.popupButton}">
                        $${price}
                    </a>    
                `)
                .addTo(mapRef.current!);

            popupsRef.current.set(listing.id, popup);
        });
    }, []);

    useEffect(() => {
        let map = L.map('map').setView(
            [21.110303, -89.611401], 12
        );

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            tileSize: 256
        }).addTo(map);

        mapRef.current = map;

        setBounds({
            northeast: map.getBounds().getNorthEast(),
            southwest: map.getBounds().getSouthWest()
        });

        map.on('moveend', (event) => {       
            if (timeout.current)
                clearTimeout(timeout.current);

            setBoundsLoading(true);

            timeout.current = setTimeout(() => {
                let bounds = event.target.getBounds();
                setBounds({
                    northeast: bounds.getNorthEast(),
                    southwest: bounds.getSouthWest()
                });
                setBoundsLoading(false);
            }, 800);
        });

        return () => {
            if(timeout.current)
                clearTimeout(timeout.current);

            map.remove();

            popupsRef.current.forEach((popup) => {
                mapRef.current?.removeLayer(popup);
            });
            popupsRef.current.clear();
        };
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;

        if (listings.length === 0 && isLoading) {
            return;
        }

        updateMapListings(listings);
    }, [listings]);

    return (
        <div className={styles.mapContainer}>
            {(isLoading || boundsLoading) && (
                <div className={styles.loadingOverlay}>
                    <div className={styles.loader}></div>
                </div>
            )}
            <div id="map" className="w-full h-full z-10" />
        </div>
    )
}
