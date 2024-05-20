import express from 'express';
import { GetEnfermedades, GetEnfermedadPorId, PostEnfermedad, PutEnfermedad, DeleteEnfermedad,BuscarEnfermedadesPorTexto } from '../controllers/Enfermedad.controller';
import { validateToken } from '../helpers/JWT';

const router = express.Router();

router.get('/enfermedad',validateToken, GetEnfermedades);
router.get('/enfermedad/:id', validateToken, GetEnfermedadPorId);
router.post('/enfermedad', validateToken, PostEnfermedad);
router.put('/enfermedad/:id',validateToken, PutEnfermedad);
router.delete('/enfermedad/:id',validateToken, DeleteEnfermedad);
router.post('/enfermedad/Buscar',validateToken, BuscarEnfermedadesPorTexto);

export default router;