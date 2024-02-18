import { Router } from 'express';
import { GetMesPorNombre } from '../controllers/Mes.controller';

const route = Router();

// Rutas
route.get('/Meses/:nombre', GetMesPorNombre);

export default route;
