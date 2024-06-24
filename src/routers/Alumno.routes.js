import express from 'express';
import {BuscarAlumnoPorNombre, createAlumno, deleteAlumno, getAlumnos, getAlumnosPorBecaStatus, getAlumnosPorGrupos, getAlumnosbyID} from '../controllers/Alumno.controller';

const router = express.Router();

router.post('/alumnos', createAlumno); //listo
router.get('/alumnos', getAlumnos) //Listo
router.post('/alumnosPorGrupo', getAlumnosPorGrupos);  //LISTO
router.get('/alumnos/:id', getAlumnosbyID); //listo
router.delete('/alumnos/:id', deleteAlumno);  //LISTO
router.post('/alumnos/buscar/', BuscarAlumnoPorNombre); //listo 
router.post('/alumnos/becados', getAlumnosPorBecaStatus); //Listo
export default router;
