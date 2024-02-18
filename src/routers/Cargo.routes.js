import { Router } from 'express';
import { GetCargos, GetCargoPorId, PostCargo, PutCargo, DeleteCargo } from '../controllers/Cargo.controller';

const route = Router();

route.get('/Cargos', GetCargos);
route.get('/Cargos/:id', GetCargoPorId);
route.post('/Cargos', PostCargo);
route.put('/Cargos/:id', PutCargo);
route.delete('/Cargos/:id', DeleteCargo);

export default route;
