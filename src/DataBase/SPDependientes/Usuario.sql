-- -------------------------
-- TABLA User
-- -------------------------

-- Stored Procedure para Crear User
CREATE PROCEDURE SPUserCreate
    @Name NVARCHAR(30),
    @LastName NVARCHAR(30),
    @Login NVARCHAR(100),
    @Password NVARCHAR(100),
    @Status TINYINT,
    @RegistrationDate DATETIME,
    @IdRole INT
AS
BEGIN
    -- Inserta un nuevo registro en la tabla User
    INSERT INTO [User] ([Name], LastName, [Login], [Password], [Status], RegistrationDate, IdRole)
    VALUES (@Name, @LastName, @Login, @Password, @Status, @RegistrationDate, @IdRole);

    -- Devuelve el Id del registro recién insertado
    SELECT SCOPE_IDENTITY() AS Id;
END;
GO

-- Stored Procedure para Traer Todos los Users
CREATE PROCEDURE SPUserGet
AS
BEGIN
    -- Devuelve todos los registros de User con los detalles del Role
    SELECT 
        U.Id,
        U.[Name],
        U.LastName,
        U.[Login],
        U.[Status],
        U.RegistrationDate,
        R.[Name] AS RoleName
    FROM 
        [User] U
    INNER JOIN 
        [Role] R ON U.IdRole = R.Id;
END;
GO

-- Stored Procedure para Traer User por ID
CREATE PROCEDURE SPUserGetById
    @Id INT
AS
BEGIN
    -- Devuelve el registro de User con el Id especificado y los detalles del Role
    SELECT 
        U.Id,
        U.[Name],
        U.LastName,
        U.[Login],
        U.[Status],
        U.RegistrationDate,
        R.[Name] AS RoleName
    FROM 
        [User] U
    INNER JOIN 
        [Role] R ON U.IdRole = R.Id
    WHERE 
        U.Id = @Id;
END;
GO

-- Stored Procedure para Actualizar User
CREATE PROCEDURE SPUserUpdate
    @Id INT,
    @Name NVARCHAR(30),
    @LastName NVARCHAR(30),
    @Login NVARCHAR(100),
    @Password NVARCHAR(100),
    @Status TINYINT,
    @IdRole INT
AS
BEGIN
    -- Actualiza el registro de User con el Id especificado
    UPDATE [User]
    SET 
        [Name] = @Name,
        LastName = @LastName,
        [Login] = @Login,
        [Password] = @Password,
        [Status] = @Status,
        IdRole = @IdRole
    WHERE 
        Id = @Id;
    
    -- Devuelve el registro actualizado con los detalles del Role
    SELECT 
        U.Id,
        U.[Name],
        U.LastName,
        U.[Login],
        U.[Status],
        U.RegistrationDate,
        R.[Name] AS RoleName
    FROM 
        [User] U
    INNER JOIN 
        [Role] R ON U.IdRole = R.Id
    WHERE 
        U.Id = @Id;
END;
GO

-- Stored Procedure para Eliminar User
CREATE PROCEDURE SPUserDelete
    @Id INT
AS
BEGIN
    -- Elimina el registro de User con el Id especificado
    DELETE FROM [User]
    WHERE Id = @Id;
END;
GO

-- Stored Procedure para Obtener Usuario por Login
CREATE PROCEDURE SPUserGetByLogin
    @Login NVARCHAR(100)
AS
BEGIN
    -- Selecciona el usuario con el Login proporcionado
    SELECT 
        Id,
        [Name],
        LastName,
        [Login],
        [Password],
        [Status],
        RegistrationDate,
        IdRole
    FROM 
        [User]
    WHERE 
        [Login] = @Login;
END;
GO
