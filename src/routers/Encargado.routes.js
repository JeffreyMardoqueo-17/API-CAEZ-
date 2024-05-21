import { Router } from 'express';
// import { GetEncargados, GetEncargadoPorId, PostEncargado, PutEncargado, DeleteEncargado } from '../controllers/Encargado.controller';
import encargado from '../controllers/Encargado.controller'
import { ValidatePutEncargado, ValidateSearchEncargados, ValidatePostEncargado } from '../validators/Encargado.validator'
const route = Router();

route.get('/Encargados', encargado.getEncargados);
route.get('/Encargados/:id', encargado.getEncargadoById);
route.post('/Encargados', ValidatePostEncargado,encargado.createEncargado);
route.put('/Encargados/:id', ValidatePutEncargado,encargado.updateEncargado);
route.delete('/Encargados/:id', encargado.deleteEncargado);
route.post('/Encargados/buscar/',ValidateSearchEncargados, encargado.searchEncargados)

export default route;