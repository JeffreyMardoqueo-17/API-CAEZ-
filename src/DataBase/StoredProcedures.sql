-----------------------///TABLA TURNO////////////----------------------------

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

-- SP para obtener una dirección por su Id
CREATE PROCEDURE SPObtenerDireccionPorId
    @Id TINYINT
AS
BEGIN
    SELECT * FROM Direccion
    WHERE Id = @Id;
END;
GO

-- SP para insertar una nueva dirección
CREATE PROCEDURE SPInsertarDireccion
    @Nombre VARCHAR(200)
AS
BEGIN
    INSERT INTO Direccion (Nombre)
    VALUES (@Nombre);
END;
GO

-- SP para actualizar una dirección existente
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

-- SP para eliminar una dirección por su Id
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



