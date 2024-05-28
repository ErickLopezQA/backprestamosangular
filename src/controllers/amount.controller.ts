import { Request, Response } from 'express';
import Amount from '../models/amount';

export const getAmounts = async(req: Request, res: Response) => {
  const listAmounts = await Amount.findAll();
  // console.log(req.body);
  res.json(listAmounts);
}

export const getAmount = async(req: Request, res: Response) => {
  const { id } = req.params;
  const amount = await Amount.findByPk(id);
  if (amount) {
    res.json(amount);
  } else {
    res.status(404).json({
      message: 'No existe un monto con el id: ' + id
    });
  }
}

export const postAmount = async(req: Request, res: Response) => {
  const { body } = req;
  try {
    await Amount.create(body);
    res.json({
      message: 'Monto Registrado Exitosamentee',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al registrar el monto',
    });
    console.log(error)
  }
}
  
export const updateAmount = async(req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const amount = await Amount.findByPk(id);
  if (amount) {
    await amount.update(body)    
    res.json({
      message: 'Monto Actualizado Exitosamente'
    });
  } else {
    res.status(404).json({
      message: 'No existe un monto con el id: ' + id
    }); 
  }
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar el monto',
  })
}
}

export const deleteAmount = async(req: Request, res: Response) => {
  const { id } = req.params;
  const amount = await Amount.findByPk(id);
  if (!Amount) {
    res.status(404).json({
      message: 'No existe un monto con el id: ' + id
    });
  } else {
    await Amount.destroy();
    res.json({
      message: 'Monto Eliminado Exitosamente'
    });
  }
}