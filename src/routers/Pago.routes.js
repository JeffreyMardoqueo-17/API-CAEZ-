import express from 'express';
import { obtenerTodosLosPagos, obtenerPagoPorID, crearPago, actualizarPago, eliminarPago } from '../controllers/Pago.controller';

const router = express.Router();

router.get('/pagos', obtenerTodosLosPagos);
router.get('/pagos/:id', obtenerTodosLosPagos);
router.post('/pagos', crearPago);
router.put('/pagos/:id', actualizarPago);
router.delete('/pagos/:id',eliminarPago);

export default router;
