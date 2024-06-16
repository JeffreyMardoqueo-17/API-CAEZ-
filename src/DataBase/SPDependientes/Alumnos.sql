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
