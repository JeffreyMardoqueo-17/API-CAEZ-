ALTER PROCEDURE SPBuscarAlumnosPorBeca
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

    -- Agregamos una consulta para obtener los detalles de todos los alumnos becados
    SELECT *
    FROM Alumno
    WHERE EsBecado = 1;
END
GO