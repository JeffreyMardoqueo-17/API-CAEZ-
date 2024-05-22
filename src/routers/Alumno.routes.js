import express from 'express';
import {createAlumno, getAlumnosPorGrados} from '../controllers/Alumno.controller';

const router = express.Router();

// router.post('/alumnos', createAlumno);
router.post('/alumnosPorGrado', getAlumnosPorGrados);
export default router;