import express from 'express';
import alumno from '../controllers/Alumno.controller';

const router = express.Router();

router.get('/alumnos', alumno.obtenerTodosLosAlumnos);
router.get('/alumnos/:id', alumno.obtenerAlumnoPorId);
router.post('/alumnos', alumno.crearAlumno);
router.put('/alumnos/:id', alumno.modificarAlumno);
router.delete('/alumnos/:id', alumno.eliminarAlumno);
router.get('alumnos/buscar/:nombre', alumno.buscarAlumnosPorNombre);
router.get('alumnos/buscar/:idgrado', alumno.buscarAlumnosPorGrado);


export default router;
