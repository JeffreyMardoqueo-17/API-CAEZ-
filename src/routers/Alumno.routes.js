import express from 'express';
import { GetAlumnos, GetAlumnoPorId, PostAlumno, PutAlumno, DeleteAlumno } from '../controllers/Alumno.controller';

const router = express.Router();

router.get('/alumnos', GetAlumnos);
router.get('/alumnos/:id', GetAlumnoPorId);
router.post('/alumnos', PostAlumno);
router.put('/alumnos/:id', PutAlumno);
router.delete('/alumnos/:id', DeleteAlumno);

export default router;
