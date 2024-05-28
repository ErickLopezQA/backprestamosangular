// controllers/loanController.ts
import { Request, Response } from "express";
import Loan from "../models/loan";
import Client from "../models/client";
import Amount from "../models/amount";
import TimePeriod from "../models/time-period";

export const getLoans = async (req: Request, res: Response) => {
  const listLoans = await Loan.findAll({
    include: [
      { model: Client, attributes: ["name", "lastname", "email", "contact", "address"] },
      { model: Amount, attributes: ["amount"] },
      { model: TimePeriod, attributes: ["time_period"] },
    ],
  });
  res.json(listLoans);
};

export const getLoan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const loan = await Loan.findByPk(id, {
    include: [
      { model: Client, attributes: ["name", "lastname", "email", "contact", "address"] },
      { model: Amount, attributes: ["amount"] },
      { model: TimePeriod, attributes: ["time_period"] },
    ],
  });
  if (loan) {
    res.json(loan);
  } else {
    res
      .status(404)
      .json({ message: "No existe un préstamo con el id: " + id });
  }
};

// Otros controladores...

export const postLoan = async(req: Request, res: Response) => {
  const { body } = req;
  try {
    await Loan.create(body);
    res.json({
      message: 'Prestamo Registrado Exitosamentee',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al registrar el prestamo',
    });
    console.log(error)
  }
}
  
export const updateLoan = async(req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const loan = await Loan.findByPk(id);
  if (loan) {
    await loan.update(body)    
    res.json({
      message: 'Prestamo Actualizado Exitosamente'
    });
  } else {
    res.status(404).json({
      message: 'No existe un prestamo con el id: ' + id
    }); 
  }
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar al prestamo',
  })
}
}

export const deleteLoan = async(req: Request, res: Response) => {
  const { id } = req.params;
  const loan = await Loan.findByPk(id);
  if (!loan) {
    res.status(404).json({
      message: 'No existe un prestamo con el id: ' + id
    });
  } else {
    await loan.destroy();
    res.json({
      message: 'Prestamo Eliminado Exitosamente'
    });
  }
}