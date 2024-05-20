import { Router } from "express";
import { GetDirecciones, GetDireccionPorId, PostDireccion, DeleteDireccion, PutDireccion, BuscarDireccionesPorTexto} from '../controllers/Direcciones.controller'
import { validateToken } from '../helpers/JWT';
import {ValidateCreateDireccion, ValidateUpdateDireccion} from '../validators/Direcciones';
const route = Router();

route.get('/Direcciones',validateToken, GetDirecciones);
route.get('/Direcciones/:id', validateToken, GetDireccionPorId);
route.post('/Direcciones',validateToken, ValidateCreateDireccion, PostDireccion);
route.delete('/Direcciones/:id',validateToken, DeleteDireccion);
route.put('/Direcciones/:id',validateToken, ValidateUpdateDireccion, PutDireccion);
route.post('/Direcciones/Buscar',validateToken, BuscarDireccionesPorTexto);

export default route;