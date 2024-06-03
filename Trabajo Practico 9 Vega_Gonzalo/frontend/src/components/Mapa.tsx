import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Icono personalizado (opcional)
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent: React.FC = () => {
  // Coordenadas estáticas
  const position: [number, number] = [-32.8864155,-68.8383058];

  return (
    <MapContainer
      center={position}
      zoom={25}
      style={{ height: '600px', width: '100%' }}
    // scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          Tienda Hendrix, Instrumentos de calidad
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
