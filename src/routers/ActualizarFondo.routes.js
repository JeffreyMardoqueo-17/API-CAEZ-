// Importar el controlador
import { ActualizarMontoFondo } from '../controllers/Fondo.controller';
import { Router } from "express";


const route = Router();


// Definir la ruta para actualizar el monto en tabla Fondo
route.put('/Fondo/ActualizarMonto', ActualizarMontoFondo);
