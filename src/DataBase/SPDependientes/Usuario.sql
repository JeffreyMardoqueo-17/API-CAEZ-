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
CREATE PROCEDURE SPUserLogin
    @Login NVARCHAR(100),
    @Password NVARCHAR(100)
AS
BEGIN
    -- Verifica si el usuario con el login proporcionado existe
    IF EXISTS (SELECT 1 FROM [User] WHERE [Login] = @Login)
    BEGIN
        -- Verifica si el Login y Password son correctos
        DECLARE @UserId INT;
        SELECT 
            @UserId = Id
        FROM 
            [User]
        WHERE 
            [Login] = @Login 
            AND [Password] = @Password;

        -- Si se encontró el usuario con ese login y contraseña
        IF @UserId IS NOT NULL
        BEGIN
            -- Devuelve la información del usuario
            SELECT 
                Id,
                [Name],
                LastName,
                [Login],
                [Status],
                RegistrationDate,
                IdRole
            FROM 
                [User]
            WHERE 
                Id = @UserId;
        END
        ELSE
        BEGIN
            -- Si la contraseña es incorrecta, devuelve un mensaje de error
            SELECT 'Login o contraseña incorrectos' AS ErrorMessage;
        END
    END
    ELSE
    BEGIN
        -- Si el usuario no existe con ese login, devuelve un mensaje de error
        SELECT 'Usuario no encontrado' AS ErrorMessage;
    END
END;
GO

