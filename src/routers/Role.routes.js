import express from "express";
import { GetRoles, GetRolPorId, PutRol, PostRol, DeleteRol } from '../controllers/Role';
import { validateToken } from '../helpers/JWT';

const route = express.Router();

route.get('/Role',validateToken, GetRoles);
route.get('/Role/:id', validateToken, GetRolPorId);
route.post('/Role', validateToken, PostRol);
route.put('/Role/:id',validateToken, PutRol);
route.delete('/Role/:id', validateToken, DeleteRol);

export default route;