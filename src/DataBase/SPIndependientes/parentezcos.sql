-- SP para obtener todos los parentezcos
ALTER PROCEDURE SPObtenerParentezcos
AS
BEGIN
    SELECT * FROM Parentezco;
END;
GO

-- SP para obtener un parentezco por su Id
ALTER PROCEDURE SPObtenerParentezcoPorId
    @Id TINYINT
AS
BEGIN
    SELECT * FROM Parentezco
    WHERE Id = @Id;
END;
GO

-- SP para insertar un nuevo parentezco
ALTER PROCEDURE SPInsertarParentezco
    @Nombre VARCHAR(50)
AS
BEGIN
    INSERT INTO Parentezco (Nombre)
    VALUES (@Nombre);
END;
GO

-- SP para actualizar un parentezco existente
ALTER PROCEDURE SPActualizarParentezco
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
ALTER PROCEDURE SPEliminarParentezco
    @Id TINYINT
AS
BEGIN
    DELETE FROM Parentezco
    WHERE Id = @Id;
END;
GO