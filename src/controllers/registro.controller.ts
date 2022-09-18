import { Request, Response } from "express";
import crypto from "crypto";
import { sequelize } from "../database/database";
import { TiposUsuario } from "../models/tipos_usuario.model";
import { Usuario } from "../models/usuario.model";
import { DetallesUsuario } from "../models/detalles_usuario.model";

// creamos las variables que se encargan de almacenar la conexión a la base de datos y el repositorio de las tablas de la base de datos
const usuarioRepo = sequelize.getRepository(Usuario);
const tipoUsuarioRepo = sequelize.getRepository(TiposUsuario);
const detallesUsuarioRepo = sequelize.getRepository(DetallesUsuario);

export class Registro {
  // para la función registrar, solicitamos los datos que se necesitan para crear un nuevo usuario, en este caso son:
  // nombre, apellidos, domicilio, telefono, edad, email, password, id_tipo_usuario.
  // que vienen en el cuerpo de la petición.
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

    // con la librería crypto, encriptamos la contraseña que nos envía el cliente para
    // guardarla en la base de datos.
    const hashPass = crypto.createHash("sha256").update(password).digest("hex");

    // esta variable contiene una expresión regular que se usa para validar que el email que nos envía el cliente
    // tenga el formato correcto.
    const validarCorreo = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );

    // en caso de que no se envíe el tipo de usuario se asigna el tipo de usuario 2 que es el tipo de usuario normal,
    // ya que el tipo de usuario 1 es el tipo de usuario administrador.
    var tipo_usuario = id_tipo_usuario == undefined ? 2 : id_tipo_usuario;

    if (validarCorreo.test(email)) {
      // en caso de que el email tenga el formato correcto, buscamos en la base de datos si ya existe un usuario con el mismo email.
      await usuarioRepo
        .findOne({
          where: { email },
        })
        .then(async (usuario) => {
          if (!usuario) {
            // en caso de que no exista un usuario con el mismo email, creamos un nuevo usuario.
            // con los datos que nos envía el cliente. 

            const nuevoUsuarioDetalles = await detallesUsuarioRepo.create({
              nombre,
              apellidos,
              domicilio,
              telefono,
              edad,
            });
            if (nuevoUsuarioDetalles) {
              // si se crea el usuario en la tabla detalles_usuario, se crea el usuario en la tabla usuario.
              // con el id de los detalles creados anteriormente.
              await usuarioRepo
                .create({
                  id_detalles_usuario: nuevoUsuarioDetalles.id_detalles_usuario,
                  id_tipos_usuario: tipo_usuario,
                  email,
                  password: hashPass,
                  active: 1,
                })
                .then((createdUser) => {
                  // si todo sale bien, se envía un mensaje de éxito al cliente.
                  // con los datos del usuario creado.
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
