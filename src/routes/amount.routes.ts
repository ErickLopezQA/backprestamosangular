import { Router } from "express";
import { deleteAmount, getAmount, getAmounts, postAmount, updateAmount } from "../controllers/amount.controller";

const router = Router();

  router.get('/', getAmounts);
  router.get('/:id', getAmount);
  router.post('/', postAmount);
  router.put('/:id', updateAmount);
  router.delete('/:id', deleteAmount);

export default router;