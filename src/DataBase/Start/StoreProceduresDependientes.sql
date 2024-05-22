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
    SELECT * FROM Encargado 
    WHERE Nombre LIKE '%' + @TextoBusqueda + '%' 
    OR Apellido LIKE '%' + @TextoBusqueda + '%';
END
GO
--ALUMNOS==========================================================================================
-- CREAR ALUMNOS
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
    DECLARE @IdGrupo INT;

    -- Verificar si ya existe un grupo para el grado del alumno
    SELECT @IdGrupo = Id
    FROM Grupo
    WHERE Nombre = CONCAT('Grado ', @IdGrado);

    -- Si no existe, crear un nuevo grupo
    IF @IdGrupo IS NULL
    BEGIN
        INSERT INTO Grupo (Nombre)
        VALUES (CONCAT('Grado ', @IdGrado));
        
        SET @IdGrupo = SCOPE_IDENTITY();
    END

    -- Insertar el alumno y asignarle el grupo correspondiente
    INSERT INTO Alumno (Nombre, Apellido, FechaNacimiento, IdSexo, IdRole, IdEncargado, IdEnfermedad, IdTipoDocumento, NumDocumento, IdGrado, IdGrupo, IdTurno, IdAdministrador, IdPadrino, FechaRegistro, EsBecado)
    VALUES (@Nombre, @Apellido, @FechaNacimiento, @IdSexo, @IdRole, @IdEncargado, @IdEnfermedad, @IdTipoDocumento, @NumDocumento, @IdGrado, @IdGrupo, @IdTurno, @IdAdministrador, @IdPadrino, @FechaRegistro, @EsBecado);

    SELECT SCOPE_IDENTITY() AS IdAlumno;
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
-- BUSCAR ALUMNOS POR BECA
CREATE PROCEDURE SPBuscarAlumnosPorBeca
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalBecados INT, @TotalNoBecados INT;

    SELECT @TotalBecados = COUNT(*)
    FROM Alumno
    WHERE EsBecado = 1;

    SELECT @TotalNoBecados = COUNT(*)
    FROM Alumno
    WHERE EsBecado = 0;

    SELECT @TotalBecados AS TotalBecados, @TotalNoBecados AS TotalNoBecados;
END
GO
CREATE PROCEDURE SPGetAlumnosPorGrado
    @Grado INT
AS
BEGIN
    SELECT a.*
    FROM Alumno a
    INNER JOIN Grupo g ON a.IdGrupo = g.Id
    WHERE g.Nombre = CONCAT('Grado ', @Grado);
END
GO

-- GRUPOS O GRADOS CON ALUMNOS SEPARADOS-==================
CREATE PROCEDURE SPTraerTodosLosGrupos
AS
BEGIN
    SELECT * FROM Grupo;
END
GO
---TRAER GRUPO POR ID
CREATE PROCEDURE SPTraerGrupoPorID
    @Id INT
AS
BEGIN
    SELECT *
    FROM GRUPO
    WHERE Id = @Id;
END
GO
---========================================SP DE PAGOS 


---========================================SP DE PAGOS 
CREATE PROCEDURE SPCrearPago
    @IdAlumno INT,
    @Multa DECIMAL(10, 2) = 0,
    @IdTipoPago INT = NULL,
    @Descuento DECIMAL(5, 2) = 0,
    @TotalPagado DECIMAL(10, 2),
    @FechaRegistro DATETIME,
    @IdAdministrador INT,
    @Descripcion VARCHAR(MAX),
    @MesesPagados INT -- Lista de meses pagados separados por comas (por ejemplo, '1,2,3')
AS
BEGIN
    DECLARE @IdPago INT;

    INSERT INTO Pago (IdAlumno, Multa, IdTipoPago, Descuento, TotalPagado, FechaRegistro, IdAdministrador, Descripcion)
    VALUES (@IdAlumno, @Multa, @IdTipoPago, @Descuento, @TotalPagado, @FechaRegistro, @IdAdministrador, @Descripcion);

    SET @IdPago = SCOPE_IDENTITY();

    -- Dividir la lista de meses y registrar cada mes en la tabla PagoMes
    DECLARE @Mes INT;
    DECLARE @Posicion INT = 1;

    WHILE @Posicion <= LEN(@MesesPagados)
    BEGIN
       SET @Mes = CAST(SUBSTRING(CONVERT(VARCHAR(MAX), @MesesPagados), @Posicion, 
                            CHARINDEX(',', CONVERT(VARCHAR(MAX), @MesesPagados) + ',', @Posicion) - @Posicion) AS INT);

        INSERT INTO PagoMes (IdPago, IdMes)
        VALUES (@IdPago, @Mes);

        SET @Posicion = CHARINDEX(',', @MesesPagados, @Posicion) + 1;
    END;
