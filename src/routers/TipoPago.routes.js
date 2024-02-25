import { Router } from 'express';
import { GetTiposPago, GetTipoPagoPorId, PostTipoPago, PutTipoPago, DeleteTipoPago } from '../controllers/TipoPago.controller';
import { ValidatePostTipoPago, ValidatePutTipoPago } from '../validators/TipoPago';

const route = Router();

// Rutas
route.get('/TiposPago', GetTiposPago);
route.get('/TiposPago/:id', GetTipoPagoPorId);
route.post('/TiposPago',ValidatePostTipoPago, PostTipoPago);
route.put('/TiposPago/:id',ValidatePutTipoPago, PutTipoPago);
route.delete('/TiposPago/:id', DeleteTipoPago);

export default route;
