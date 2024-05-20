import { Router } from "express";
import { GetTurnos, GetTurnoPorId, PostTurno, DeleteTurno, PutTurno } from '../controllers/Turno.controller'; // Importa los controladores del Turno
import { ValidatePostTurno } from "../validators/Turno";
import { validateToken } from '../helpers/JWT';

const route = Router();

// Rutas
route.get('/Turnos', validateToken, GetTurnos); // Ruta para obtener todos los turnos
route.get('/Turnos/:id', validateToken, GetTurnoPorId); // Ruta para obtener un turno por su ID
route.post('/Turnos',ValidatePostTurno, validateToken, PostTurno); // Ruta para insertar un nuevo turno
route.delete('/Turnos/:id', validateToken, DeleteTurno); // Ruta para eliminar un turno por su ID
route.put('/Turnos/:id',validateToken, PutTurno); // Ruta para actualizar un turno por su ID

export default route;
