import { Router } from 'express';
import { GetTiposPago, GetTipoPagoPorId, PostTipoPago, PutTipoPago, DeleteTipoPago, BuscarTipoPagoPorTexto} from '../controllers/TipoPago.controller';
import { ValidatePostTipoPago } from '../validators/TipoPago';

const route = Router();

// Rutas
route.get('/TiposPago', GetTiposPago);
route.get('/TiposPago/:id', GetTipoPagoPorId);
route.post('/TiposPago',ValidatePostTipoPago, PostTipoPago);
route.put('/TiposPago/:id', PutTipoPago);
route.delete('/TiposPago/:id', DeleteTipoPago);
route.get('TipoPago/Buscar/:textoBusqueda', BuscarTipoPagoPorTexto)

export default route;
