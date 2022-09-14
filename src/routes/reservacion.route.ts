import { Router } from "express";

import { ReservacionController } from "../controllers/reservacion.controller";

const reservacion = new ReservacionController();
const router = Router();

router.get("/", reservacion.obtenerReservaciones);
router.get("/:id_reservacion", reservacion.obtenerReservacionPorId);
router.post("/create", reservacion.crearReservacion);
router.post("/finish/:id_reservacion", reservacion.terminarReservacion);

export default router;
