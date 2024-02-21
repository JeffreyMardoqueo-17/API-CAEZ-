import { Router } from 'express';
import { GetEncargados, GetEncargadoPorId, PostEncargado, PutEncargado, DeleteEncargado } from '../controllers/Encargado.controller';

const route = Router();

route.get('/Encargados', GetEncargados);
route.get('/Encargados/:id', GetEncargadoPorId);
route.post('/Encargados', PostEncargado);
route.put('/Encargados/:id', PutEncargado);
route.delete('/Encargados/:id', DeleteEncargado);

export default route;
