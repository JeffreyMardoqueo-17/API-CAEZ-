import { Router } from 'express';
import { GetTiposDocumento, GetTipoDocumentoPorId, PostTipoDocumento, PutTipoDocumento, DeleteTipoDocumento, BuscarTipoDocumentoPorTexto } from '../controllers/TipoDocumento.controller';
import { ValidatePostTipoDoc } from '../validators/TipoDocumento';

const route = Router();

// Rutas
route.get('/TiposDocumento', GetTiposDocumento);
route.get('/TiposDocumento/:id', GetTipoDocumentoPorId);
route.post('/TiposDocumento',ValidatePostTipoDoc, PostTipoDocumento);
route.put('/TiposDocumento/:id', PutTipoDocumento);
route.delete('/TiposDocumento/:id', DeleteTipoDocumento);
route.post('/TiposDocumento/Buscar/', BuscarTipoDocumentoPorTexto) // Aquí está la ruta corregida

export default route;