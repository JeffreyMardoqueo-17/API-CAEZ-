
--------------------------------sp de Parentezco
-- SP para obtener todos los parentezcos
CREATE PROCEDURE SPObtenerParentezcos
AS
BEGIN
    SELECT * FROM Parentezco;
END;
GO

-- SP para obtener un parentezco por su Id
CREATE PROCEDURE SPObtenerParentezcoPorId
    @Id TINYINT
AS
BEGIN
    SELECT * FROM Parentezco
    WHERE Id = @Id;
END;
GO

-- SP para insertar un nuevo parentezco
CREATE PROCEDURE SPInsertarParentezco
    @Nombre VARCHAR(50)
AS
BEGIN
    INSERT INTO Parentezco (Nombre)
    VALUES (@Nombre);
END;
GO

-- SP para actualizar un parentezco existente
CREATE PROCEDURE SPActualizarParentezco
    @Id TINYINT,
    @Nombre VARCHAR(50)
AS
BEGIN
    UPDATE Parentezco
    SET Nombre = @Nombre
    WHERE Id = @Id;
END;
GO

-- SP para eliminar un parentezco por su Id
CREATE PROCEDURE SPEliminarParentezco
    @Id TINYINT
AS
BEGIN
    DELETE FROM Parentezco
    WHERE Id = @Id;
END;
GO


-- SP para obtener todos los turnos

CREATE PROCEDURE SPObtenerTurnos
AS
BEGIN
    SELECT * FROM Turno;
END;
GO
--SP para obtener un turno por su Id
CREATE PROCEDURE SPObtenerTurnoPorId
    @Id TINYINT
AS
BEGIN
    SELECT * FROM Turno
    WHERE Id = @Id;
END;
go
-- SP para insertar un nuevo turno
CREATE PROCEDURE SPInsertarTurno
    @Nombre VARCHAR(80)
AS
BEGIN
    INSERT INTO Turno (Nombre)
    VALUES (@Nombre);
END;
go
-- SP para actualizar un turno existente
CREATE PROCEDURE SPActualizarTurno
    @Id TINYINT,
    @Nombre VARCHAR(80)
AS
BEGIN
    UPDATE Turno
    SET Nombre = @Nombre
    WHERE Id = @Id;
END;
go
-- SP para eliminar un turno por su Id
CREATE PROCEDURE SPEliminarTurno
    @Id TINYINT
AS
BEGIN
    DELETE FROM Turno
    WHERE Id = @Id;
END;
go
---//////////////////////////////TABLA GRADO-----------------------------------------
-- SP para obtener todos los grados
CREATE PROCEDURE SPObtenerGrados
AS
BEGIN
    SELECT * FROM Grado;
END;
GO
-- SP para obtener un grado por su Id
CREATE PROCEDURE SPObtenerGradoPorId
    @Id TINYINT
AS
BEGIN
    SELECT * FROM Grado
    WHERE Id = @Id;
END;
GO
-- SP para insertar un nuevo grado
CREATE PROCEDURE SPInsertarGrado
    @Nombre VARCHAR(50)
AS
BEGIN
    INSERT INTO Grado (Nombre)
    VALUES (@Nombre);
END;
GO
-- SP para actualizar un grado existente
CREATE PROCEDURE SPActualizarGrado
    @Id TINYINT,
    @Nombre VARCHAR(50)
AS
BEGIN
    UPDATE Grado
    SET Nombre = @Nombre
    WHERE Id = @Id;
END;
go
-- SP para eliminar un grado por su Id
CREATE PROCEDURE SPEliminarGrado
    @Id TINYINT
AS
BEGIN
    DELETE FROM Grado
    WHERE Id = @Id;
END;
GO
--------------------------//TIPO DOCUMENTO 
-- SP para obtener todos los tipos de documento
CREATE PROCEDURE SPObtenerTiposDocumento
AS
BEGIN
    SELECT * FROM TipoDocumento;
END;
GO

-- SP para obtener un tipo de documento por su Id
CREATE PROCEDURE SPObtenerTipoDocumentoPorId
    @Id TINYINT
AS
BEGIN
    SELECT * FROM TipoDocumento
    WHERE Id = @Id;
END;
GO

-- SP para insertar un nuevo tipo de documento
CREATE PROCEDURE SPInsertarTipoDocumento
    @Nombre VARCHAR(80)
