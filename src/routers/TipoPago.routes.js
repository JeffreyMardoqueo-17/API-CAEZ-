import { Router } from 'express';
import { GetTiposPago, GetTipoPagoPorId, PostTipoPago, PutTipoPago, DeleteTipoPago, BuscarTipoPagoPorTexto} from '../controllers/TipoPago.controller';
import { ValidatePostTipoPago } from '../validators/TipoPago';

const route = Router();

// Rutas
route.get('/TiposPago', GetTiposPago);
route.get('/TiposPago/:id', GetTipoPagoPorId);
route.post('/TiposPago', PostTipoPago);
route.put('/TiposPago/:id', PutTipoPago);
route.delete('/TiposPago/:id', DeleteTipoPago);
route.post('/TiposPago/Buscar/', BuscarTipoPagoPorTexto)

export default route;