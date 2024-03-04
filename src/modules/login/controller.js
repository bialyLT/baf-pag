const jwt = require('jsonwebtoken');
const { getUser } = require('../../services/userService');
import fs from 'node:fs';

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // buscamos en la base de datos
    const user = await getUser(username);
    if (!user || password !== user.password) {
      return res.status(401).json({ success: false, message: 'Nombre de usuario o contraseña incorrectos' });
    }

    // Si las credenciales son correctas, firma un nuevo token
    const key = fs.readFileSync('./keys/private.pem');

    const payload = { id: user._id };

    const token = jwt.sign(payload, key, {
      expiresIn: '15m',
      algorithm: 'RS256'
    });

    // Envía el token al cliente
    res.json({ success: true, token });
  } catch (e) {
    next(e);
  }
};