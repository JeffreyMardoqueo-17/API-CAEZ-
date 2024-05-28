select * from Alumno where IdGrupo = 2;
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