AS
BEGIN
    INSERT INTO TipoDocumento (Nombre)
    VALUES (@Nombre);
END;
GO

-- SP para actualizar un tipo de documento existente
CREATE PROCEDURE SPActualizarTipoDocumento
    @Id TINYINT,
    @Nombre VARCHAR(80)
AS
BEGIN
    UPDATE TipoDocumento
    SET Nombre = @Nombre
    WHERE Id = @Id;
END;
GO

-- SP para eliminar un tipo de documento por su Id
CREATE PROCEDURE SPEliminarTipoDocumento
    @Id TINYINT
AS
BEGIN
    DELETE FROM TipoDocumento
    WHERE Id = @Id;
END;
GO
----/////////////////////////////////////////TIPO PAGO 
-- SP para obtener todos los tipos de pago
CREATE PROCEDURE SPObtenerTiposPago
AS
BEGIN
    SELECT * FROM TipoPago;
END;
GO

-- SP para obtener un tipo de pago por su Id
CREATE PROCEDURE SPObtenerTipoPagoPorId
    @Id TINYINT
AS
BEGIN
    SELECT * FROM TipoPago
    WHERE Id = @Id;
END;
GO

-- SP para insertar un nuevo tipo de pago
CREATE PROCEDURE SPInsertarTipoPago
    @Nombre VARCHAR(80)
AS
BEGIN
    INSERT INTO TipoPago (Nombre)
    VALUES (@Nombre);
END;
GO

-- SP para actualizar un tipo de pago existente
CREATE PROCEDURE SPActualizarTipoPago
    @Id TINYINT,
    @Nombre VARCHAR(80)
AS
BEGIN
    UPDATE TipoPago
    SET Nombre = @Nombre
    WHERE Id = @Id;
END;
GO

-- SP para eliminar un tipo de pago por su Id
CREATE PROCEDURE SPEliminarTipoPago
    @Id TINYINT
AS
BEGIN
    DELETE FROM TipoPago
    WHERE Id = @Id;
END;
GO
----------------------///T/////////////////TABLA MES///////////////////////////-------------------
-- SP para obtener un mes por su nombre
CREATE PROCEDURE SPObtenerMesPorNombre
    @Nombre VARCHAR(50)
AS
BEGIN
    SELECT * FROM Mes
    WHERE Nombre = @Nombre;
END;
GO
 --------------------------TABLA DE DIRECCIONES-- ////////////////////////////////////////////
 -- SP para obtener todas las direcciones
CREATE PROCEDURE SPObtenerDirecciones
AS
BEGIN
    SELECT * FROM Direccion;
END;
GO

-- SP para obtener una direcci�n por su Id
CREATE PROCEDURE SPObtenerDireccionPorId
    @Id TINYINT
AS
BEGIN
    SELECT * FROM Direccion
    WHERE Id = @Id;
END;
GO

-- SP para insertar una nueva direcci�n
CREATE PROCEDURE SPInsertarDireccion
    @Nombre VARCHAR(200)
AS
BEGIN
    INSERT INTO Direccion (Nombre)
    VALUES (@Nombre);
END;
GO

-- SP para actualizar una direcci�n existente
CREATE PROCEDURE SPActualizarDireccion
    @Id TINYINT,
    @Nombre VARCHAR(200)
AS
BEGIN
    UPDATE Direccion
    SET Nombre = @Nombre
    WHERE Id = @Id;
END;
GO

-- SP para eliminar una direcci�n por su Id
CREATE PROCEDURE SPEliminarDireccion
    @Id TINYINT
AS
BEGIN
    DELETE FROM Direccion
    WHERE Id = @Id;
END;
GO

-- SP para buscar direcciones por su nombre
CREATE PROCEDURE SPBuscarDireccionesPorNombre
    @TextoBusqueda VARCHAR(200)
AS
BEGIN
    SELECT *
    FROM Direccion
    WHERE Nombre LIKE '%' + @TextoBusqueda + '%';
END;
GO
-------------------------------------------///CARGOOOOOOOOOOOOOOOO------------------/////////////////////-------------
-- SP para obtener todos los cargos
CREATE PROCEDURE SPObtenerCargos
AS
BEGIN
    SELECT * FROM Cargo;
