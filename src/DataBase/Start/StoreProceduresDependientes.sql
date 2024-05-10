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
