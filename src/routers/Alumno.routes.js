import express from 'express';
import { createAlumno, deleteAlumno, obtenerAlumnoPorID, obtenerTodosLosAlumnos, updateAlumno } from '../controllers/Alumno.controller';
import { validateToken } from '../helpers/JWT';


const router = express.Router();

router.post('/alumnos', createAlumno); //listo
router.get('/alumnos', obtenerTodosLosAlumnos) //Listo
router.get('/alumnos/:id', obtenerAlumnoPorID); //listo
router.put('/alumnos/:id', updateAlumno); //listo
router.delete('/alumnos/:id', deleteAlumno); //listo

export default router;
