import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const Map = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(''); // Cambiado a string en lugar de null

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCDgYXOkWNlwfBEVqaR1lMqKq54rC1p9xo'// Reemplaza con tu propia API key
  });

  const handleMapClick = async (event) => {
    const { latLng } = event;

    setLocation(latLng);

    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.lat()},${latLng.lng()}&key=TU_API_KEY`);
      const data = await response.json();

      if (data.results && data.results[0]) {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress('Dirección no disponible');
      }
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  };

  const handleMarkerDrag = (event) => {
    const { latLng } = event;
    setLocation(latLng);
  };

  const mapStyles = {
    height: '50vh', // Cambiado el tamaño del mapa
    width: '100%'
  };

  const defaultCenter = {
    lat: -17.3895,
    lng: -66.1568 
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={11}
        center={defaultCenter}
        onClick={handleMapClick}
      >
        {location && (
          <Marker
            position={location}
            draggable={true}
            onDragEnd={handleMarkerDrag} // Cambiado el manejador
          />
        )}
      </GoogleMap>
      {location && (
        <div>
          <h2>Latitud:</h2>
          <p>{location.lat()}</p>
          <h2>Longitud:</h2>
          <p>{location.lng()}</p>
          <h2>Dirección:</h2>
          <p>{address}</p>
        </div>
      )}
    </div>
  ) : <div>Cargando mapa...</div>; // Agregado un mensaje de carga
};

export default Map;
