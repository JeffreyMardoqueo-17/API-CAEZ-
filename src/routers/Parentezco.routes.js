import { Router } from "express";
import { } from '../controllers/Padrino.controller'
import { GetParentezcos, DeleteParentezco, PutParentezco, PostParentezco, GetParentezcoPorId } from "../controllers/Parentezco.controller";
import { validateToken } from '../helpers/JWT';
import { ValidateCreateParentezco, ValidateUpdateParentezco } from '../validators/Parentezco.validator'

const route = Router();

// Rutas
// route.get('/Parentezcos', validateToken, GetParentezcos); 
// route.get('/Parentezcos/:id', validateToken, GetParentezcoPorId);
// route.post('/Parentezcos',ValidateCreateParentezco, validateToken, PostParentezco);
// route.delete('/Parentezcos/:id', validateToken, DeleteParentezco); 
// route.put('/Parentezcos/:id',ValidateUpdateParentezco, validateToken, PutParentezco); 
// route.post('/Parentezcos/Buscar', validateToken, BuscarParentezcoPorTexto);

route.get('/Parentezcos', GetParentezcos);
route.get('/Parentezcos/:id', GetParentezcoPorId);
route.post('/Parentezcos', ValidateCreateParentezco, PostParentezco);
route.delete('/Parentezcos/:id', DeleteParentezco);
route.put('/Parentezcos/:id', ValidateUpdateParentezco, PutParentezco);


export default route;