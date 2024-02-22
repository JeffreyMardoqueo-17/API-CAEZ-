import express from 'express';
import { GetPagos, GetPagoPorId, PostPago, PutPago, DeletePago } from '../controllers/Pago.controller';

const router = express.Router();

router.get('/pagos', GetPagos);
router.get('/pagos/:id', GetPagoPorId);
router.post('/pagos', PostPago);
router.put('/pagos/:id', PutPago);
router.delete('/pagos/:id', DeletePago);

export default router;
