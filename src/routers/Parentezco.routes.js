import { Router } from "express";
import { GetParentezcos, GetParentezcoPorId, PostParentezco, DeleteParentezco, PutParentezco, BuscarParentezcoPorTexto } from '../controllers/Parentezco.controller';
import { validateToken } from '../helpers/JWT';

const route = Router();

// Rutas
route.get('/Parentezcos', validateToken, GetParentezcos); // Cambio de nombre a Parentezcos para obtener todos los parentezcos
route.get('/Parentezcos/:id', validateToken, GetParentezcoPorId); // Cambio de ruta para obtener un parentezco por su ID
route.post('/Parentezcos', validateToken, PostParentezco);
route.delete('/Parentezcos/:id', validateToken, DeleteParentezco); // Cambio de ruta para eliminar un parentezco por su ID
route.put('/Parentezcos/:id', validateToken, PutParentezco); 
route.post('/Parentezcos/Buscar', validateToken, BuscarParentezcoPorTexto);

export default route;