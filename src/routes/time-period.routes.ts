import { Router } from "express";
import { deleteTimePeriod, getTimePeriod, getTimePeriods, postTimePeriod, updateTimePeriod } from "../controllers/time-period.controller";

const router = Router();

  router.get('/', getTimePeriods);
  router.get('/:id', getTimePeriod);
  router.post('/', postTimePeriod);
  router.put('/:id', updateTimePeriod);
  router.delete('/:id', deleteTimePeriod);

export default router;