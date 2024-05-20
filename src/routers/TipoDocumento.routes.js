import { Router } from 'express';
import { GetTiposDocumento, GetTipoDocumentoPorId, PostTipoDocumento, PutTipoDocumento, DeleteTipoDocumento, BuscarTipoDocumentoPorTexto } from '../controllers/TipoDocumento.controller';
import { ValidatePostTipoDoc } from '../validators/TipoDocumento';
import { validateToken } from '../helpers/JWT';
const route = Router();

// Rutas
route.get('/TiposDocumento',validateToken, GetTiposDocumento);
route.get('/TiposDocumento/:id', validateToken, GetTipoDocumentoPorId);
route.post('/TiposDocumento',validateToken, PostTipoDocumento);
route.put('/TiposDocumento/:id', validateToken, PutTipoDocumento);
route.delete('/TiposDocumento/:id', validateToken, DeleteTipoDocumento);
route.post('/TiposDocumento/Buscar/', validateToken, BuscarTipoDocumentoPorTexto) // Aquí está la ruta corregida

export default route;