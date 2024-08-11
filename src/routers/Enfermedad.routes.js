import express from 'express';
import { GetEnfermedades, GetEnfermedadPorId, PostEnfermedad, PutEnfermedad, DeleteEnfermedad } from '../controllers/Enfermedad.controller';
import { validateToken } from '../helpers/JWT';
import { ValidateCreateEnfermedad, ValidateUpdateEnfermedad } from '../validators/Enfermedad.validator'

const router = express.Router();

router.get('/enfermedad', GetEnfermedades);
router.get('/enfermedad/:id', GetEnfermedadPorId);
router.post('/enfermedad', ValidateCreateEnfermedad, PostEnfermedad);
router.put('/enfermedad/:id', ValidateUpdateEnfermedad, PutEnfermedad);
router.delete('/enfermedad/:id', DeleteEnfermedad);

export default router;