require('@babel/register');
import express from 'express';
import cors from 'cors';
import * as _ from './config/env';
const path = require('node:path');

const publicacionRoutes = require('./modules/publications/routes');
const publicacionAdminRoutes = require('./modules/publications/adminRoutes');
const loginRoutes = require('./modules/login/routes');

import errorHandlerControllers from './middlewares/errorHandlerControllers';
import { auth } from './middlewares/auth';

const app = express();
const port = process.env.PORT ?? 8006;
const host = '0.0.0.0';
const { connectToDatabase } = require('./database/dbMongo');

app.use(cors());

app.use(express.json());

connectToDatabase();

if (process.env.NODE_ENV === 'production') {
  // Sirve los archivos estáticos desde el directorio build en producción
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}


// acceso para cualquier persona
app.use('/api/publicaciones', errorHandlerControllers, publicacionRoutes);

// iniciar sesion como admin
app.use('/admin-login', errorHandlerControllers, loginRoutes);

// solo la persona administradora puede ver esta ruta
app.use('/admin/publicaciones', auth, publicacionAdminRoutes);

app.use((_, res) => {
  res.sendStatus(404);
});
app.use((error, _, res) => {
  res.sendStatus(500);
});

app.listen(port, host, () => {
  console.info(`App listening on port ${port}`);
});
