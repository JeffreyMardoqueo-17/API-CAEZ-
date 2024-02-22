USE BDCaezApi
SELECT
    Factura.*,
    Pago.*,
    Alumno.Nombre AS NombreAlumno,
    Alumno.Apellido AS ApellidoAlumno,
    Grado.Nombre AS NombreGrado,
    Alumno.NumeroDocumento AS NumeroDocumentoAlumno,
    Turno.Nombre AS NombreTurno,
    Encargado.Nombre AS NombreEncargado,
    Encargado.Apellido AS ApellidoEncargado,
    Encargado.IdParentezco AS ParentezcoEncargado,
    Pago.FechaRegistro AS FechaPago,
    Administrador.Nombre AS NombreAdministrador,
    Administrador.Apellido AS ApellidoAdministrador
FROM Factura
JOIN Pago ON Factura.IdPago = Pago.Id
JOIN Alumno ON Pago.IdAlumno = Alumno.Id
JOIN Grado ON Alumno.IdGrado = Grado.Id
JOIN Turno ON Alumno.IdTurno = Turno.Id
JOIN Encargado ON Alumno.IdEncargado = Encargado.Id
JOIN Administrador ON Pago.IdAdministrador = Administrador.Id;
