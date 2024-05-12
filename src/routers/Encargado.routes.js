import { Router } from 'express';
// import { GetEncargados, GetEncargadoPorId, PostEncargado, PutEncargado, DeleteEncargado } from '../controllers/Encargado.controller';
import encargo from '../controllers/Encargado.controller'

const route = Router();

route.get('/Encargados', encargo.getAllEncargados);
route.get('/Encargados/:id', encargo.getEncargadoById);
route.post('/Encargados', encargo.createEncargado);
route.put('/Encargados/:id', encargo.updateEncargado);
route.delete('/Encargados/:id', encargo.deleteEncargado);
route.get('/Encargado/buscar/:nombre', encargo.searchEncargadoByName)

export default route;
