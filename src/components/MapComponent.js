import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Make sure to install the package: npm install @react-google-maps/api

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 37.7749,
    lng: -122.4194
};

const MapComponent = () => {
    const [locations, setLocations] = useState([]);
    const [map, setMap] = useState(null); // State to hold the map instance

    // Function to fetch locations
    const fetchLocations = () => {
        if (map && window.google) { // Check if map and google are defined
            const service = new window.google.maps.places.PlacesService(map);
            const request = {
                location: center,
                radius: '500',
                type: ['restaurant'], // Specify type if necessary
            };

            service.nearbySearch(request, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    setLocations(results);
                }
            });
        }
    };

    // useEffect to run fetchLocations when the map is loaded
    useEffect(() => {
        if (map) {
            fetchLocations(); // Call fetchLocations only if map is defined
        }
    }, [map]); // Dependency array includes map

    // onLoad function to grab the map instance
    const onLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    return (
        <LoadScript googleMapsApiKey="your_api_key_here" libraries={['places']}> {/* Make sure to include the 'places' library */}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
                onLoad={onLoad} // Capture map instance on load
            >
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        position={{ lat: location.geometry.location.lat(), lng: location.geometry.location.lng() }}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;