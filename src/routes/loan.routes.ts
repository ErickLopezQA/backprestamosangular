import { Router } from "express";
import { deleteLoan, getLoan, getLoans, postLoan, updateLoan } from "../controllers/loan.controller";

const router = Router();

  router.get('/', getLoans);
  router.get('/:id', getLoan);
  router.post('/', postLoan);
  router.put('/:id', updateLoan);
  router.delete('/:id', deleteLoan);

export default router;