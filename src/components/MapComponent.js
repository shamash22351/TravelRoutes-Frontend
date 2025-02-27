// src/components/MapComponent.js
import React, { useEffect, useRef, useState } from 'react';

const MapComponent = ({ onLocationSelect }) => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        if (!mapInstanceRef.current) {
            mapInstanceRef.current = new window.ymaps.Map(mapContainerRef.current, {
                center: [55.76, 37.64],
                zoom: 10,
            });

            mapInstanceRef.current.events.add('click', (e) => {
                const coords = e.get('coords');
                setLatitude(coords[0]);
                setLongitude(coords[1]);

                onLocationSelect(coords[0], coords[1]);
            });
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.destroy();
                mapInstanceRef.current = null;
            }
        };
    }, [onLocationSelect]);

    return (
        <div>
            <div style={{ width: '100%', height: '400px' }} ref={mapContainerRef} />

        </div>
    );
};

export default MapComponent;