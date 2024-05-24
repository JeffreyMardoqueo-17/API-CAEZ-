import express from 'express';
import {createAlumno, getAlumnos, getAlumnosPorGrados, getAlumnosbyID} from '../controllers/Alumno.controller';

const router = express.Router();

// router.post('/alumnos', createAlumno);
router.get('/alumnos', getAlumnos)
router.post('/alumnosPorGrado', getAlumnosPorGrados);
router.get('/alumnos/:id', getAlumnosbyID);
export default router;