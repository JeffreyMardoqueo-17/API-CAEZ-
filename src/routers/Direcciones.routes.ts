const express = require("express");
const { GetDirecciones, GetDireccionPorId, PostDireccion, DeleteDireccion, PutDireccion, BuscarDireccionesPorTexto } = require('../controllers/Direcciones.controller');
const { ValidatePostDirecciones } = require("../validators/Direcciones");

const route = express.Router();


route.get('/Direcciones', GetDirecciones);
route.get('/Direcciones/:id', GetDireccionPorId);
route.post('/Direcciones',ValidatePostDirecciones,PostDireccion);
route.delete('/Direcciones/:id', DeleteDireccion);
route.put('/Direcciones/:id', PutDireccion);
route.get('/Direcciones/Buscar/:textoBusqueda', BuscarDireccionesPorTexto);


module.exports = route;