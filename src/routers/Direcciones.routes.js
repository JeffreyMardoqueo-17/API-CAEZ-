import { Router } from "express";
import { GetDirecciones, GetDireccionPorId, PostDireccion, DeleteDireccion, PutDireccion, BuscarDireccionesPorTexto} from '../controllers/Direcciones.controller'
import { ValidatePostDirecciones } from "../validators/Direcciones";

const route = Router();

route.get('/Direcciones', GetDirecciones);
route.get('/Direcciones/:id', GetDireccionPorId);
route.post('/Direcciones',ValidatePostDirecciones,PostDireccion);
route.delete('/Direcciones/:id', DeleteDireccion);
route.put('/Direcciones/:id', PutDireccion);
route.get('/Direcciones/Buscar/:textoBusqueda', BuscarDireccionesPorTexto);


export default route;