END;
GO

-- SP para obtener un cargo por su Id
CREATE PROCEDURE SPObtenerCargoPorId
    @Id TINYINT
AS
BEGIN
    SELECT * FROM Cargo
    WHERE Id = @Id;
END;
GO

-- SP para insertar un nuevo cargo
CREATE PROCEDURE SPInsertarCargo
    @Nombre VARCHAR(80)
AS
BEGIN
    INSERT INTO Cargo (Nombre)
    VALUES (@Nombre);
END;
GO

-- SP para actualizar un cargo existente
CREATE PROCEDURE SPActualizarCargo
    @Id TINYINT,
    @Nombre VARCHAR(80)
AS
BEGIN
    UPDATE Cargo
    SET Nombre = @Nombre
    WHERE Id = @Id;
END;
GO

-- SP para eliminar un cargo por su Id
CREATE PROCEDURE SPEliminarCargo
    @Id TINYINT
AS
BEGIN
    DELETE FROM Cargo
    WHERE Id = @Id;
END;
GO

-- PROCEDIMIENTO PARA ACTUALIZAR MONTO EN TABLA FONDO //////////////////////FONDO
CREATE PROCEDURE SP_ActualizarMontoFondo
AS
BEGIN
    DECLARE @NuevoMonto DECIMAL(10, 2)

    -- Calcular el nuevo monto sumando los pagos y donaciones
    SELECT @NuevoMonto = ISNULL(SUM(Multa), 0) FROM Pago

    -- Actualizar el monto en la tabla Fondo
    UPDATE Fondo SET MontoTotal = @NuevoMonto
END
GO
--------------------------ADMINISTRADOR 

-- SP para obtener todos los administradores
CREATE PROCEDURE SPObtenerAdministradores
AS
BEGIN
    SELECT * FROM Administrador;
END;
GO

-- SP para obtener un administrador por su Id
CREATE PROCEDURE SPObtenerAdministradorPorId
    @Id BIGINT
AS
BEGIN
    SELECT * FROM Administrador
    WHERE Id = @Id;
END;
GO

-- SP para insertar un nuevo administrador
CREATE PROCEDURE SPInsertarAdministrador
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @IdCargo TINYINT,
    @Telefono VARCHAR(50),
    @Pass VARCHAR(200)
AS
BEGIN
    INSERT INTO Administrador (Nombre, Apellido, IdCargo, Telefono, Pass)
    VALUES (@Nombre, @Apellido, @IdCargo, @Telefono, @Pass);
END;
GO

-- SP para actualizar un administrador existente
CREATE PROCEDURE SPActualizarAdministrador
    @Id BIGINT,
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @IdCargo TINYINT,
    @Telefono VARCHAR(50),
    @Pass VARCHAR(200)
AS
BEGIN
    UPDATE Administrador
    SET Nombre = @Nombre, Apellido = @Apellido, IdCargo = @IdCargo, Telefono = @Telefono, Pass = @Pass
    WHERE Id = @Id;
END;
GO

-- SP para eliminar un administrador por su Id
CREATE PROCEDURE SPEliminarAdministrador
    @Id BIGINT
AS
BEGIN
    DELETE FROM Administrador
    WHERE Id = @Id;
END;
GO

-- SP para autenticaci�n de administrador
CREATE PROCEDURE SPLoginAdministrador
    @Nombre VARCHAR(50),
    @Pass VARCHAR(200)
AS
BEGIN
    DECLARE @AdminId BIGINT

    SELECT @AdminId = Id FROM Administrador
    WHERE Nombre = @Nombre AND Pass = @Pass;

    IF @AdminId IS NOT NULL
        SELECT @AdminId AS Id;
    ELSE
        SELECT NULL AS Id;
END;
GO

----------------ENCARGADO ------------------------
-- SP para obtener todos los encargados
CREATE PROCEDURE SPObtenerEncargados
AS
BEGIN
    SELECT * FROM Encargado;
END;
GO

-- SP para obtener un encargado por su Id
CREATE PROCEDURE SPObtenerEncargadoPorId
    @Id BIGINT
AS
BEGIN
    SELECT * FROM Encargado
    WHERE Id = @Id;
END;
GO

