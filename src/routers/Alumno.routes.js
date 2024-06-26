import express from 'express';
import {BuscarAlumnoPorNombre, createAlumno, deleteAlumno, getAlumnos, getAlumnosPorBecaStatus, getAlumnosPorGrupos, getAlumnosbyID, updateAlumno} from '../controllers/Alumno.controller';
import { validateToken } from '../helpers/JWT';


const router = express.Router();

router.post('/alumnos', createAlumno); //listo
router.get('/alumnos', validateToken, getAlumnos) //Listo
router.post('/alumnosPorGrupo', getAlumnosPorGrupos);  //LISTO
router.get('/alumnos/:id', getAlumnosbyID); //listo
router.delete('/alumnos/:id', deleteAlumno);  //LISTO
router.post('/alumnos/buscar/', BuscarAlumnoPorNombre); //listo 
router.post('/alumnos/becados', getAlumnosPorBecaStatus); //Listo
router.put('/alumnos/actualizar/:id', updateAlumno);

export default router;
