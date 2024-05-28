import { Request, Response } from 'express';
import TimePeriod from '../models/time-period';

export const getTimePeriods = async(req: Request, res: Response) => {
  const listTimePeriod = await TimePeriod.findAll();
  // console.log(req.body);
  res.json(listTimePeriod);
}

export const getTimePeriod = async(req: Request, res: Response) => {
  const { id } = req.params;
  const timeperiod = await TimePeriod.findByPk(id);
  if (timeperiod) {
    res.json(timeperiod);
  } else {
    res.status(404).json({
      message: 'No existe un cliente con el id: ' + id
    });
  }
}

export const postTimePeriod = async(req: Request, res: Response) => {
  const { body } = req;
  try {
    await TimePeriod.create(body);
    res.json({
      message: 'Plazo Registrado Exitosamentee',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al registrar el plazo',
    });
    console.log(error)
  }
}
  
export const updateTimePeriod = async(req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const timeperiod = await TimePeriod.findByPk(id);
  if (timeperiod) {
    await timeperiod.update(body)    
    res.json({
      message: 'Plazo Actualizado Exitosamente'
    });
  } else {
    res.status(404).json({
      message: 'No existe un plazo con el id: ' + id
    }); 
  }
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar al plazo',
  })
}
}

export const deleteTimePeriod = async(req: Request, res: Response) => {
  const { id } = req.params;
  const timeperiod = await TimePeriod.findByPk(id);
  if (!timeperiod) {
    res.status(404).json({
      message: 'No existe un plazo con el id: ' + id
    });
  } else {
    await timeperiod.destroy();
    res.json({
      message: 'Plazo Eliminado Exitosamente'
    });
  }
}