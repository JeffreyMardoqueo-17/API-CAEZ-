import express from 'express';
import {BuscarAlumnoPorNombre, createAlumno, deleteAlumno, getAlumnos, getAlumnosPorGrado, getAlumnosPorGrados, getAlumnosbyID} from '../controllers/Alumno.controller';

const router = express.Router();

// router.post('/alumnos', createAlumno);
router.get('/alumnos', getAlumnos)
router.post('/alumnosPorGrado', getAlumnosPorGrados);
router.get('/alumnos/:id', getAlumnosbyID);
router.delete('/alumnos/:id', deleteAlumno);
router.post('/alumnos/buscar/', BuscarAlumnoPorNombre);
router.post('/alumnos/buscar/grado', getAlumnosPorGrado)
export default router;