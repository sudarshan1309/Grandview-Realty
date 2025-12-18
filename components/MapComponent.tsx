import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';

// Fix: Use CDN URLs for markers instead of imports to avoid build issues
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle bounds updating when properties change
const MapBoundsUpdater = ({ properties }) => {
  const map = useMap();

  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map(p => [p.latitude, p.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [properties, map]);

  return null;
};

export const MapComponent = ({ 
  properties, 
  center = [39.8283, -98.5795], // US Center
  zoom = 4 
}) => {
  return (
    <div className="h-full w-full z-0 relative">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map(property => (
          <Marker 
            key={property.id} 
            position={[property.latitude, property.longitude]}
          >
            <Popup className="custom-popup">
              <div className="w-48">
                 <img src={property.imageUrl} alt={property.title} className="w-full h-24 object-cover rounded-t-sm mb-2" />
                 <h4 className="font-bold text-sm text-charcoal truncate">{property.title}</h4>
                 <p className="text-brand font-bold text-xs mb-2">${property.price.toLocaleString()}</p>
                 <Link to={`/properties/${property.id}`} className="block w-full text-center bg-charcoal text-white text-xs py-1 rounded-sm hover:bg-gray-800">
                   View Details
                 </Link>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapBoundsUpdater properties={properties} />
      </MapContainer>
    </div>
  );
};