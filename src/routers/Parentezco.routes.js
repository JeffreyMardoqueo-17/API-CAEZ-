import { Router } from "express";
import { GetParentezcos, GetParentezcoPorId, PostParentezco, DeleteParentezco, PutParentezco, BuscarParentezcoPorTexto } from '../controllers/Parentezco.controller';
import { validateToken } from '../helpers/JWT';
import {ValidateCreateParentezco, ValidateUpdateParentezco} from '../validators/Parentezco.validator'

const route = Router();

// Rutas
route.get('/Parentezcos', validateToken, GetParentezcos); 
route.get('/Parentezcos/:id', validateToken, GetParentezcoPorId);
route.post('/Parentezcos',ValidateCreateParentezco, validateToken, PostParentezco);
route.delete('/Parentezcos/:id', validateToken, DeleteParentezco); 
route.put('/Parentezcos/:id',ValidateUpdateParentezco, validateToken, PutParentezco); 
route.post('/Parentezcos/Buscar', validateToken, BuscarParentezcoPorTexto);

export default route;