import { Router } from "express";
import { GetParentezcos, GetParentezcoPorId, PostParentezco, DeleteParentezco, PutParentezco } from '../controllers/Parentezco.controller';


const route = Router();

// Rutas
route.get('/Parentezcos', GetParentezcos); // Cambio de nombre a Parentezcos para obtener todos los parentezcos
route.get('/Parentezcos/:id', GetParentezcoPorId); // Cambio de ruta para obtener un parentezco por su ID
route.post('/Parentezcos', PostParentezco);
route.delete('/Parentezcos/:id', DeleteParentezco); // Cambio de ruta para eliminar un parentezco por su ID
route.put('/Parentezcos/:id', PutParentezco); // Cambio de ruta para actualizar un parentezco por su ID

export default route;