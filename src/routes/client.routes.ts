import { Router } from "express";
import { deleteClient, getClient, getClients, postClient, updateClient } from "../controllers/client.controller";

const router = Router();

  router.get('/', getClients);
  router.get('/:id', getClient);
  router.post('/', postClient);
  router.put('/:id', updateClient);
  router.delete('/:id', deleteClient);

export default router;