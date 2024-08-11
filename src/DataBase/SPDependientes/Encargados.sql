-- TABLA Encargado
--CREATE TABLE Encargado(
--    Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
--    Nombre VARCHAR(50) NOT NULL,
--    Apellido VARCHAR(50) NOT NULL,
--    IdSexo INT NOT NULL FOREIGN KEY REFERENCES Sexo(Id),
--    IdRole INT NOT NULL FOREIGN KEY REFERENCES [Role](Id),
--    Telefono VARCHAR(50) NOT NULL,
--    TelEmergencia VARCHAR(10) NOT NULL,
--    Correo VARCHAR(30) NOT NULL,
--    IdDireccion INT NOT NULL FOREIGN KEY REFERENCES Direccion(Id),
--    IdTipoDocumento INT NOT NULL FOREIGN KEY REFERENCES TipoDocumento(Id),
--    NumDocumento VARCHAR(50) NOT NULL,
--    IdAdministrador INT NOT NULL FOREIGN KEY REFERENCES [User](Id),
--    FechaRegistro DATETIME NOT NULL
--);
--GO

-- Procedimiento para crear un nuevo encargado
CREATE PROCEDURE SPCreateEncargado
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
    @IdAdministrador INT,
    @FechaRegistro DATETIME
AS
BEGIN
    -- Insertar nuevo registro en la tabla Encargado
    INSERT INTO Encargado (Nombre, Apellido, IdSexo, IdRole, Telefono, TelEmergencia, Correo, IdDireccion, IdTipoDocumento, NumDocumento, IdAdministrador, FechaRegistro)
    VALUES (@Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @TelEmergencia, @Correo, @IdDireccion, @IdTipoDocumento, @NumDocumento, @IdAdministrador, @FechaRegistro);
END;
GO

-- Procedimiento para obtener todos los encargados con información de las llaves foráneas
CREATE PROCEDURE SPGetAllEncargados
AS
BEGIN
    -- Seleccionar todos los registros de la tabla Encargado junto con los detalles de las llaves foráneas
    SELECT 
        e.Id,
        e.Nombre,
        e.Apellido,
        s.Nombre AS Sexo,
        r.Name AS [Role],
        e.Telefono,
        e.TelEmergencia,
        e.Correo,
        d.Nombre AS Direccion,
        td.Nombre AS TipoDocumento,
        e.NumDocumento,
        u.[Name] + ' ' + u.LastName AS Administrador,
        e.FechaRegistro
    FROM Encargado e
    INNER JOIN Sexo s ON e.IdSexo = s.Id
    INNER JOIN [Role] r ON e.IdRole = r.Id
    INNER JOIN Direccion d ON e.IdDireccion = d.Id
    INNER JOIN TipoDocumento td ON e.IdTipoDocumento = td.Id
    INNER JOIN [User] u ON e.IdAdministrador = u.Id;
END;
GO

-- Procedimiento para obtener un encargado por ID cacon información de las llaves foráneas
CREATE PROCEDURE SPGetEncargadoById
    @Id INT
AS
BEGIN
    -- Seleccionar un registro de la tabla Encargado basado en el ID proporcionado
    SELECT 
        e.Id,
        e.Nombre,
        e.Apellido,
        s.Nombre AS Sexo,
        r.[Name] AS Role,
        e.Telefono,
        e.TelEmergencia,
        e.Correo,
        d.Nombre AS Direccion,
        td.Nombre AS TipoDocumento,
        e.NumDocumento,
        u.[Name] + ' ' + u.LastName AS Administrador,
        e.FechaRegistro
    FROM Encargado e
    INNER JOIN Sexo s ON e.IdSexo = s.Id
    INNER JOIN [Role] r ON e.IdRole = r.Id
    INNER JOIN Direccion d ON e.IdDireccion = d.Id
    INNER JOIN TipoDocumento td ON e.IdTipoDocumento = td.Id
    INNER JOIN [User] u ON e.IdAdministrador = u.Id
    WHERE e.Id = @Id;
END;
GO

-- Procedimiento para eliminar un encargado por ID
CREATE PROCEDURE SPDeleteEncargado
    @Id INT
AS
BEGIN
    -- Eliminar el registro de la tabla Encargado basado en el ID proporcionado
    DELETE FROM Encargado
    WHERE Id = @Id;
END;
GO

-- Procedimiento para actualizar un encargado
CREATE PROCEDURE SPUpdateEncargado
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
    @IdAdministrador INT,
    @FechaRegistro DATETIME
AS
BEGIN
    -- Actualizar un registro de la tabla Encargado basado en el ID proporcionado
    UPDATE Encargado
    SET 
        Nombre = @Nombre, 
        Apellido = @Apellido,
        IdSexo = @IdSexo,
        IdRole = @IdRole,
        Telefono = @Telefono,
        TelEmergencia = @TelEmergencia,
        Correo = @Correo,
        IdDireccion = @IdDireccion,
        IdTipoDocumento = @IdTipoDocumento,
        NumDocumento = @NumDocumento,
        IdAdministrador = @IdAdministrador,
        FechaRegistro = @FechaRegistro
    WHERE Id = @Id;
END;
GO
