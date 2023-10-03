import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useState } from 'react'
import Axios from 'axios'
import Map from '../component/Mapa.js'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
   

  const handleSubmit = () => {
    const companyObj = {
      name: name,
      phone: phone,
     
    }
    console.log(companyObj)
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
           <button type="submit" className="btn btn-primary">Submit</button>
           <div  className = "mb-3">
           <label htmlFor="todo" className="form-label">Marca Tu ubicacion</label>
        
          </div>
        </form>
      </div>
      
          <div className="row">
  <      div className="col-md-5">
       <  div className="form-group">
        <label htmlFor="latitud">Latitud</label>
        <input type="text" id="latitud" className="form-control"/>
        </div>
         </div>
  
      
         <div className="col-md-5">
           <div className="form-group">
          <label htmlFor="longitud">Longitud</label>
          <input type="text" id="longitud" className="form-control"/>
           </div>
          </div>
          </div>

    <div>
      <h1>Google Mapas</h1>
      <Map />
    </div>
    </>
  )}


  