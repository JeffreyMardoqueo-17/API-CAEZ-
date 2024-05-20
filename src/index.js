import app from './app'
import {} from './DataBase/contection/Conexion'
import configuracion from './configuracion'

let puerto = configuracion.port;
app.listen(app.get('puerto'));

// let puerto = configuracion.port;
// app.listen(app.get('puerto'));