END;
GO
-- SP para leer todos los pagos

-- SP para actualizar un pago
CREATE PROCEDURE SPActualizarPago
    @Id INT,
    @IdAlumno INT,
    @Multa DECIMAL(10, 2) = 0,
    @IdTipoPago INT = NULL,
    @Descuento DECIMAL(5, 2) = 0,
    @TotalPagado DECIMAL(10, 2),
    @FechaRegistro DATETIME,
    @IdAdministrador INT,
    @Descripcion VARCHAR(MAX),
    @MesesPagados INT -- Lista de meses pagados separados por comas (por ejemplo, '1,2,3')
AS
BEGIN
    UPDATE Pago
    SET IdAlumno = @IdAlumno,
        Multa = @Multa,
        IdTipoPago = @IdTipoPago,
        Descuento = @Descuento,
        TotalPagado = @TotalPagado,
        FechaRegistro = @FechaRegistro,
        IdAdministrador = @IdAdministrador,
        Descripcion = @Descripcion
    WHERE Id = @Id;

    -- Eliminar los registros existentes de PagoMes
    DELETE FROM PagoMes WHERE IdPago = @Id;

    -- Dividir la lista de meses y registrar cada mes en la tabla PagoMes
    DECLARE @Mes INT;
    DECLARE @Posicion INT = 1;

    WHILE @Posicion <= LEN(@MesesPagados)
    BEGIN
        SET @Mes = CAST(SUBSTRING(CONVERT(VARCHAR(MAX), @MesesPagados), @Posicion, 
                        CHARINDEX(',', CONVERT(VARCHAR(MAX), @MesesPagados) + ',', @Posicion) - @Posicion) AS INT);

        INSERT INTO PagoMes (IdPago, IdMes)
        VALUES (@Id, @Mes);

        SET @Posicion = CHARINDEX(',', @MesesPagados, @Posicion) + 1;
    END;
END;
GO

-- SP para leer todos los pagos
CREATE PROCEDURE SPTraerTodosLosPagos
AS
BEGIN
    SELECT * FROM Pago;
END;
GO
-- SP para leer un pago por ID
CREATE PROCEDURE SPTraerPagoPorID
    @Id INT
AS
BEGIN
    SELECT * FROM Pago WHERE Id = @Id;
END;
GO

-- SP para eliminar un pago
CREATE PROCEDURE SPEliminarPago
    @Id INT
AS
BEGIN
    DELETE FROM PagoMes WHERE IdPago = @Id;
    DELETE FROM Pago WHERE Id = @Id;
END;
GO
--=============================================PAGO MEES
-- pagos meses, los pagos que relacionen a varios meses, si un alumno en un solo apgo pago varios MESes

-- SP para crear un registro en PagoMes
CREATE PROCEDURE SPCrearPagoMes
    @IdPago INT,
    @IdMes INT
AS
BEGIN
    INSERT INTO PagoMes (IdPago, IdMes)
    VALUES (@IdPago, @IdMes);
END;
GO
-- SP para leer todos los registros de PagoMes
CREATE PROCEDURE SPTraerTodosLosPagosMes
AS
BEGIN
    SELECT * FROM PagoMes;
END;
GO
-- SP para leer un registro de PagoMes por ID
CREATE PROCEDURE SPTraerPagoMesPorID
    @Id INT
AS
BEGIN
    SELECT * FROM PagoMes WHERE Id = @Id;
END;
GO
-- SP para actualizar un registro de PagoMes
CREATE PROCEDURE SPActualizarPagoMes
    @Id INT,
    @IdPago INT,
    @IdMes INT
AS
BEGIN
    UPDATE PagoMes
    SET IdPago = @IdPago,
        IdMes = @IdMes
    WHERE Id = @Id;
END;
GO
-- SP para eliminar un registro de PagoMes
CREATE PROCEDURE SPEliminarPagoMes
    @Id INT
AS
BEGIN
    DELETE FROM PagoMes WHERE Id = @Id;
END;
GO  