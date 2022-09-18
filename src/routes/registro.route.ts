import { Router } from "express";

import { Registro } from "../controllers/registro.controller";

const registro = new Registro();
const router = Router();

router.post("/", registro.registrar);

export default router;

