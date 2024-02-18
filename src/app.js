import express from 'express';
import configuracion from './configuracion';
import ParentezcoRouter from './routers/Parentezco.routes'; // Importa el enrutador de Parentezco
import TurnoRputer from './routers/Turno.routes'
import GradoRouter from './routers/Grado.routes'
import TipoDocumentos from './routers/TipoDocumento.routes'
import TipoPago from './routers/TipoPago.routes'
import Mes from './routers/Mes.routes'


const app = express();
const port = configuracion.port; // Define la variable port utilizando const

app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use(ParentezcoRouter); //parentezco Router
app.use(TurnoRputer) //turno
app.use(GradoRouter)//grado
app.use(TipoDocumentos) //tipo doc
app.use(TipoPago) //tipo pago
app.use(Mes) //mes

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

export default app;
