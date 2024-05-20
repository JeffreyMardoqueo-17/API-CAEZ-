// Rutas para los grupos de alumnos
import { Router } from 'express';
import GrupoController from '../controllers/Grupos.controller';
import { validateToken } from '../helpers/JWT';
const router = Router();

router.get('/grupos',validateToken, GrupoController.getGrupos);
router.get('/grupos/:id', validateToken, GrupoController.getGrupoById);

export default router;
