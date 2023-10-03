import { PrismaClient } from '@prisma/client';
import React, { useState } from 'react';
import Axios from 'axios';

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { name, phone } = req.body; 

    // No es necesario conectar explícitamente con Prisma, ya que Prisma administra la conexión automáticamente.

    const newTodo = await prisma.company.create({
      data: {
        name: name,
        phone: phone,
       
      },
    });

    console.log(newTodo);

    res.status(200).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno' });
  } finally {
    await prisma.$disconnect(); // Cierra la conexión con la base de datos después de la operación.
  }
}

export default handler;
