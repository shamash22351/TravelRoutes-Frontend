import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const RouteCreator = ({ onSave }) => {
  const [locations, setLocations] = useState([]);
  const [lat, setLat] = useState(51.505);
  const [lng, setLng] = useState(-0.09);

  const addLocation = () => {
    setLocations([...locations, { lat, lng }]);
    setLat(51.505);
    setLng(-0.09);
  };

  const saveRoute = () => {
    const routeId = Date.now();
    const routeData = { id: routeId, locations };
    onSave(routeData);
  };

  return (
    <div>
      <MapContainer center={[lat, lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((loc, index) => (
          <Marker key={index} position={[loc.lat, loc.lng]}>
            <Popup>
              Точка {index + 1} <br /> {loc.lat}, {loc.lng}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <input
        type="number"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="Широта"
      />
      <input
        type="number"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        placeholder="Долгота"
      />
      <button onClick={addLocation}>Добавить точку</button>
      <button onClick={saveRoute}>Сохранить маршрут</button>
    </div>
  );
};


export default RouteCreator;