import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario.model";
import { sequelize } from "../database/database";
import { TiposUsuario } from "../models/tipos_usuario.model";
import { DetallesUsuario } from "../models/detalles_usuario.model";

const usuarioRepo = sequelize.getRepository(Usuario);
const tipoUsuarioRepo = sequelize.getRepository(TiposUsuario);
const detallesUsuarioRepo = sequelize.getRepository(DetallesUsuario);

export class Login {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const hashPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    let validar = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (validar.test(email) === false)
      return res.status(203).json({ msj: "Correo no válido" });

    const usuario = await usuarioRepo.findOne({
      where: {
        email,
        password: hashPassword,
        active: 1,
      },
      attributes: [
        "id_usuario",
        "email",
        "created_at",
      ],
      include: [
        {
          model: detallesUsuarioRepo,
          attributes: [
            "id_detalles_usuario",
            "nombre",
            "apellidos",
            "domicilio",
            "telefono",
          ],
        },
        {
          model: tipoUsuarioRepo,
          attributes: ["id_tipos_usuario", "tipo_usuario"],
        },
      ],
    });

    if (!usuario)
      return res.status(201).json({ msj: "No se encuentra el usuario" });

    const token = jwt.sign({ usuario }, "secret", { expiresIn: "5h" });
    return res.status(200).json({ data: usuario, token });
  }
}
