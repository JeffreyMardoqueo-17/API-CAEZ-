import express from 'express';
import configuracion from './configuracion';
import ParentezcoRouter from './routers/Parentezco.routes'; // Importa el enrutador de Parentezco

const app = express();
const port = configuracion.port; // Define la variable port utilizando const

app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use(ParentezcoRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

export default app;
