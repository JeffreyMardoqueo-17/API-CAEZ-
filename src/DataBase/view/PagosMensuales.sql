-- Usar la base de datos
USE CaezPagos;
GO
-- Crear la vista para mostrar los pagos mensuales de cada alumno
CREATE VIEW PagosMensuales AS
SELECT 
    A.Id AS IdAlumno,
    A.Nombre + ' ' + A.Apellido AS Alumno,
    MAX(CASE WHEN M.Nombre = 'Enero' THEN 'True' ELSE 'False' END) AS Enero,
    MAX(CASE WHEN M.Nombre = 'Febrero' THEN 'True' ELSE 'False' END) AS Febrero,
    MAX(CASE WHEN M.Nombre = 'Marzo' THEN 'True' ELSE 'False' END) AS Marzo,
    MAX(CASE WHEN M.Nombre = 'Abril' THEN 'True' ELSE 'False' END) AS Abril,
    MAX(CASE WHEN M.Nombre = 'Mayo' THEN 'True' ELSE 'False' END) AS Mayo,
    MAX(CASE WHEN M.Nombre = 'Junio' THEN 'True' ELSE 'False' END) AS Junio,
    MAX(CASE WHEN M.Nombre = 'Julio' THEN 'True' ELSE 'False' END) AS Julio,
    MAX(CASE WHEN M.Nombre = 'Agosto' THEN 'True' ELSE 'False' END) AS Agosto,
    MAX(CASE WHEN M.Nombre = 'Septiembre' THEN 'True' ELSE 'False' END) AS Septiembre,
    MAX(CASE WHEN M.Nombre = 'Octubre' THEN 'True' ELSE 'False' END) AS Octubre,
    MAX(CASE WHEN M.Nombre = 'Noviembre' THEN 'True' ELSE 'False' END) AS Noviembre,
    MAX(CASE WHEN M.Nombre = 'Diciembre' THEN 'True' ELSE 'False' END) AS Diciembre
FROM 
    Alumno A
LEFT JOIN 
    Pago P ON A.Id = P.IdAlumno
LEFT JOIN 
    PagoMes PM ON P.Id = PM.IdPago
LEFT JOIN 
    Mes M ON PM.IdMes = M.Id
GROUP BY 
    A.Id, A.Nombre, A.Apellido;
