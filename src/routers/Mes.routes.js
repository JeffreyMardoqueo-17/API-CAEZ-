import { Router } from 'express';
import { GetMesPorNombre, GetMeses} from '../controllers/Mes.controller';

const route = Router();

// Rutas
route.get('/Meses/:nombre', GetMesPorNombre);
route.get('/Meses/', GetMeses)

export default route;
