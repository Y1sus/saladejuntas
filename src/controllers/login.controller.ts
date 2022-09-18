import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario.model";
import { sequelize } from "../database/database";
import { TiposUsuario } from "../models/tipos_usuario.model";
import { DetallesUsuario } from "../models/detalles_usuario.model";

// creamos las variables que se encargan de almacenar la conexión a la base de datos y el repositorio de las tablas de la base de datos
// que vamos a usar en este controlador.
const usuarioRepo = sequelize.getRepository(Usuario);
const tipoUsuarioRepo = sequelize.getRepository(TiposUsuario);
const detallesUsuarioRepo = sequelize.getRepository(DetallesUsuario);

// la clase Login es la encargada de manejar las peticiones que se hacen a la ruta /login
// y valida que el usuario que está haciendo la petición tenga los permisos necesarios para
// acceder al sistema.
export class Login {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    // con la librería crypto, encriptamos la contraseña que nos envía el cliente para
    // compararla con la contraseña que tenemos en la base de datos.
    // pasando un algoritmo de encriptación sha256
    const hashPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    // esta variable contiene una expresión regular que se usa para validar que el email que nos envía el cliente
    // tenga el formato correcto.
    let validar = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (validar.test(email) === false)
      return res.status(203).json({ msj: "Correo no válido" });

    // con la función findOne() del repositorio de la tabla usuarios, buscamos el usuario que tenga el email que nos envía el cliente
    // y que tenga la contraseña encriptada que tenemos en la base de datos.
    // considerando que el usuario esté activo.
    const usuario = await usuarioRepo.findOne({
      where: {
        email,
        password: hashPassword,
        active: 1,
      },
      // con el parámetro attributes le decimos que nos devuelva solo los campos que necesitamos.
      attributes: ["id_usuario", "email", "created_at"],
      // con el parámetro include le decimos que nos devuelva los datos del tipo de usuario y los datos del usuario.
      // pero solo los datos que necesitamos.
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
          // al igual que el anterior, con el parámetro attributes le decimos que nos devuelva solo los campos que necesitamos.
          model: tipoUsuarioRepo,
          attributes: ["id_tipos_usuario", "tipo_usuario"],
        },
      ],
    });

    if (!usuario)
      return res.status(201).json({ msj: "No se encuentra el usuario" });

    // con la función sign() de la librería jsonwebtoken, creamos el token que se va a enviar al cliente.
    // pasando como parámetros el objeto que contiene los datos del usuario, la contraseña que se usa para encriptar el token
    // y el tiempo de expiración del token. Que en este caso es de 5 horas.
    const token = jwt.sign({ usuario }, "8n&K9bHr3n7vWyBki5", {
      expiresIn: "5h",
    });
    // devolvemos el token y los datos del usuario.
    return res.status(200).json({ data: usuario, token });
  }
}
