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


---ENCARGADOS =======================================
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
-- OBETENER ENCARGADO POR ID
CREATE PROCEDURE SPObtenerEncargadoPorId
    @Id INT
AS
BEGIN
    SELECT * FROM Encargado WHERE Id = @Id;
END
GO
-- obtener todos los encargados
CREATE PROCEDURE SPTraerTodosEncargados
AS
BEGIN
    SELECT * FROM Encargado;
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
-- ELIMINAR ENCARGADO
CREATE PROCEDURE SPEliminarEncargado
    @Id INT
AS
BEGIN
    DELETE FROM Encargado WHERE Id = @Id;
END
GO
-- BUSCAR ENCARGADO POR NOMBRES
CREATE PROCEDURE SPBuscarEncargadoPorNombre
    @TextoBusqueda VARCHAR(50)
AS
BEGIN
    SELECT * FROM Encargado WHERE Nombre LIKE '%' + @TextoBusqueda + '%';
END
GO
-- ALUMNOS============================================================================================
CREATE PROCEDURE SPCrearAlumno
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @FechaNacimiento DATE,
    @IdSexo INT,
    @IdRole INT,
    @IdEncargado INT,
    @IdEnfermedad INT,
    @IdTipoDocumento INT,
    @NumDocumento VARCHAR(50),
    @IdGrado INT,
    @IdTurno INT,
    @IdAdministrador INT,
    @IdPadrino INT,
    @FechaRegistro DATETIME,
    @EsBecado BIT
AS
BEGIN
    INSERT INTO Alumno (Nombre, Apellido, FechaNacimiento, IdSexo, IdRole, IdEncargado, IdEnfermedad, IdTipoDocumento, NumDocumento, IdGrado, IdTurno, IdAdministrador, IdPadrino, FechaRegistro, EsBecado)
    VALUES (@Nombre, @Apellido, @FechaNacimiento, @IdSexo, @IdRole, @IdEncargado, @IdEnfermedad, @IdTipoDocumento, @NumDocumento, @IdGrado, @IdTurno, @IdAdministrador, @IdPadrino, @FechaRegistro, @EsBecado);
END
GO
-- MODIFICAR ALUMNOS
CREATE PROCEDURE SPModificarAlumno
    @Id INT,
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @FechaNacimiento DATE,
    @IdSexo INT,
    @IdRole INT,
    @IdEncargado INT,
    @IdEnfermedad INT,
    @IdTipoDocumento INT,
    @NumDocumento VARCHAR(50),
    @IdGrado INT,
    @IdTurno INT,
    @IdAdministrador INT,
    @IdPadrino INT,
    @FechaRegistro DATETIME,
    @EsBecado BIT
AS
BEGIN
    UPDATE Alumno
    SET Nombre = @Nombre,
        Apellido = @Apellido,
        FechaNacimiento = @FechaNacimiento,
        IdSexo = @IdSexo,
        IdRole = @IdRole,
        IdEncargado = @IdEncargado,
        IdEnfermedad = @IdEnfermedad,
        IdTipoDocumento = @IdTipoDocumento,
        NumDocumento = @NumDocumento,
        IdGrado = @IdGrado,
        IdTurno = @IdTurno,
        IdAdministrador = @IdAdministrador,
        IdPadrino = @IdPadrino,
        FechaRegistro = @FechaRegistro,
        EsBecado = @EsBecado
    WHERE Id = @Id;
END
GO
-- TARER ALUMNOS POR IDENTIFIED
CREATE PROCEDURE SPTraerAlumnoPorId
    @Id INT
AS
BEGIN
    SELECT *
    FROM Alumno
    WHERE Id = @Id;
END
GO
-- traer a todos los alumnos
CREATE PROCEDURE SPTraerTodosLosAlumnos
AS
BEGIN
    SELECT *
    FROM Alumno;
END
GO
-- ELLIMINAR ALUMNOS
CREATE PROCEDURE SPEliminarAlumno
    @Id INT
AS
BEGIN
    DELETE FROM Alumno
    WHERE Id = @Id;
END
GO
-- BUSCAR ALUMNOS POR NOMBRES
CREATE PROCEDURE SPBuscarAlumnosPorNombre
    @Nombre VARCHAR(50)
AS
BEGIN
    SELECT *
    FROM Alumno
    WHERE Nombre LIKE '%' + @Nombre + '%';
END
GO
-- BUSCAR ALUMNOS POR GRADO
CREATE PROCEDURE SPBuscarAlumnosPorGrado
    @IdGrado INT
AS
BEGIN
    SELECT *
    FROM Alumno
    WHERE IdGrado = @IdGrado;
END
GO
