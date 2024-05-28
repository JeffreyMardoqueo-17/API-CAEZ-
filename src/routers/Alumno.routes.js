import express from 'express';
import {createAlumno, deleteAlumno, getAlumnos, getAlumnosPorGrados, getAlumnosbyID} from '../controllers/Alumno.controller';

const router = express.Router();

// router.post('/alumnos', createAlumno);
router.get('/alumnos', getAlumnos)
router.post('/alumnosPorGrado', getAlumnosPorGrados);
router.get('/alumnos/:id', getAlumnosbyID);
router.delete('/alumnos/:id', deleteAlumno);
export default router;