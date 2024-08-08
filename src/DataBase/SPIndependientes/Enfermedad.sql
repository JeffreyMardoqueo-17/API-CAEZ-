-- -------------------------
-- TABLA Enfermedad
-- CREATE TABLE Enfermedad(
--     Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
--     Nombre VARCHAR(50) NOT NULL,
--     Descripcion VARCHAR(MAX) NOT NULL
-- );
-- GO
-- -------------------------

-- Stored Procedure para Crear Enfermedad
CREATE PROCEDURE SPEnfermedadCreate
    @Nombre VARCHAR(50),
    @Descripcion VARCHAR(MAX)
AS
BEGIN
    -- Inserta un nuevo registro en la tabla Enfermedad
    INSERT INTO Enfermedad (Nombre, Descripcion)
    VALUES (@Nombre, @Descripcion);

    -- Devuelve el Id del registro recién insertado
    SELECT SCOPE_IDENTITY() AS Id;
END;
GO

-- Stored Procedure para Traer Todas las Enfermedades o una Enfermedad por ID
CREATE PROCEDURE SPEnfermedadGet
    @Id INT = NULL -- Si @Id es NULL, devolverá todas las enfermedades
AS
BEGIN
    IF @Id IS NULL
    BEGIN
        -- Devuelve todos los registros de Enfermedad
        SELECT * FROM Enfermedad;
    END
    ELSE
    BEGIN
        -- Devuelve el registro de Enfermedad con el Id especificado
        SELECT * FROM Enfermedad WHERE Id = @Id;
    END
END;
GO

-- Stored Procedure para Traer Enfermedad por ID
CREATE PROCEDURE SPGetEnfermedadPorId
    @Id INT
AS
BEGIN
    -- Devuelve el registro de Enfermedad con el Id especificado
    SELECT * FROM Enfermedad
    WHERE Id = @Id;
END;
GO

-- Stored Procedure para Actualizar Enfermedad
CREATE PROCEDURE SPEnfermedadUpdate
    @Id INT,
    @Nombre VARCHAR(50),
    @Descripcion VARCHAR(MAX)
AS
BEGIN
    -- Actualiza el registro de Enfermedad con el Id especificado
    UPDATE Enfermedad
    SET Nombre = @Nombre,
        Descripcion = @Descripcion
    WHERE Id = @Id;
    
    -- Devuelve el registro actualizado
    SELECT * FROM Enfermedad WHERE Id = @Id;
END;
GO

-- Stored Procedure para Eliminar Enfermedad
CREATE PROCEDURE SPEnfermedadDelete
    @Id INT
AS
BEGIN
    -- Elimina el registro de Enfermedad con el Id especificado
    DELETE FROM Enfermedad
    WHERE Id = @Id;
END;
GO
