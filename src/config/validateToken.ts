import jwt from 'jsonwebtoken';

export function validateToken(req: any, res: any, next: any) {
   const bearerHeader = req.headers['authorization'];
   if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      // console.log(jwt.decode(bearerToken));
      jwt.verify(bearerToken, 'mysecret', (err: any, data: any) => {
         if (err) {
            res.status(403).json({ msg: 'No está autorizado para esta operación' });
         } else {
            next();
         }
      })
   } else {
      res.status(404).json({ msg: 'A ocurrido un error en la autenticacion' });
   }
}

export function decryptToken(req: any) {
   const bearerHeader = req.headers['authorization'];
   const bearer = bearerHeader.split(' ');
   const bearerToken = bearer[1];
   const token = jwt.decode(bearerToken);
   if (token !== null) {
      // console.log(token);
      return token;
   }
   return null;
}