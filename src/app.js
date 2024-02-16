import express from 'express'
import configuracion from './configuracion';

let port = 8000;
const app = express();
app.set('port', configuracion.port)

export default app;