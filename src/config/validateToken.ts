import jwt from "jsonwebtoken";

// con esta función validamos el token que nos envía el cliente para saber si es válido o no.
// en caso de que el token sea válido, se permite el acceso a la ruta, en caso de que el token no sea válido, se envía un mensaje de error al cliente.
export function validateToken(req: any, res: any, next: any) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    // console.log(jwt.decode(bearerToken));
    jwt.verify(bearerToken, "8n&K9bHr3n7vWyBki5", (err: any, data: any) => {
      if (err) {
        res.status(403).json({ msg: "No está autorizado para esta operación" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({ msg: "A ocurrido un error en la autenticación" });
  }
}

// la siguiente función se usa para desencriptar el token y obtener los
// datos del usuario que está haciendo la petición.
export function decryptToken(req: any) {
  const bearerHeader = req.headers["authorization"];
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  const token = jwt.decode(bearerToken);
  if (token !== null) {
    return token;
  }
  return null;
}
