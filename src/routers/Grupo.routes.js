// Rutas para los grupos de alumnos
import { Router } from 'express';
import GrupoController from '../controllers/Grupos.controller';

const router = Router();

router.get('/grupos', GrupoController.getGrupos);
router.get('/grupos/:id', GrupoController.getGrupoById);

export default router;