-- SP para insertar un nuevo encargado
CREATE PROCEDURE SPInsertarEncargado
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @IdTipoDoc TINYINT,
    @NumeroDocumento VARCHAR(50),
    @Telefono VARCHAR(50),
    @Direccion TINYINT,
    @Parentezco VARCHAR(50),
    @IdAdministrador BIGINT
AS
BEGIN
    INSERT INTO Encargado (Nombre, Apellido, IdTipoDoc, NumeroDocumento, Telefono, Direccion, Parentezco, IdAdministrador)
    VALUES (@Nombre, @Apellido, @IdTipoDoc, @NumeroDocumento, @Telefono, @Direccion, @Parentezco, @IdAdministrador);
END;
GO

-- SP para actualizar un encargado existente
CREATE PROCEDURE SPActualizarEncargado
    @Id BIGINT,
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @IdTipoDoc TINYINT,
    @NumeroDocumento VARCHAR(50),
    @Telefono VARCHAR(50),
    @Direccion TINYINT,
    @Parentezco VARCHAR(50),
    @IdAdministrador BIGINT
AS
BEGIN
    UPDATE Encargado
    SET Nombre = @Nombre, Apellido = @Apellido, IdTipoDoc = @IdTipoDoc, NumeroDocumento = @NumeroDocumento,
        Telefono = @Telefono, Direccion = @Direccion, Parentezco = @Parentezco, IdAdministrador = @IdAdministrador
    WHERE Id = @Id;
END;
GO

-- SP para eliminar un encargado por su Id
CREATE PROCEDURE SPEliminarEncargado
    @Id BIGINT
AS
BEGIN
    DELETE FROM Encargado
    WHERE Id = @Id;
END;
GO

-------------------ALUMNOOOOOOOOOOOOOOOOOOOOOOOS
-- SP para obtener todos los alumnos
CREATE PROCEDURE SPObtenerAlumnos
AS
BEGIN
    SELECT * FROM Alumno;
END;
GO

-- SP para obtener un alumno por su Id
CREATE PROCEDURE SPObtenerAlumnoPorId
    @Id INT
AS
BEGIN
    SELECT * FROM Alumno
    WHERE Id = @Id;
END;
GO

-- SP para insertar un nuevo alumno
CREATE PROCEDURE SPInsertarAlumno
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @IdGrado TINYINT,
    @IdTipoDoc TINYINT,
    @NumeroDocumento VARCHAR(50),
    @IdEncargado BIGINT,
    @IdTurno TINYINT,
    @IdAdministrador BIGINT
AS
BEGIN
    INSERT INTO Alumno (Nombre, Apellido, IdGrado, IdTipoDoc, NumeroDocumento, IdEncargado, IdTurno, IdAdministrador)
    VALUES (@Nombre, @Apellido, @IdGrado, @IdTipoDoc, @NumeroDocumento, @IdEncargado, @IdTurno, @IdAdministrador);
END;
GO

-- SP para actualizar un alumno existente
CREATE PROCEDURE SPActualizarAlumno
    @Id INT,
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @IdGrado TINYINT,
    @IdTipoDoc TINYINT,
    @NumeroDocumento VARCHAR(50),
    @IdEncargado BIGINT,
    @IdTurno TINYINT,
    @IdAdministrador BIGINT
AS
BEGIN
    UPDATE Alumno
    SET Nombre = @Nombre, Apellido = @Apellido, IdGrado = @IdGrado, IdTipoDoc = @IdTipoDoc,
        NumeroDocumento = @NumeroDocumento, IdEncargado = @IdEncargado, IdTurno = @IdTurno, IdAdministrador = @IdAdministrador
    WHERE Id = @Id;
END;
GO

-- SP para eliminar un alumno por su Id
CREATE PROCEDURE SPEliminarAlumno
    @Id INT
AS
BEGIN
    DELETE FROM Alumno
    WHERE Id = @Id;
END;
GO

---------------------------------PAGO 
-- SP para obtener todos los pagos
CREATE PROCEDURE SPObtenerPagos
AS
BEGIN
    SELECT * FROM Pago;
END;
GO

-- SP para obtener un pago por su Id
CREATE PROCEDURE SPObtenerPagoPorId
    @Id INT
AS
BEGIN
    SELECT * FROM Pago
    WHERE Id = @Id;
END;
GO

