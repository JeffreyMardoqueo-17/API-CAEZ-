import { Router } from 'express';
import { GetTiposPago, GetTipoPagoPorId, PostTipoPago, PutTipoPago, DeleteTipoPago } from '../controllers/TipoPago.controller';
import { ValidateCreateTipoPago, ValidateUpdateTipoPago } from '../validators/TipoPago.validator';
import { validateToken } from '../helpers/JWT';

const route = Router();

// Rutas
route.get('/TiposPago', GetTiposPago);
route.get('/TiposPago/:id', GetTipoPagoPorId);
route.post('/TiposPago', ValidateCreateTipoPago, PostTipoPago);
route.put('/TiposPago/:id', ValidateUpdateTipoPago, PutTipoPago);
route.delete('/TiposPago/:id', DeleteTipoPago);
// route.post('/TiposPago/Buscar/',validateToken, BuscarTipoPagoPorTexto)

export default route; 