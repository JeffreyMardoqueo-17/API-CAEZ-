import express from 'express';
import {BuscarAlumnoPorNombre, createAlumno, deleteAlumno, getAlumnos, getAlumnosPorBeca, getAlumnosPorGrupos, getAlumnosbyID} from '../controllers/Alumno.controller';

const router = express.Router();

router.post('/alumnos', createAlumno); //listo
router.get('/alumnos', getAlumnos) //Listo
router.post('/alumnosPorGrupo', getAlumnosPorGrupos); 
router.get('/alumnos/:id', getAlumnosbyID); //listo
router.delete('/alumnos/:id', deleteAlumno); 
router.post('/alumnos/buscar/', BuscarAlumnoPorNombre);
router.get('/alumnos/becados', getAlumnosPorBeca);
export default router;