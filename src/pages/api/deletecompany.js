import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { id } = req.query;

  // Validar que el ID sea un número entero
  const companyId = parseInt(id, 10);

  if (isNaN(companyId) || companyId <= 0) {
    return res.status(400).json({ error: 'ID de compañía no válido' });
  }

  try {
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      return res.status(404).json({ error: 'Compañía no encontrada' });
    }

    await prisma.company.delete({
      where: {
        id: companyId,
      },
    });

    console.log('Registro eliminado:', company);
    return res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    return res.status(500).json({ error: 'Error interno al eliminar la compañía' });
  } finally {
    await prisma.$disconnect();
  }
}

export default handler;
