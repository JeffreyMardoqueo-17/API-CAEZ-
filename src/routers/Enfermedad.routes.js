import express from 'express';
import { GetEnfermedades, GetEnfermedadPorId, PostEnfermedad, PutEnfermedad, DeleteEnfermedad,BuscarEnfermedadesPorTexto } from '../controllers/Enfermedad.controller';


const router = express.Router();

router.get('/enfermedad', GetEnfermedades);
router.get('/enfermedad/:id', GetEnfermedadPorId);
router.post('/enfermedad',PostEnfermedad);
router.put('/enfermedad/:id', PutEnfermedad);
router.delete('/enfermedad/:id', DeleteEnfermedad);
router.post('/enfermedad/Buscar', BuscarEnfermedadesPorTexto);

export default router;