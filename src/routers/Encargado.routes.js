import { Router } from 'express';
// import { GetEncargados, GetEncargadoPorId, PostEncargado, PutEncargado, DeleteEncargado } from '../controllers/Encargado.controller';
import encargado from '../controllers/Encargado.controller'
import { ValidatePutEncargado, ValidatePostEncargado } from '../validators/Encargado.validator'
import EncargadoController from '../controllers/Encargado.controller';
import { getEncargados, getEncargadoById, createEncargado, deleteEncargado, buscarEncargadosPorNombre, updateEncargado } from '../controllers/Encargado.controller';

const route = Router();

route.get('/Encargados', EncargadoController.getEncargados);//listo
route.get('/Encargados/:id', EncargadoController.getEncargadoById);//listo
route.post('/Encargados', EncargadoController.createEncargado);//listo
route.put('/Encargados/:id', EncargadoController.updateEncargado);
route.delete('/Encargados/:id', EncargadoController.deleteEncargado);//listo
// route.post('/Encargados/buscar/', buscarEncargadosPorNombre) //listo

export default route;