import express from "express";
import { GetRoles, GetRolPorId, PutRol, PostRol, DeleteRol } from '../controllers/Role';

const route = Router();

route.get('/Role', GetRoles);
route.get('/Role/:id', GetRolPorId);
route.post('/Role',PostRol);
route.put('/Role/:id', PutRol);
route.delete('/Role/:id', DeleteRol);

export default route;
