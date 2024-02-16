import express from 'express'
import configuracion from './configuracion';
// //rutas
import CargosControllers from './routers/Cargo.routes'; //ruta de cargo
import TipoPago from './routers/TipoPago.routes'; ///RUTAS TIPO PAGO 



let port = 8000;
const app = express();
app.set('port', configuracion.port)


app.use(CargosControllers); //Usar las rutas de CargoRouter
// app.use(Grado); //Usar las rutas de Grado
app.use(TipoPago);// Usar las rutas de TipoPago

export default app;