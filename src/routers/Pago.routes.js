import express from 'express';
import { createPago } from '../controllers/Pago.controller';

const router = express.Router();

// router.get('/pagos', obtenerTodosLosPagos);
// router.get('/pagos/:id', obtenerPagoPorID);
router.post('/pagos', createPago);
// router.put('/pagos/:id', actualizarPago);
// router.delete('/pagos/:id',eliminarPago);

export default router;
