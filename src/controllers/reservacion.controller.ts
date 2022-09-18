import { sequelize } from "../database/database";
import { Salon } from "../models/salon.model";
import { Usuario } from "../models/usuario.model";
import { Reservacion } from "../models/reservacion.model";
import { DetallesUsuario } from "../models/detalles_usuario.model";
import { SalonEstatus } from "../models/salon_estatus.model";
import { Request, Response } from "express";

// creamos las variables que contienen los repositorios de las tablas de la base de datos
const detallesUsuarioRepo = sequelize.getRepository(DetallesUsuario);
const reservacionRepo = sequelize.getRepository(Reservacion);
const salonRepo = sequelize.getRepository(Salon);
const estatusRepo = sequelize.getRepository(SalonEstatus);
const usuarioRepo = sequelize.getRepository(Usuario);

export class ReservacionController {
  // con esta función obtenemos todas las reservaciones para
  //  el usuario específico que está logueado actualmente
  async obtenerReservaciones(req: Request, res: Response) {
    const { id_usuario } = req.body;
    const reservacion = await reservacionRepo.findAll({
      where: {
        active: 1,
        id_usuario: id_usuario,
      },
      attributes: ["id_reservacion", "hora_inicial", "hora_final", "active"],
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

  // obtenemos la reservación por id
  async obtenerReservacionPorId(req: Request, res: Response) {
    const { id_reservacion } = req.params;
    const reservacion = await reservacionRepo.findOne({
      where: {
        id_reservacion,
        active: 1,
      },
      attributes: ["id_reservacion", "hora_inicial", "hora_final", "active"],
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

  // con esta función creamos la reservación
  async crearReservacion(req: Request, res: Response) {
    const { id_usuario, id_salon, hora_inicial, hora_final } = req.body;
    // primero validamos que el salón no esté ocupado en ese horario
    const salon = await salonRepo.findOne({
      where: {
        id_salon,
        id_salon_estatus: 1,
      },
    });
    if (salon) {
      // si el salón está disponible, entonces creamos la reservación
      // con los datos que nos llegan en el body
      await reservacionRepo
        .create({
          id_usuario,
          id_salon,
          hora_inicial,
          hora_final,
          active: 1,
        })
        .then(async (reservacionCreada) => {
          // una vez que se crea la reservación, cambiamos el estatus del salón a ocupado
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

  // con esta función actualizamos la reservación por id a terminada o cancelada
  async terminarReservacion(req: Request, res: Response) {
    const { id_reservacion } = req.params;
    // buscamos la reservación por id y que esté activa
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
          // una vez que se termina la reservación, cambiamos el estatus del salón a disponible
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
