import express from 'express';
import { GetEnfermedades, GetEnfermedadPorId, PostEnfermedad, PutEnfermedad, DeleteEnfermedad,BuscarEnfermedadesPorTexto } from '../controllers/Enfermedad.controller';
import { validateToken } from '../helpers/JWT';
import {ValidateCreateEnfermedad, ValidateUpdateEnfermedad} from '../validators/Enfermedad.validator'

const router = express.Router();

router.get('/enfermedad',validateToken, GetEnfermedades);
router.get('/enfermedad/:id', validateToken, GetEnfermedadPorId);
router.post('/enfermedad',ValidateCreateEnfermedad, validateToken, PostEnfermedad);
router.put('/enfermedad/:id',ValidateUpdateEnfermedad,validateToken, PutEnfermedad);
router.delete('/enfermedad/:id',validateToken, DeleteEnfermedad);
router.post('/enfermedad/Buscar',validateToken, BuscarEnfermedadesPorTexto);

export default router;