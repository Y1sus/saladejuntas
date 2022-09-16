import { Request, response, Response } from "express";
import { sequelize } from "../database/database";
import { Salon } from "../models/salon.model";
import { SalonEstatus } from "../models/salon_estatus.model";

const salonRepo = sequelize.getRepository(Salon);
const salonEstatusRepo = sequelize.getRepository(SalonEstatus);

export class SalonController {
  async obtenerSalones(req: Request, res: Response): Promise<Response> {
    const salones = await salonRepo.findAll({
      where: {
        active: 1,
      },
      include: {
        model: salonEstatusRepo,
        attributes: ["id_salon_estatus", "nombre_estatus"],
      },
    });

    if (salones.length > 0)
      return res.status(200).json({ status: 200, data: salones });
    return res.status(204).json({ msj: "No hay salones actualmente" });
  }

  async obtenerSalonesDisponibles(
    req: Request,
    res: Response
  ): Promise<Response> {
    const salones = await salonRepo.findAll({
      where: {
        active: 1,
        id_salon_estatus: 1,
      },
      include: {
        model: salonEstatusRepo,
        attributes: ["id_salon_estatus", "nombre_estatus"],
      },
    });

    if (salones.length > 0)
      return res.status(200).json({ status: 200, data: salones });
    return res
      .status(204)
      .json({ status: 204, msj: "No hay salones actualmente" });
  }

  async obtenerSalonPorId(req: Request, res: Response) {
    const { id_salon } = req.params;
    const salon = await salonRepo.findOne({
      where: {
        id_salon,
        active: 1,
      },
      include: {
        model: salonEstatusRepo,
        attributes: ["id_salon_estatus", "nombre_estatus"],
      },
    });

    if (salon) return res.status(200).json({ status: 200, data: salon });
    else return res.status(204).json({ msj: "No hay salones" });
  }

  async agregarSalon(req: Request, res: Response) {
    const { nombre_salon, descripcion_salon } = req.body;
    const salon = await salonRepo.findOne({
      where: {
        nombre_salon,
        active: 1,
      },
    });

    var descripcion = descripcion_salon == undefined ? null : descripcion_salon;
    if (salon)
      return res.status(200).json({ msj: "Ya existe un nombre para el salón" });

    const nuevoSalon = await salonRepo.create({
      nombre_salon,
      descripcion_salon: descripcion,
      id_salon_estatus: 1,
      active: 1,
    });

    if (nuevoSalon)
      return res
        .status(200)
        .json({ msj: "Salón creado con éxito", data: nuevoSalon });
    else return res.status(204).json({ msj: "No se pudo crear el salón" });
  }

  async eliminarSalon(req: Request, res: Response) {
    const { id_salon } = req.params;
    const salon = await salonRepo.findOne({
      where: {
        id_salon,
        active: 1,
      },
    });

    if (!salon)
      return res.status(200).json({ msj: "No se encuentra el salón" });

    await salonRepo
      .update(
        {
          active: 0,
        },
        {
          where: {
            id_salon,
          },
        }
      )
      .then(() => {
        return res.status(200).json({ msj: "Salón eliminado con éxito" });
      });
  }

  async liberarSalon(req: Request, res: Response) {
    const { id_salon } = req.params;
    const salon = await salonRepo.findOne({
      where: {
        id_salon,
        active: 1,
        id_salon_estatus: 2,
      },
    });

    if (!salon)
      return res.status(200).json({ msj: "El salon no está ocupado" });

    await salonRepo
      .update(
        {
          id_salon_estatus: 1,
        },
        {
          where: {
            id_salon,
          },
        }
      )
      .then(() => res.status(200).json({ msj: "El salon se desocupo" }));
  }

  async ocuparSalon(req: Request, res: Response) {
    const { id_salon } = req.params;
    const salon = await salonRepo.findOne({
      where: {
        id_salon,
        active: 1,
        id_salon_estatus: 1,
      },
    });

    if (!salon) return res.status(200).json({ msj: "El ya está en uso" });

    await salonRepo
      .update(
        {
          id_salon_estatus: 2,
        },
        {
          where: {
            id_salon,
          },
        }
      )
      .then(() => res.status(200).json({ msj: "El salon se ocupó" }));
  }
}
