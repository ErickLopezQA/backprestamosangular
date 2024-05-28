import { Request, Response } from 'express';
import Client from '../models/client';

export const getClients = async(req: Request, res: Response) => {
  const listClients = await Client.findAll();
  // console.log(req.body);
  res.json(listClients);
}

export const getClient = async(req: Request, res: Response) => {
  const { id } = req.params;
  const client = await Client.findByPk(id);
  if (client) {
    res.json(client);
  } else {
    res.status(404).json({
      message: 'No existe un cliente con el id: ' + id
    });
  }
}

export const postClient = async(req: Request, res: Response) => {
  const { body } = req;
  try {
    await Client.create(body);
    res.json({
      message: 'Cliente Registrado Exitosamentee',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al registrar el cliente',
    });
    console.log(error)
  }
}
  
export const updateClient = async(req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
  if (client) {
    await client.update(body)    
    res.json({
      message: 'Cliente Actualizado Exitosamente'
    });
  } else {
    res.status(404).json({
      message: 'No existe un cliente con el id: ' + id
    }); 
  }
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar al cliente',
  })
}
}

export const deleteClient = async(req: Request, res: Response) => {
  const { id } = req.params;
  const client = await Client.findByPk(id);
  if (!client) {
    res.status(404).json({
      message: 'No existe un cliente con el id: ' + id
    });
  } else {
    await client.destroy();
    res.json({
      message: 'Cliente Eliminado Exitosamente'
    });
  }
}