import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const Map = () => {
  const [location, setLocation] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCDgYXOkWNlwfBEVqaR1lMqKq54rC1p9xo'
  });

  const handleMapClick = async (event) => {
    const { latLng } = event;
    setLocation(latLng);

    try {
      await fetch('/api/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lat: latLng.lat(), lng: latLng.lng() })
      });
    } catch (error) {
      console.error('Error al enviar la locations al servidor:', error);
    }
  };

  const handleMarkerDrag = (event) => {
    const { latLng } = event;
    document.getElementById("latitud").value = latLng.lat();
    document.getElementById("longitud").value = latLng.lng();
  };

  const mapStyles = {
    height: '100vh',
    width: '100%'
  };

  const defaultCenter = {
    lat: -17.3895,
    lng: -66.1568
 
  };

  return isLoaded ? (
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
          onDragEnd={(event) => setLocation(event.latLng)}
        />
        
      )}

    </GoogleMap>
  ) : <></>;
};

export default Map;