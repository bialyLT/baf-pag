require('@babel/register');
import express from 'express';
import cors from 'cors';
import * as _ from './config/env';

import publicacionRoutes from './modules/publications/routes';
import errorHandlerControllers from './middlewares/errorHandlerControllers';
import { auth } from './middlewares/auth';

const app = express();
const port = process.env.PORT ?? 8006;
const host = '0.0.0.0';
const { connectToDatabase } = require('./database/dbMongo');

app.use(cors());

app.use(express.json());

connectToDatabase();

app.use(express.static("public"));

// cualquiera puede ver las publicaciones
app.use('/api/publicaciones', errorHandlerControllers, publicacionRoutes);

// solo la persona administradora puede ver esta ruta
app.use('/admin/publicaciones', errorHandlerControllers, auth, publicacionRoutes);

app.use((_, res) => {
  res.sendStatus(404);
});
app.use((error, _, res) => {
  res.sendStatus(500);
});

app.listen(port, host, () => {
  console.info(`App listening on port ${port}`);
});
console.error('Error starting the application:', error);
process.exit(1);
