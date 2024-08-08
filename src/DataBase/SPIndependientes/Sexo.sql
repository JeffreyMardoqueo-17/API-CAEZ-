-- -------------------------
-- TABLA Sexo
-- CREATE TABLE Sexo (
--     Id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
--     Nombre VARCHAR(10) NOT NULL
-- );
-- GO
-- -------------------------

-- Stored Procedure para Crear Sexo
CREATE PROCEDURE SPSexoCreate
    @Nombre VARCHAR(10)
AS
BEGIN
    -- Inserta un nuevo registro en la tabla Sexo
    INSERT INTO Sexo (Nombre)
    VALUES (@Nombre);

    -- Devuelve el Id del registro recién insertado
    SELECT SCOPE_IDENTITY() AS Id;
END;
GO

-- Stored Procedure para Traer Todos los Sexos o un Sexo por ID
CREATE PROCEDURE SPSexoGet
    @Id INT = NULL -- Si @Id es NULL, devolverá todos los sexos
AS
BEGIN
    IF @Id IS NULL
    BEGIN
        -- Devuelve todos los registros de Sexo
        SELECT * FROM Sexo;
    END
    ELSE
    BEGIN
        -- Devuelve el registro de Sexo con el Id especificado
        SELECT * FROM Sexo WHERE Id = @Id;
    END
END;
GO

-- Stored Procedure para Traer Sexo por ID
CREATE PROCEDURE SPGetSexoPorId
    @Id INT
AS
BEGIN
    -- Devuelve el registro de Sexo con el Id especificado
    SELECT * FROM Sexo
    WHERE Id = @Id;
END;
GO

-- Stored Procedure para Actualizar Sexo
CREATE PROCEDURE SPSexoUpdate
    @Id INT,
    @Nombre VARCHAR(10)
AS
BEGIN
    -- Actualiza el registro de Sexo con el Id especificado
    UPDATE Sexo
    SET Nombre = @Nombre
    WHERE Id = @Id;
    
    -- Devuelve el registro actualizado
    SELECT * FROM Sexo WHERE Id = @Id;
END;
GO

-- Stored Procedure para Eliminar Sexo
CREATE PROCEDURE SPSexoDelete
    @Id INT
AS
BEGIN
    -- Elimina el registro de Sexo con el Id especificado
    DELETE FROM Sexo
    WHERE Id = @Id;
END;
GO
