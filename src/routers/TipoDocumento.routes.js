import { Router } from 'express';
import { GetTiposDocumento, GetTipoDocumentoPorId, PostTipoDocumento, PutTipoDocumento, DeleteTipoDocumento, BuscarTipoDocumentoPorTexto } from '../controllers/TipoDocumento.controller';
import { validateToken } from '../helpers/JWT';
import {ValidateCreateTipoDoc, ValidateUpdateTipoDoc} from '../validators/TipoDocumento.validator'

const route = Router();

// Rutas
route.get('/TiposDocumento',validateToken, GetTiposDocumento);
route.get('/TiposDocumento/:id', validateToken, GetTipoDocumentoPorId);
route.post('/TiposDocumento',ValidateCreateTipoDoc,validateToken, PostTipoDocumento);
route.put('/TiposDocumento/:id',ValidateUpdateTipoDoc, validateToken, PutTipoDocumento);
route.delete('/TiposDocumento/:id', validateToken, DeleteTipoDocumento);
route.post('/TiposDocumento/Buscar/', validateToken, BuscarTipoDocumentoPorTexto) // Aquí está la ruta corregida

export default route;