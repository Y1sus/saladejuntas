import { Request, Response } from "express";
import crypto from "crypto";
import { sequelize } from "../database/database";
import { TiposUsuario } from "../models/tipos_usuario.model";
import { Usuario } from "../models/usuario.model";

const usuarioRepo = sequelize.getRepository(Usuario);
const tipoUsuarioRepo = sequelize.getRepository(TiposUsuario);
export class UsuarioController {
  async obtenerUsuarios(req: Request, res: Response): Promise<Response> {
    const usuarios = await usuarioRepo.findAll({
      where: {
        active: 1,
      },
      include: {
        model: tipoUsuarioRepo,
        attributes: ["tipo_usuario"],
      },
    });

    if (usuarios.length > 0) {
      return res.status(200).json({
        status: 200,
        data: usuarios,
      });
    }
    return res.status(200).json({
      msj: "No hay usuarios registrados",
    });
  }

  async obtenerUsuarioPorId(req: Request, res: Response): Promise<Response> {
    const { id_usuario } = req.params;
    const usuario = await usuarioRepo.findOne({
      where: {
        id_usuario,
        activo: 1,
      },
      include: [tipoUsuarioRepo],
    });

    if (usuario) {
      return res.status(200).json({
        status: 200,
        data: usuario,
      });
    }
    return res.status(200).json({ msj: " No se encuentra el usuario" });
  }

  async crearUsuario(req: Request, res: Response): Promise<Response> {
    const { email, password, id_detalles_usuario, id_tipo_usuario } = req.body;
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
            await usuarioRepo
              .create({
                id_detalles_usuario,
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
