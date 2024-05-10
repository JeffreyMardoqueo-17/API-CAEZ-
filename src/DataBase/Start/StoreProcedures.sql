--SP DE DIRECCIONES
CREATE PROCEDURE SPObtenerDirecciones
AS
BEGIN
    SELECT * FROM Direccion;
END;
GO
CREATE PROCEDURE SPObtenerDireccionPorId
    @Id INT
AS
BEGIN
    SELECT * FROM Direccion
    WHERE Id = @Id;
END;
GO
CREATE PROCEDURE SPInsertarDireccion
    @Nombre VARCHAR(200)
AS
BEGIN
    INSERT INTO Direccion (Nombre)
    VALUES (@Nombre);
END;
GO
CREATE PROCEDURE SPActualizarDireccion
    @Id INT,
    @Nombre VARCHAR(200)
AS
BEGIN
    UPDATE Direccion
    SET Nombre = @Nombre
    WHERE Id = @Id;
END;
GO
CREATE PROCEDURE SPEliminarDireccion
    @Id INT
AS
BEGIN
    DELETE FROM Direccion
    WHERE Id = @Id;
END;
GO
CREATE PROCEDURE SPBuscarDireccionesPorTexto
    @TextoBusqueda VARCHAR(200)
AS
BEGIN
    SELECT * FROM Direccion
    WHERE Nombre LIKE '%' + @TextoBusqueda + '%';
END;
GO
--================================================ SP DE TURNOS
-- SP para obtener todos los turnos
CREATE PROCEDURE SPObtenerTurnos
AS
BEGIN
    SELECT * FROM Turno;
END;
GO

-- SP para obtener un turno por su Id
CREATE PROCEDURE SPObtenerTurnoPorId
    @Id INT
AS
BEGIN
    SELECT * FROM Turno
    WHERE Id = @Id;
END;
GO

-- SP para insertar un nuevo turno
CREATE PROCEDURE SPInsertarTurno
    @Nombre VARCHAR(80)
AS
BEGIN
    INSERT INTO Turno (Nombre)
    VALUES (@Nombre);
END;
GO

-- SP para actualizar un turno existente
CREATE PROCEDURE SPActualizarTurno
    @Id INT,
    @Nombre VARCHAR(80)
AS
BEGIN
    UPDATE Turno
    SET Nombre = @Nombre
    WHERE Id = @Id;
END;
GO

-- SP para eliminar un turno por su Id
CREATE PROCEDURE SPEliminarTurno
    @Id INT
AS
BEGIN
    DELETE FROM Turno
    WHERE Id = @Id;
END;
GO
---==========================================SP PARA GRADO 
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
---------------------===================================-----//TIPO DOCUMENTO 
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
CREATE PROCEDURE SPBuscarTipoDocumentosPorTexto
    @TextoBusqueda VARCHAR(80)
AS
BEGIN
    SELECT * FROM TipoDocumento
    WHERE Nombre LIKE '%' + @TextoBusqueda + '%';
END;
GO
--=======================================================TIPO DE PAGOS 
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
CREATE PROCEDURE SPBuscarTipoPagoPorTexto
    @TextoBusqueda VARCHAR(80)
AS
BEGIN
    SELECT * FROM TipoPago
    WHERE Nombre LIKE '%' + @TextoBusqueda + '%';
END;
GO
-----=============================================PARENTEZCO
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

-- sp para buscar por texto
CREATE PROCEDURE SPBuscarParentezcoPorTexto
    @TextoBusqueda VARCHAR(50)
AS
BEGIN
    SELECT * FROM Parentezco
    WHERE Nombre LIKE '%' + @TextoBusqueda + '%';
END;
GO


--================================================ENFERMEDADES
-- SP para obtener todas las enfermedades
CREATE PROCEDURE SPObtenerEnfermedades
AS
BEGIN
    SELECT * FROM Enfermedad;
END;
GO

-- SP para obtener una enfermedad por su Id
CREATE PROCEDURE SPObtenerEnfermedadPorId
    @Id INT
AS
BEGIN
    SELECT * FROM Enfermedad
    WHERE Id = @Id;
END;
GO

-- SP para insertar una nueva enfermedad
CREATE PROCEDURE SPInsertarEnfermedad
    @Nombre VARCHAR(50),
    @Descripcion VARCHAR(MAX)
AS
BEGIN
    INSERT INTO Enfermedad (Nombre, Descripcion)
    VALUES (@Nombre, @Descripcion);
END;
GO

-- SP para actualizar una enfermedad existente
CREATE PROCEDURE SPActualizarEnfermedad
    @Id INT,
    @Nombre VARCHAR(50),
    @Descripcion VARCHAR(MAX)
AS
BEGIN
    UPDATE Enfermedad
    SET Nombre = @Nombre,
        Descripcion = @Descripcion
    WHERE Id = @Id;
END;
GO

-- SP para eliminar una enfermedad por su Id
CREATE PROCEDURE SPEliminarEnfermedad
    @Id INT
AS
BEGIN
    DELETE FROM Enfermedad
    WHERE Id = @Id;
END;
GO
-- SP para buscar enfermedades por texto en el nombre o descripción
CREATE PROCEDURE SPBuscarEnfermedadesPorTexto
    @TextoBusqueda VARCHAR(MAX)
AS
BEGIN
    SELECT * FROM Enfermedad
    WHERE Nombre LIKE '%' + @TextoBusqueda + '%'
    OR Descripcion LIKE '%' + @TextoBusqueda + '%';
END;
GO
---=================================MES==============
-- SP para obtener un mes por su nombre
CREATE PROCEDURE SPObtenerMesPorNombre
    @Nombre VARCHAR(50)
AS
BEGIN
    SELECT * FROM Mes
    WHERE Nombre = @Nombre;
END;
GO
CREATE PROCEDURE SPObtenerMeses
AS
BEGIN
    SELECT * FROM Mes;
END;
GO
-- SP para obtener todos los roles
CREATE PROCEDURE SPObtenerRoles
AS
BEGIN
    SELECT * FROM [Role];
END;
GO

-- SP para obtener un rol por su Id
CREATE PROCEDURE SPObtenerRolPorId
    @Id INT
AS
BEGIN
    SELECT * FROM [Role]
    WHERE Id = @Id;
END;
GO

-- SP para insertar un nuevo rol
CREATE PROCEDURE SPInsertarRol
    @Name VARCHAR(30)
AS
BEGIN
    INSERT INTO [Role] ([Name])
    VALUES (@Name);
END;
GO

-- SP para actualizar un rol existente
CREATE PROCEDURE SPActualizarRol
    @Id INT,
    @Name VARCHAR(30)
AS
BEGIN
    UPDATE [Role]
    SET [Name] = @Name
    WHERE Id = @Id;
END;
GO

-- SP para eliminar un rol por su Id
CREATE PROCEDURE SPEliminarRol
    @Id INT
AS
BEGIN
    DELETE FROM [Role]
    WHERE Id = @Id;
END;
GO
