-- -- TABLA Padrino
-- CREATE TABLE Padrino(
--     Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--     Nombre VARCHAR(50) NOT NULL,
--     Apellido VARCHAR(50) NOT NULL,
--     IdSexo INT NOT NULL FOREIGN KEY REFERENCES Sexo(Id),
--     IdRole INT NOT NULL FOREIGN KEY REFERENCES [Role](Id),
--     Telefono VARCHAR (50) NOT NULL,
--     Correo VARCHAR(30) NOT NULL,
--     IdDireccion INT NOT NULL FOREIGN KEY REFERENCES Direccion(Id),
--     IdAdministrador INT NOT NULL FOREIGN KEY REFERENCES [User](Id),
--     FechaRegistro DATETIME NOT NULL
-- );
-- GO

-- Procedimiento para crear un nuevo padrino
CREATE PROCEDURE SPCreatePadrino
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @IdSexo INT,
    @IdRole INT,
    @Telefono VARCHAR(50),
    @Correo VARCHAR(30),
    @IdDireccion INT,
    @IdAdministrador INT,
    @FechaRegistro DATETIME
AS
BEGIN
    INSERT INTO Padrino (Nombre, Apellido, IdSexo, IdRole, Telefono, Correo, IdDireccion, IdAdministrador, FechaRegistro)
    VALUES (@Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @Correo, @IdDireccion, @IdAdministrador, @FechaRegistro);
END;
GO
-- Procedimiento para obtener todos los padrinos con información de las llaves foráneas
CREATE PROCEDURE SPGetAllPadrinos
AS
BEGIN
    SELECT 
        p.Id,
        p.Nombre,
        p.Apellido,
        s.Nombre AS Sexo,
        r.Nombre AS Role,
        p.Telefono,
        p.Correo,
        d.Direccion AS Direccion,
        u.Nombre + ' ' + u.Apellido AS Administrador,
        p.FechaRegistro
    FROM Padrino p
    INNER JOIN Sexo s ON p.IdSexo = s.Id
    INNER JOIN [Role] r ON p.IdRole = r.Id
    INNER JOIN Direccion d ON p.IdDireccion = d.Id
    INNER JOIN [User] u ON p.IdAdministrador = u.Id;
END;
GO

-- Procedimiento para obtener un padrino por ID con información de las llaves foráneas
CREATE PROCEDURE SPGetPadrinoById
    @Id INT
AS
BEGIN
    SELECT 
        p.Id,
        p.Nombre,
        p.Apellido,
        s.Nombre AS Sexo,
        r.Nombre AS Role,
        p.Telefono,
        p.Correo,
        d.Direccion AS Direccion,
        u.Nombre + ' ' + u.Apellido AS Administrador,
        p.FechaRegistro
    FROM Padrino p
    INNER JOIN Sexo s ON p.IdSexo = s.Id
    INNER JOIN [Role] r ON p.IdRole = r.Id
    INNER JOIN Direccion d ON p.IdDireccion = d.Id
    INNER JOIN [User] u ON p.IdAdministrador = u.Id
    WHERE p.Id = @Id;
END;
GO
-- Procedimiento para eliminar un padrino por ID
CREATE PROCEDURE SPDeletePadrino
    @Id INT
AS
BEGIN
    DELETE FROM Padrino
    WHERE Id = @Id;
END;
GO
-- Procedimiento para actualizar un padrino
CREATE PROCEDURE SPUpdatePadrino
    @Id INT,
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @IdSexo INT,
    @IdRole INT,
    @Telefono VARCHAR(50),
    @Correo VARCHAR(30),
    @IdDireccion INT,
    @IdAdministrador INT,
    @FechaRegistro DATETIME
AS
BEGIN
    UPDATE Padrino
    SET 
        Nombre = @Nombre,
        Apellido = @Apellido,
        IdSexo = @IdSexo,
        IdRole = @IdRole,
        Telefono = @Telefono,
        Correo = @Correo,
        IdDireccion = @IdDireccion,
        IdAdministrador = @IdAdministrador,
        FechaRegistro = @FechaRegistro
    WHERE Id = @Id;
END;
GO
