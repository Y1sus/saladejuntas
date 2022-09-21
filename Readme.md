## Tabla de contenido

- [Tabla de contenido](#tabla-de-contenido)
- [Información general](#información-general)
- [API](#api)
  - [Capturas](#capturas)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Autores](#autores)
- [FAQ's](#faqs)
- [Licencia](#licencia)

## Información general

---

Este proyecto consiste en una aplicación que permite reservar una sala de juntas con un horario específico, para ello se debe ingresar el salón que se desea reservar, la hora de inicio y la hora de fin. La aplicación permite ver las reservaciones que se han realizado por el mismo usuario, teniendo la opción de terminar la reservación, o de eliminarla.
Así como las mismas reservaciones se terminan de manera automática cuando se acaba el tiempo de la reservación.

Este proyecto en específico funciona como la parte del backend de la aplicación, el cual se encarga de recibir las peticiones del frontend y de enviar las respuestas correspondientes. Para ello se utilizó el framework de Express de Node.js, el cual permite crear un servidor web que recibe las peticiones y las responde con la información solicitada. Para la base de datos se utilizó MySQL, el cual permite almacenar la información de las reservaciones y de los usuarios. Para la comunicación entre el servidor y la base de datos se utilizó el ORM Sequelize, el cual permite realizar las consultas a la base de datos de una manera más sencilla y eficiente.
También se está utilizando la base de datos MongoDB, la cual se utiliza para almacenar las peticiones que se hacen a la API, para poder tener un registro de las mismas y poder analizarlas en caso de ser necesario.

Una de las formas que se pensó para la ejecución de la aplicación es utilizar Docker, el cual permite crear contenedores que contienen la aplicación y sus dependencias, de esta manera se puede ejecutar la aplicación en cualquier sistema operativo sin tener que instalar las dependencias necesarias. Para la creación de los contenedores se utilizó Docker Compose, el cual permite crear los contenedores de manera más sencilla y eficiente.

La información que se provee a través de la API se encuentra en formato JSON, el cual es un formato de intercambio de datos que se utiliza para la comunicación entre aplicaciones. Este formato permite que la información se pueda enviar y recibir de manera sencilla y eficiente, además de que es un formato que se puede leer de manera sencilla por cualquier lenguaje de programación.

Al igual que para cualquier petición que se hace a la API, debe de tener un token de autenticación, el cual se obtiene al iniciar sesión en la aplicación. Este token se debe de enviar en el header de la petición, de la siguiente manera:

```
Authorization: Bearer <token>
```

Para poder obtener el token se debe de hacer una petición POST a la ruta `/api/login`, la cual recibe como parámetros el correo y la contraseña del usuario. En caso de no contar con las credenciales, se puede crear un usuario nuevo en la ruta `/api/registro` enviando la siguiente información:

```
{
	nombre: "nombre",
	apellidos: "apellidos",
	domicilio: "domicilio",
	telefono: "telefono",
	edad: edad,
	email: "email@email.com",
	password: "password"
}
```

## API

Si la petición es exitosa, se tendrá un usuario creado y se podrá iniciar sesión con las credenciales del usuario.
Si la información es correcta, se obtiene el token de autenticación, el cual se debe de enviar en el header de las siguientes peticiones generales:

- **GET** /api/salon: Obtiene la lista de salones disponibles.
- **POST** /api/salon/create: Cra un nuevo salón.
- **POST** /api/salon/liberar/:id_salon: Libera un salón.
- **POST** /api/salon/ocupar/:id_salon: Ocupa un salón.
- **GET** /api/reservacion: Obtiene la lista de reservaciones actuales del usuario.
- **POST** /api/reservacion/create: Crea una nueva reservación.
- **POST** /api/reservacion/finish/:id_reservacion: Termina una reservación.

### Capturas

<div align="center">

<img src="https://user-images.githubusercontent.com/8833858/190925052-1b839cb7-45f6-483b-a509-7fef0287bb14.png"  align="left" width="500px" height="300px" />

<img src="https://user-images.githubusercontent.com/8833858/190925099-c61dfebb-30b5-45cf-aa84-1bf794917571.png" align="right" width="500px" height="300px"/>

<img src="https://user-images.githubusercontent.com/8833858/190925345-9bdf39c7-e4cf-4703-aaee-eea9a8b349a3.png" width="500px" height="300px" style="margin-top:15px"/>
</div>

## Tecnologías

---

Una lista de tecnologías utilizadas dentro del proyecto:

- [NodeJS](https://nodejs.org/en/about/): Version 18.4.0
- [Express](http://expressjs.com/en/guide/routing.html): Version 4.18.1
- [Sequelize](https://sequelize.org/api/v6/identifiers): Version 6.21.6
- [MySQL](https://www.mysql.com/): Version 8.0.26
- [MongoDB](https://www.mongodb.com/): Version 5.0.9
- [JWT](https://jwt.io/): Version 8.5.1
- [Docker](https://www.docker.com/): Version 20.10.17

## Instalación

---

Para poder correr el proyecto se debe tener instalado Docker y Docker Compose.
A continuación se muestran los pasos para poder correr el proyecto:

```
$ git clone https://github.com/Y1sus/saladejuntas-api.git
$ cd saladejuntas-api
$ docker-compose up -d --build
$ docker cp .\saladejuntas.sql\<file>.sql  saladejuntas-api:file.sql
$ docker exec -it saladejuntas-api bash
$ mysql -u root -p saladejuntas < file.sql
```

Si todo va bien, la aplicación se estará ejecutando en el puerto 4000.
Para poder probar la API, ingresar al navegador en la siguiente ruta: `http://localhost:4000/` y se podrá ver un mensaje de bienvenida.
Como en la siguiente imagen:

<div align="center">

<img src="https://user-images.githubusercontent.com/8833858/190925738-b85c664f-36bd-48ef-a12f-a0de6bba79bc.png"/>

</div>

Las rutas de la API se encuentran en la sección de [API](#api).

## Autores

---

[@Jesús Montalvo](https://github.com/Y1sus/)

## FAQ's

---

1. **¿Cómo puedo contribuir al proyecto?**

   - Puedes contribuir al proyecto haciendo un fork del repositorio y creando un pull request con tus cambios.

2. **¿Cómo puedo contactar al autor?**

   - Puedes contactar al autor a través de su correo electrónico:
     ```
     chuy_ronald@hotmail.com
     ```

3. **¿Cómo puedo reportar un error o sugerencia?**

   - Puedes reportar un error o sugerencia a través de la sección de [issues](https://github.com/Y1sus/saladejuntas-api/issues "issues") del repositorio.

## Licencia

---

[MIT](https://choosealicense.com/licenses/mit/)
