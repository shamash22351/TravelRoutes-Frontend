import React, { useState, useEffect } from 'react'; 
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

//Предварительно: npm install @react-google-maps/api

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

  const fetchLocations = () => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: center,
      radius: '500',
      type: [''],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setLocations(results);
      }
    });
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <LoadScript googleMapsApiKey="апи ключ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        {locations.map((location, index) => (
          <Marker key={index} position={{ lat: location.geometry.location.lat(), lng: location.geometry.location.lng() }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;