import { PrismaClient } from '@prisma/client';
import React from 'react';
import Axios from 'axios';

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { name, phone, longitud, latitud } = req.body; 

    // No es necesario conectar explícitamente con Prisma, ya que Prisma administra la conexión automáticamente.

    const newTodo = await prisma.company.create({
      data: {
        name: name,
        phone: phone,
        longitud: longitud, // Asume que `location` es un objeto con detalles de ubicación
        latitud:latitud
      },
    });

    console.log(newTodo);

    res.status(200).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno' });
  } finally {
    await prisma.$disconnect(); 
  }
}

export default handler;
