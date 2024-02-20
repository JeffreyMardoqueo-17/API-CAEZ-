import express from 'express';
import { GetAdministradores, GetAdministradorPorId, PostAdministrador, PutAdministrador, DeleteAdministrador, LoginAdministrador } from '../controllers/Administradores.controller';

const router = express.Router();

router.get('/administradores', GetAdministradores);
router.get('/administradores/:id', GetAdministradorPorId);
router.post('/administradores', PostAdministrador);
router.put('/administradores/:id', PutAdministrador);
router.delete('/administradores/:id', DeleteAdministrador);
router.post('/administradores/login', LoginAdministrador);

export default router;
