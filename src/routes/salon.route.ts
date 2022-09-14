import { Router } from "express";

import { SalonController } from "../controllers/salon.controller";

const salon = new SalonController();

const router = Router();

router.get("/", salon.obtenerSalones);
router.get("/:id_salon", salon.obtenerSalonPorId);
router.post("/agregar", salon.agregarSalon);
router.post("/eliminar", salon.eliminarSalon);
router.post("/liberar/:id_salon", salon.liberarSalon);
router.post("/ocupar/:id_salon", salon.ocuparSalon);


export default router;
