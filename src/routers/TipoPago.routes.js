import { Router } from 'express';
import { GetTiposPago, GetTipoPagoPorId, PostTipoPago, PutTipoPago, DeleteTipoPago, BuscarTipoPagoPorTexto} from '../controllers/TipoPago.controller';
import { ValidatePostTipoPago } from '../validators/TipoPago';
import { validateToken } from '../helpers/JWT';

const route = Router();

// Rutas
route.get('/TiposPago', validateToken, GetTiposPago);
route.get('/TiposPago/:id', validateToken,GetTipoPagoPorId);
route.post('/TiposPago', validateToken, PostTipoPago);
route.put('/TiposPago/:id',validateToken, PutTipoPago);
route.delete('/TiposPago/:id',validateToken, DeleteTipoPago);
route.post('/TiposPago/Buscar/',validateToken, BuscarTipoPagoPorTexto)

export default route;