import app from './app'
import {} from './DataBase/contection/Conexion'


app.listen(app.get('port'))
console.log(`Servidor en el puerto`, app.get('port'))