---Traer a todos los Encargados 
CREATE PROCEDURE SPObtenrEncargados
AS
BEGIN
    SELECT 
        e.Id,
        e.Nombre,
        e.Apellido,
        s.Nombre AS Sexo,
        r.[Name] AS [Role],
        e.Telefono,
        e.TelEmergencia,
        e.Correo,
        d.Nombre AS Direccion,
        td.Nombre AS TipoDocumento,
        e.NumDocumento,
        adm.[Name] AS Administrador,
        e.FechaRegistro
    FROM Encargado e
    INNER JOIN Sexo s ON e.IdSexo = s.Id
    INNER JOIN [Role] r ON e.IdRole = r.Id
    INNER JOIN Direccion d ON e.IdDireccion = d.Id
    INNER JOIN TipoDocumento td ON e.IdTipoDocumento = td.Id
    INNER JOIN [User] adm ON e.IdAdministrador = adm.Id;
END
GO

CREATE PROCEDURE SPObtenerEncargadoPorId
    @Id INT
AS
BEGIN
    SELECT 
        e.Id,
        e.Nombre,
        e.Apellido,
        s.Nombre AS Sexo,
        r.[Name] AS [Role],
        e.Telefono,
        e.TelEmergencia,
        e.Correo,
        d.Nombre AS Direccion,
        td.Nombre AS TipoDocumento,
        e.NumDocumento,
        adm.[Name] AS Administrador,
        e.FechaRegistro
    FROM Encargado e
    INNER JOIN Sexo s ON e.IdSexo = s.Id
    INNER JOIN [Role] r ON e.IdRole = r.Id
    INNER JOIN Direccion d ON e.IdDireccion = d.Id
    INNER JOIN TipoDocumento td ON e.IdTipoDocumento = td.Id
    INNER JOIN [User] adm ON e.IdAdministrador = adm.Id
    WHERE e.Id = @Id;
END
GO

CREATE PROCEDURE SPBuscarEncargadosPorNombre
    @TextoBusqueda NVARCHAR(50)
AS
BEGIN
    SELECT 
        e.Id,
        e.Nombre,
        e.Apellido,
        s.Nombre AS Sexo,
        r.[Name] AS [Role],
        e.Telefono,
        e.TelEmergencia,
        e.Correo,
        d.Nombre AS Direccion,
        td.Nombre AS TipoDocumento,
        e.NumDocumento,
        adm.[Name] AS Administrador,
        e.FechaRegistro
    FROM Encargado e
    INNER JOIN Sexo s ON e.IdSexo = s.Id
    INNER JOIN [Role] r ON e.IdRole = r.Id
    INNER JOIN Direccion d ON e.IdDireccion = d.Id
    INNER JOIN TipoDocumento td ON e.IdTipoDocumento = td.Id
    INNER JOIN [User] adm ON e.IdAdministrador = adm.Id
    WHERE e.Nombre LIKE '%' + @TextoBusqueda + '%'
       OR e.Apellido LIKE '%' + @TextoBusqueda + '%';
END
GO
