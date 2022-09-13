import { Router } from "express";

import { UsuarioController } from "../controllers/usuarios.controller";
const usuarioController = new UsuarioController();

const router = Router();

router.get("/", usuarioController.obtenerUsuarios);
router.post("/create", usuarioController.crearUsuario);

export default router;
