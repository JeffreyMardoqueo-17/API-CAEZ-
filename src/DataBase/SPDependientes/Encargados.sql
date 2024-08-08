-- CREAR ENCARGADOS
CREATE PROCEDURE SPInsertarEncargado
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @IdSexo INT,
    @IdRole INT,
    @Telefono VARCHAR(50),
    @TelEmergencia VARCHAR(10),
    @Correo VARCHAR(30),
    @IdDireccion INT,
    @IdTipoDocumento INT,
    @NumDocumento VARCHAR(50),
    @IdAdministrador INT
AS
BEGIN
    INSERT INTO Encargado (Nombre, Apellido, IdSexo, IdRole, Telefono, TelEmergencia, Correo, IdDireccion, IdTipoDocumento, NumDocumento, IdAdministrador, FechaRegistro)
    VALUES (@Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @TelEmergencia, @Correo, @IdDireccion, @IdTipoDocumento, @NumDocumento, @IdAdministrador, GETDATE());
END
GO

-- ACTUALIZAR EL ENCARGADO
CREATE PROCEDURE SPActualizarEncargado
    @Id INT,
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @IdSexo INT,
    @IdRole INT,
    @Telefono VARCHAR(50),
    @TelEmergencia VARCHAR(10),
    @Correo VARCHAR(30),
    @IdDireccion INT,
    @IdTipoDocumento INT,
    @NumDocumento VARCHAR(50),
    @IdAdministrador INT
AS
BEGIN
    UPDATE Encargado
    SET Nombre = @Nombre, Apellido = @Apellido, IdSexo = @IdSexo, IdRole = @IdRole, Telefono = @Telefono, TelEmergencia = @TelEmergencia,
        Correo = @Correo, IdDireccion = @IdDireccion, IdTipoDocumento = @IdTipoDocumento, NumDocumento = @NumDocumento, IdAdministrador = @IdAdministrador
    WHERE Id = @Id;
END
GO

--ELIMINAR 
CREATE PROCEDURE SPEliminarEncargado
    @Id INT
AS
BEGIN
    DELETE FROM Encargado WHERE Id = @Id;
END
GO
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
CREATE PROCEDURE SPFiltrarOrdenarEncargados
    @Orden NVARCHAR(20)
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
    ORDER BY
        CASE 
            WHEN @Orden = 'NombreAsc' THEN e.Nombre
            WHEN @Orden = 'NombreDesc' THEN e.Nombre
            ELSE NULL
        END ASC,
        CASE 
            WHEN @Orden = 'NombreDesc' THEN e.Nombre
            ELSE NULL
        END DESC,
        CASE 
            WHEN @Orden = 'FechaRegistro' THEN e.FechaRegistro
            ELSE NULL
        END DESC;
END
GO
EXEC SPFiltrarOrdenarEncargados @Orden = 'NombreDesc';
