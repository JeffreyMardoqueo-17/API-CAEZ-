import { Router } from "express";
import { GetDirecciones, GetDireccionPorId, PostDireccion, DeleteDireccion, PutDireccion, BuscarDireccionesPorTexto} from '../controllers/Direcciones.controller'

const route = Router();

route.get('/Direcciones', GetDirecciones);
route.get('/Direcciones/:id', GetDireccionPorId);
route.post('/Direcciones',PostDireccion);
route.delete('/Direcciones/:id', DeleteDireccion);
route.put('/Direcciones/:id', PutDireccion);
route.post('/Direcciones/Buscar', BuscarDireccionesPorTexto);

export default route;