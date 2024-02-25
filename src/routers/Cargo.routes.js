import { Router } from 'express';
import { GetCargos, GetCargoPorId, PostCargo, PutCargo, DeleteCargo } from '../controllers/Cargo.controller';
import { ValidatePostCargo, ValidatePutCargo } from '../validators/Cargo';

const route = Router();

route.get('/Cargos', GetCargos);
route.get('/Cargos/:id', GetCargoPorId);
route.post('/Cargos',ValidatePostCargo,PostCargo);
route.put('/Cargos/:id',ValidatePutCargo, PutCargo);
route.delete('/Cargos/:id', DeleteCargo);

export default route;
