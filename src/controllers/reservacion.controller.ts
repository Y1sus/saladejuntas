import { sequelize } from "../database/database";
import { Salon } from "../models/salon.model";
import { Usuario } from "../models/usuario.model";
import { Reservacion } from "../models/reservacion.model";
import { DetallesUsuario } from "../models/detalles_usuario.model";
import { SalonEstatus } from "../models/salon_estatus.model";
import { Request, Response } from "express";

const detallesUsuarioRepo = sequelize.getRepository(DetallesUsuario);
const reservacionRepo = sequelize.getRepository(Reservacion);
const salonRepo = sequelize.getRepository(Salon);
const estatusRepo = sequelize.getRepository(SalonEstatus);
const usuarioRepo = sequelize.getRepository(Usuario);

export class ReservacionController {
  async obtenerReservaciones(req: Request, res: Response) {
    const reservacion = await reservacionRepo.findAll({
      where: {
        active: 1,
      },
      attributes: ["id_reservacion", "fecha", "active"],
      include: [
        {
          model: salonRepo,
          attributes: ["id_salon", "nombre_salon", "descripcion_salon"],
          include: [
            {
              model: estatusRepo,
              attributes: ["id_salon_estatus", "nombre_estatus"],
            },
          ],
        },
        {
          model: usuarioRepo,
          attributes: ["id_usuario", "email"],
          include: [
            {
              model: detallesUsuarioRepo,
              attributes: [
                "id_detalles_usuario",
                "nombre",
                "apellidos",
                "domicilio",
                "telefono",
                "edad",
              ],
            },
          ],
        },
      ],
    });
    if (reservacion.length > 0)
      return res.status(200).json({ data: reservacion });
    else return res.status(204).json({ msj: "No hay reservaciones" });
  }

  async obtenerReservacionPorId(req: Request, res: Response) {
    const { id_reservacion } = req.params;
    const reservacion = await reservacionRepo.findOne({
      where: {
        id_reservacion,
        active: 1,
      },
      attributes: ["id_reservacion", "fecha", "active"],
      include: [
        {
          model: salonRepo,
          attributes: ["id_salon", "nombre_salon", "descripcion_salon"],
        },
        {
          model: usuarioRepo,
          attributes: ["id_usuario", "email"],
          include: [
            {
              model: detallesUsuarioRepo,
              attributes: [
                "id_detalles_usuario",
                "nombre",
                "apellidos",
                "domicilio",
                "telefono",
                "edad",
              ],
            },
          ],
        },
      ],
    });
    if (!reservacion)
      return res.status(203).json({ msj: "No se encuentra la reservacion" });
    else return res.status(200).json({ data: reservacion });
  }

  async crearReservacion(req: Request, res: Response) {
    const { id_usuario, id_salon, fecha } = req.body;
    const salon = await salonRepo.findOne({
      where: {
        id_salon,
        id_salon_estatus: 1,
      },
    });
    if (salon) {
      await reservacionRepo
        .create({
          id_usuario,
          id_salon,
          fecha,
          active: 1,
        })
        .then(async (reservacionCreada) => {
          await salonRepo.update(
            {
              id_salon_estatus: 2,
            },
            {
              where: {
                id_salon,
              },
            }
          );
          return res.status(200).json({ data: reservacionCreada });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ msj: "No se pudo crear la reservacion" });
        });
    } else {
      return res
        .status(200)
        .json({ msj: "Ya se encuentra reservado el salon" });
    }
  }

  async terminarReservacion(req: Request, res: Response) {
    const { id_reservacion } = req.params;
    const reservacion = await reservacionRepo.findOne({
      where: {
        id_reservacion,
        active: 1,
      },
    });
    if (!reservacion) {
      return res.status(200).json({ msj: "No existe la reservacion" });
    } else {
      await reservacionRepo
        .update(
          { active: 0 },
          {
            where: {
              id_reservacion,
            },
          }
        )
        .then(async () => {
          const id_salon = reservacion.getDataValue("id_salon");
          await salonRepo
            .update(
              {
                id_salon_estatus: 1,
              },
              {
                where: {
                  id_salon: id_salon,
                },
              }
            )
            .catch((err) => console.log("No se pudo desocupar el salon ", err));
          return res.status(200).json({ msj: "Se termino la reservacion" });
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(200)
            .json({ msj: "No se pudo terminar la reservacion" });
        });
    }
  }
}
