import express from 'express';
import { GetAdministradores, GetAdministradorPorId, PostAdministrador, PutAdministrador, DeleteAdministrador, LoginAdministrador } from '../controllers/Administradores.controller';
import { ValidatePostAdministrador, ValidatePutAdministrador } from '../validators/Administradores';
import { verifyToken } from '../helpers/jwt'; // Importa la función verifyToken

const router = express.Router();

// Rutas públicas
router.post('/administradores/login', LoginAdministrador);
// Middleware para verificar el token antes de acceder a las rutas protegidas
router.use((req, res, next) => {
    const token = req.headers.authorization;

    try {
        const decodedToken = verifyToken(token);
        req.adminId = decodedToken.adminId; // Agrega el id del administrador al objeto de solicitud para su uso en los controladores
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token inválido' });
    }
});

// Rutas protegidas que requieren autenticación
router.get('/administradores', GetAdministradores);
router.get('/administradores/:id', GetAdministradorPorId);
router.post('/administradores', ValidatePostAdministrador, PostAdministrador);
router.put('/administradores/:id', ValidatePutAdministrador,PutAdministrador);
router.delete('/administradores/:id', DeleteAdministrador);

export default router;
