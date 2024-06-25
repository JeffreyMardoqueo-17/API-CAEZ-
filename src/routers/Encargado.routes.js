import { Router } from 'express';
// import { GetEncargados, GetEncargadoPorId, PostEncargado, PutEncargado, DeleteEncargado } from '../controllers/Encargado.controller';
import encargado from '../controllers/Encargado.controller'
import { ValidatePutEncargado, ValidateSearchEncargados, ValidatePostEncargado } from '../validators/Encargado.validator'
import { getEncargados, getEncargadoById, createEncargado, deleteEncargado,buscarEncargadosPorNombre, updateEncargado} from '../controllers/Encargado.controller';
const route = Router();

route.get('/Encargados', getEncargados);//listo
route.get('/Encargados/:id', getEncargadoById);//listo
route.post('/Encargados', createEncargado);//listo
route.put('/Encargados/:id',updateEncargado);
route.delete('/Encargados/:id', deleteEncargado);//listo
route.post('/Encargados/buscar/', buscarEncargadosPorNombre) //listo

export default route;