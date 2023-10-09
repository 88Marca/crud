import React, { useState } from 'react';
import Axios from 'axios';
import { prisma } from "@prisma/client";

export async function getStaticProps() {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  

  const company = await prisma.company.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  prisma.$disconnect();
  return {
    props: {
      company: JSON.parse(JSON.stringify(company)), // Cambiado de 'todos' a 'company'
    },
  };
}

const DisplayTodos = ({ company }) => {
  const [visibility, setVisibility] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);
  const [companyId, setCompanyId] = useState(''); // Agregado el estado para 'companyId'

  const editForm = (name, phone, latitud, longitud, companyId) => {
    setVisibility(!visibility);
    setName(name);
    setPhone(phone);
    setLatitud(latitud)
    setLongitud(longitud)

    setCompanyId(companyId); // Actualiza el 'companyId' en el estado
  };

  const updateTodo = async (companyId) => {
    const companyObj = {
      name: name,
      phone: phone,
      latitud: latitud,
      longitud: longitud
       
    };
    await Axios.put(`/api/updateTodo?id=${companyId}`, companyObj).then(() => {
      window.location.reload(false);
    });
  };

  const deleteTodo = (companyId) => {
    Axios.delete(`/api/deletecompany?id=${companyId}`).then(() => {
      window.location.reload(false);
    });
  };

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Latitud</th> 
              <th scope="col">Longitud</th> 


              <th scope="col">Options</th>
            

            </tr>
          </thead>
          <tbody>
           {company.map((element) => {
              return (
                <tr key={element.id}>
                  <td>{element.name}</td>
                  <td>{element.phone}</td>
                  <td>{element.latitud}</td>
                  <td>{element.longitud}</td>

                  
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteTodo(element.id)}>Delete</button>
                    <button className="btn btn-primary" onClick={() => editForm(element.name, element.phone, element.email, element.id)}>Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {visibility && (
        <div className="container">
          <h1>Update company</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                aria-describedby="emailHelp"
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={() => updateTodo(companyId)}>Submit</button>
            <button type="button" className="btn btn-danger" onClick={() => setVisibility(!visibility)}>Cancel</button>
          </form>
        </div>
      )}
    </>
  );
};

export default DisplayTodos;


/* 
 */

/*id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCDgYXOkWNlwfBEVqaR1lMqKq54rC1p9xo'      */