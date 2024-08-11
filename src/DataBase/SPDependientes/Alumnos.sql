CREATE PROCEDURE SPCrearAlumno
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @FechaNacimiento DATE,
    @IdSexo INT,
    @IdRole INT,
    @IdEncargado INT,
    @IdEnfermedad INT = NULL,
    @IdTipoDocumento INT,
    @NumDocumento VARCHAR(50),
    @IdGrado INT,
    @IdTurno INT,
    @IdAdministrador INT,
    @IdPadrino INT = NULL,
    @EsBecado BIT = 0
AS
BEGIN
    BEGIN TRY
        -- Inicio de la transacción
        BEGIN TRANSACTION;

        -- Insertar nuevo alumno en la tabla Alumno
        INSERT INTO Alumno (Nombre, Apellido, FechaNacimiento, IdSexo, IdRole, IdEncargado, IdEnfermedad, IdTipoDocumento, NumDocumento, IdTurno, IdAdministrador, IdPadrino, FechaRegistro, EsBecado)
        VALUES (@Nombre, @Apellido, @FechaNacimiento, @IdSexo, @IdRole, @IdEncargado, @IdEnfermedad, @IdTipoDocumento, @NumDocumento, @IdTurno, @IdAdministrador, @IdPadrino, GETDATE(), @EsBecado);

        -- Obtener el Id del alumno recién creado
        DECLARE @IdAlumno INT = SCOPE_IDENTITY();

        -- Verificar si el alumno ya está asignado a ese grado
        IF NOT EXISTS (SELECT 1 FROM AlumnoGrado WHERE IdAlumno = @IdAlumno AND IdGrado = @IdGrado)
        BEGIN
            -- Si no está asignado, insertar la relación en AlumnoGrado
            INSERT INTO AlumnoGrado (IdAlumno, IdGrado)
            VALUES (@IdAlumno, @IdGrado);
        END
        ELSE
        BEGIN
            -- Si ya está asignado, lanzar un error o mensaje personalizado
            RAISERROR('El alumno ya está asignado a este grado.', 16, 1);
        END
        -- Confirmar la transacción
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Si ocurre un error, revertir la transacción
        ROLLBACK TRANSACTION;
        THROW; -- Lanzar el error para que se muestre en el cliente
    END CATCH
END;
GO
