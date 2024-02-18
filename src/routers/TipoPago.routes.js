import { Router } from 'express';
import { GetTiposPago, GetTipoPagoPorId, PostTipoPago, PutTipoPago, DeleteTipoPago } from '../controllers/TipoPago.controller';

const route = Router();

// Rutas
route.get('/TiposPago', GetTiposPago);
route.get('/TiposPago/:id', GetTipoPagoPorId);
route.post('/TiposPago', PostTipoPago);
route.put('/TiposPago/:id', PutTipoPago);
route.delete('/TiposPago/:id', DeleteTipoPago);

export default route;
