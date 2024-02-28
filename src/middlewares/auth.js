const fs = require('fs');
const jwt = require('jsonwebtoken');

const key = fs.readFileSync('./keys/public.pem');

export const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [, token] = authorization.split(' ');
    const payload = jwt.verify(token, key);
    // agregar logica para comprobar que es admin el usuario ingresado
    req.usr = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};