-- SP para insertar un nuevo pago
CREATE PROCEDURE SPInsertarPago
    @NumeroFactura INT,
    @IdAlumno INT,
    @IdEncargado BIGINT,
    @Multa DECIMAL(10, 2),
    @FechaRegistro DATE,
    @IdAdministrador BIGINT
AS
BEGIN
    INSERT INTO Pago (NumeroFactura, IdAlumno, IdEncargado, Multa, FechaRegistro, IdAdministrador)
    VALUES (@NumeroFactura, @IdAlumno, @IdEncargado, @Multa, @FechaRegistro, @IdAdministrador);
END;
GO

-- SP para actualizar un pago existente
CREATE PROCEDURE SPActualizarPago
    @Id INT,
    @NumeroFactura INT,
    @IdAlumno INT,
    @IdEncargado BIGINT,
    @Multa DECIMAL(10, 2),
    @FechaRegistro DATE,
    @IdAdministrador BIGINT
AS
BEGIN
    UPDATE Pago
    SET NumeroFactura = @NumeroFactura, IdAlumno = @IdAlumno, IdEncargado = @IdEncargado, Multa = @Multa,
        FechaRegistro = @FechaRegistro, IdAdministrador = @IdAdministrador
    WHERE Id = @Id;
END;
GO

-- SP para eliminar un pago por su Id
CREATE PROCEDURE SPEliminarPago
    @Id INT
AS
BEGIN
    DELETE FROM Pago
    WHERE Id = @Id;
END;
GO

-------------------//////////////////////// MULTA
-- SP para obtener todas las multas
CREATE PROCEDURE SPObtenerMultas
AS
BEGIN
    SELECT * FROM Multa;
END;
GO

-- SP para obtener una multa por su Id
CREATE PROCEDURE SPObtenerMultaPorId
    @Id INT
AS
BEGIN
    SELECT * FROM Multa
    WHERE Id = @Id;
END;
GO

-- SP para insertar una nueva multa
CREATE PROCEDURE SPInsertarMulta
    @Nombre VARCHAR(50),
    @IdPago INT
AS
BEGIN
    INSERT INTO Multa (Nombre, IdPago)
    VALUES (@Nombre, @IdPago);
END;
GO

-- SP para actualizar una multa existente
CREATE PROCEDURE SPActualizarMulta
    @Id INT,
    @Nombre VARCHAR(50),
    @IdPago INT
AS
BEGIN
    UPDATE Multa
    SET Nombre = @Nombre,
        IdPago = @IdPago
    WHERE Id = @Id;
END;
GO

-- SP para eliminar una multa por su Id
CREATE PROCEDURE SPEliminarMulta
    @Id INT
AS
BEGIN
    DELETE FROM Multa
    WHERE Id = @Id;
END;
GO
	
---------------------------------////FACTURAAAAAAAAAAA
-- SP para obtener todas las facturas
CREATE PROCEDURE SPObtenerFacturas
AS
BEGIN
    SELECT * FROM Factura;
END;
GO

-- SP para obtener una factura por su Id
CREATE PROCEDURE SPObtenerFacturaPorId
    @Id INT
AS
BEGIN
    SELECT * FROM Factura
    WHERE Id = @Id;
END;
GO

-- SP para insertar una nueva factura
CREATE PROCEDURE SPInsertarFactura
    @IdPago INT
AS
BEGIN
    INSERT INTO Factura (IdPago)
    VALUES (@IdPago);
END;
GO

-- SP para actualizar una factura existente
CREATE PROCEDURE SPActualizarFactura
    @Id INT,
    @IdPago INT
AS
BEGIN
    UPDATE Factura
    SET IdPago = @IdPago
    WHERE Id = @Id;
END;
GO

-- SP para eliminar una factura por su Id
CREATE PROCEDURE SPEliminarFactura
    @Id INT
AS
BEGIN
    DELETE FROM Factura
    WHERE Id = @Id;
END;
GO
-----------SUMAR EL FONDO ACTUAL MAS EL QUE SE REGISTE, TABLA FONDO
CREATE PROCEDURE SP_SumarPagosDonacionesAlFondo
    @Monto DECIMAL(10, 2)
AS
BEGIN
    UPDATE Fondo
    SET Monto = Monto + @Monto;
END;
GO
