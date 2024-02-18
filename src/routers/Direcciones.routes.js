import { Router } from "express";
import { GetDirecciones, GetDireccionPorId, PostDireccion, DeleteDireccion, PutDireccion, BuscarDireccionesPorNombre} from '../controllers/Direcciones.controller'

const route = Router();

route.get('/Direcciones', GetDirecciones);
route.get('/Direcciones/:id', GetDireccionPorId);
route.post('/Direcciones', PostDireccion);
route.delete('/Direcciones/:id', DeleteDireccion);
route.put('/Direcciones/:id', PutDireccion);
route.get('/Direcciones/Buscar/:textoBusqueda', BuscarDireccionesPorNombre);


export default route;
