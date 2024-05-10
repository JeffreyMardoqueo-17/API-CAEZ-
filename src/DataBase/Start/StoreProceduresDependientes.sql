-- SP para obtener todos los usuarios
CREATE PROCEDURE SPObtenerUsuarios
AS
BEGIN
    SELECT * FROM [User];
END;
GO

-- SP para obtener un usuario por su Id
CREATE PROCEDURE SPObtenerUsuarioPorId
    @Id INT
AS
BEGIN
    SELECT * FROM [User]
    WHERE Id = @Id;
END;
GO

-- SP para insertar un nuevo usuario
CREATE PROCEDURE SPInsertarUsuario
    @Name NVARCHAR(30),
    @LastName NVARCHAR(30),
    @Login NVARCHAR(100),
    @Password NVARCHAR(100),
    @Status TINYINT,
    @RegistrationDate DATETIME,
    @IdRole INT
AS
BEGIN
    INSERT INTO [User] ([Name], LastName, [Login], [Password], [Status], RegistrationDate, IdRole)
    VALUES (@Name, @LastName, @Login, @Password, @Status, @RegistrationDate, @IdRole);
END;
GO

-- SP para actualizar un usuario existente
CREATE PROCEDURE SPActualizarUsuario
    @Id INT,
    @Name NVARCHAR(30),
    @LastName NVARCHAR(30),
    @Login NVARCHAR(100),
    @Status TINYINT
AS
BEGIN
    UPDATE [User]
    SET [Name] = @Name,
        LastName = @LastName,
        [Login] = @Login,
        [Status] = @Status
    WHERE Id = @Id;
END;
GO

-- SP para eliminar un usuario por su Id
CREATE PROCEDURE SPEliminarUsuario
    @Id INT
AS
BEGIN
    DELETE FROM [User]
    WHERE Id = @Id;
END;
GO

-- ========PARA LA PARTE DE RESTABLECER LA CONTRASEÑAS 
-- SP para iniciar sesión
CREATE PROCEDURE SPIniciarSesion
    @Login NVARCHAR(100),
    @Password NVARCHAR(100)
AS
BEGIN
    SELECT Id, [Name], LastName, [Status], RegistrationDate, IdRole
    FROM [User]
    WHERE [Login] = @Login AND [Password] = @Password;
END;
GO

-- SP para cambiar la contraseña de un usuario
CREATE PROCEDURE SPCambiarContraseña
    @Id INT,
    @NewPassword NVARCHAR(100)
AS
BEGIN
    UPDATE [User]
    SET [Password] = @NewPassword
    WHERE Id = @Id;
END;
GO
-----====================================================PADRINOS O PERSONAS QUE BECAN =============
-- SP para obtener todos los padrinos
CREATE PROCEDURE SPObtenerPadrinos
AS
BEGIN
    SELECT * FROM Padrino;
END;
GO

-- SP para obtener un padrino por su Id
CREATE PROCEDURE SPObtenerPadrinoPorId
    @Id INT
AS
BEGIN
    SELECT * FROM Padrino
    WHERE Id = @Id;
END;
GO

-- SP para insertar un nuevo padrino
CREATE PROCEDURE SPInsertarPadrino
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

-- SP para actualizar un padrino existente
CREATE PROCEDURE SPActualizarPadrino
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
    SET Nombre = @Nombre,
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

-- SP para eliminar un padrino por su Id
CREATE PROCEDURE SPEliminarPadrino
    @Id INT
AS
BEGIN
    DELETE FROM Padrino
    WHERE Id = @Id;
END;
GO
-- SP para buscar padrinos por nombre
CREATE PROCEDURE SPBuscarPadrinosPorNombre
    @NombreBusqueda VARCHAR(50)
AS
BEGIN
    SELECT * FROM Padrino
    WHERE Nombre LIKE '%' + @NombreBusqueda + '%';
END;
GO
