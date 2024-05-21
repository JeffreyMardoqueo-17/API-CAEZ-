import express from 'express';
import configuracion from './configuracion';
import ParentezcoRouter from './routers/Parentezco.routes'; // Importa el enrutador de Parentezco
import TurnoRputer from './routers/Turno.routes'
import GradoRouter from './routers/Grado.routes'
import TipoDocumentos from './routers/TipoDocumento.routes'
import TipoPago from './routers/TipoPago.routes'
import Mes from './routers/Mes.routes'
import Direcciones from './routers/Direcciones.routes'
// import Administradores from './routers/Administradores.routes'
import Encargados from './routers/Encargado.routes'
import Alumnos from './routers/Alumno.routes'
import Pagos from './routers/Pago.routes'
import Facturas from './routers/Facturas.routes'
import Enfermedad from './routers/Enfermedad.routes'
import Role from './routers/Role.routes'
import User from './routers/User.routes'
import padrinoRouter from './routers/Padrino.routes';

const app = express();
const port = configuracion.port; // Define la variable port utilizando const

app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(ParentezcoRouter); //parentezco Router
app.use(TurnoRputer) //turno
app.use(GradoRouter)//grado
app.use(TipoDocumentos) //tipo doc
app.use(TipoPago) //tipo pago
app.use(Mes) //mes
app.use(Direcciones);//direcciones
app.use(Encargados);
app.use(Alumnos);
app.use(Pagos);
app.use(Facturas);
app.use(Enfermedad);
app.use(Role);
app.use(User)
app.use(padrinoRouter)
// app.use(ActualizarFondo);//actualizar fondo 
// app.use(Administradires);


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

export default app;
