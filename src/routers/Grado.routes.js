import { Router } from 'express';
import { GetGrados, GetGradoPorId, PostGrado, PutGrado, DeleteGrado } from '../controllers/Grado.controller';
import { ValidatePostGrado } from '../validators/Grado';

const router = Router();

router.get('/Grados', GetGrados);
router.get('/Grados/:id', GetGradoPorId);
router.post('/Grados', PostGrado);
router.put('/Grados/:id', PutGrado);
router.delete('/Grados/:id', DeleteGrado);

export default router;
