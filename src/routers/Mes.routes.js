import { Router } from 'express';
import { GetMesPorNombre, GetMeses, BuscarMesPorTexto } from '../controllers/Mes.controller';

const route = Router();

// Rutas
route.get('/Meses/', GetMeses);
route.get('/Meses/:nombre', GetMesPorNombre);
route.post('/Meses/Buscar', BuscarMesPorTexto);
export default route;