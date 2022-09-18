import { Request, Response } from "express";
import crypto from "crypto";
import { sequelize } from "../database/database";
import { TiposUsuario } from "../models/tipos_usuario.model";
import { Usuario } from "../models/usuario.model";
import { DetallesUsuario } from "../models/detalles_usuario.model";

const usuarioRepo = sequelize.getRepository(Usuario);
const tipoUsuarioRepo = sequelize.getRepository(TiposUsuario);
const detallesUsuarioRepo = sequelize.getRepository(DetallesUsuario);

export class Registro {
  async registrar(req: Request, res: Response) {
    const {
      nombre,
      apellidos,
      domicilio,
      telefono,
      edad,
      email,
      password,
      id_tipo_usuario,
    } = req.body;

    const hashPass = crypto.createHash("sha256").update(password).digest("hex");

    const validarCorreo = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );

    var tipo_usuario = id_tipo_usuario == undefined ? 2 : id_tipo_usuario;

    if (validarCorreo.test(email)) {
      await usuarioRepo
        .findOne({
          where: { email },
        })
        .then(async (usuario) => {
          if (!usuario) {
            const nuevoUsuarioDetalles = await detallesUsuarioRepo.create({
              nombre,
              apellidos,
              domicilio,
              telefono,
              edad,
            });
            if (nuevoUsuarioDetalles) {
              await usuarioRepo
                .create({
                  id_detalles_usuario: nuevoUsuarioDetalles.id_detalles_usuario,
                  id_tipos_usuario: tipo_usuario,
                  email,
                  password: hashPass,
                  active: 1,
                })
                .then((createdUser) => {
                  return res
                    .status(200)
                    .json({ msj: "Usuario Creado", data: createdUser });
                })
                .catch((error) => {
                  console.log(error);
                  return res.status(400).json({ err: error });
                });
            }
          } else {
            return res
              .status(400)
              .json({ msj: "El Correo ya está registrado" });
          }
        });
    } else {
      return res.status(400).json({ msj: "Correo no válido" });
    }
    return res.send();
  }
}
