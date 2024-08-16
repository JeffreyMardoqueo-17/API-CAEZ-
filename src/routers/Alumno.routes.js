import express from 'express';
import { createAlumno, obtenerAlumnoPorID, obtenerTodosLosAlumnos } from '../controllers/Alumno.controller';
import { validateToken } from '../helpers/JWT';


const router = express.Router();

router.post('/alumnos', createAlumno); //listo
router.get('/alumnos', obtenerTodosLosAlumnos) //Listo
router.get('/alumnos/:id', obtenerAlumnoPorID); //listo

export default router;
