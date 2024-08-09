import express from 'express';
import { GetEnfermedades, GetEnfermedadPorId, PostEnfermedad, PutEnfermedad, DeleteEnfermedad } from '../controllers/Enfermedad.controller';
import { validateToken } from '../helpers/JWT';
import { ValidateUpdateEnfermedad } from '../validators/Enfermedad.validator'

const router = express.Router();

router.get('/enfermedad', GetEnfermedades);
router.get('/enfermedad/:id', GetEnfermedadPorId);
router.post('/enfermedad', PostEnfermedad);
router.put('/enfermedad/:id', PutEnfermedad);
router.delete('/enfermedad/:id', DeleteEnfermedad);

export default router;