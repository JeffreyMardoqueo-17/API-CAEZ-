import { Router } from 'express';
import { GetGrados, GetGradoPorId, PostGrado, PutGrado, DeleteGrado } from '../controllers/Grado.controller';
import { ValidateCreateGrado, ValidateUpdateGrado } from '../validators/Grado.validator';
import { validateToken } from '../helpers/JWT';

const router = Router();

router.get('/Grados', validateToken, GetGrados);
router.get('/Grados/:id', validateToken, GetGradoPorId);
router.post('/Grados',ValidateCreateGrado, validateToken, PostGrado);
router.put('/Grados/:id',ValidateUpdateGrado,validateToken, PutGrado);
router.delete('/Grados/:id',validateToken, DeleteGrado);

export default router;
