import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useState } from 'react'
import Axios from 'axios'

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [latitud, setLatitud] = useState(0); // Coordenadas iniciales del defaultCenter
  const [longitud, setLongitud] = useState(0);
  const [location, setLocation] = useState({ lat: -17.3895, lng: -66.1568 }); // Coordenadas iniciales del defaultCenter
  const [address, setAddress] = useState(''); 


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCDgYXOkWNlwfBEVqaR1lMqKq54rC1p9xo'// Reemplaza con tu propia API key
  });

  const handleMapClick = async (event) => {
    const { latLng } = event;
    setLocation(latLng);
    setLatitud(latLng.lat());
    setLongitud(latLng.lng());
    setLocation(latLng);

    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.lat()},${latLng.lng()}&key=AIzaSyCDgYXOkWNlwfBEVqaR1lMqKq54rC1p9xo`);
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

  const handleSubmit = () => {
    const companyObj = {
      name: name,
      phone: phone,
      latitud:latitud,
      longitud:longitud 
     
    }
    Axios.post('/api/newTodo', companyObj)
      .then(() => {
        alert('Todo added')
      })
  }

  return (
    <>
      <div className='container'>
        <h1>Create new Company</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="todo" className="form-label">Phone</label>
            <input type="text" className="form-control" id="phone" aria-describedby="emailHelp" onChange={(event) => setPhone(event.target.value)} />
          </div> 
           <div  className = "mb-3">
           <label htmlFor="todo" className="form-label">MARCA TU UBICACION</label>
        
          </div>
      
          <div className="row">
  <      div className="col-md-5">
       <  div className="form-group">
        <label htmlFor="latitud">Latitud</label>
        <input type="text" id="latitud" value={latitud} className="form-control" onChange={(event) => setLatitud(event.target.value)}/>
        </div>
         </div>
  
      
         <div className="col-md-5">
           <div className="form-group">
          <label htmlFor="longitud">Longitud</label>
          <input type="text" id="longitud" value={longitud} className="form-control" onChange={(event) => setLongitud(event.target.value)}/>
           </div>
          </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>

          </form>
          </div>

    <div>
      <h1>Google Mapas</h1>
      {isLoaded ? (
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

    </div>
  ) : <div>Cargando mapa...</div>}; 
    </div>
    </>
  )}


