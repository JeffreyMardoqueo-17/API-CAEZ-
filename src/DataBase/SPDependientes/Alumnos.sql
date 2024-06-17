-- CREAR ALUMNOS
ALTER PROCEDURE SPCrearAlumno
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

-- MODIFICAR ALUMNOS
ALTER PROCEDURE SPModificarAlumno
    @Id INT,
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @FechaNacimiento DATE,
    @Sexo VARCHAR(50),
    @Role VARCHAR(50),
    @Encargado VARCHAR(50),
    @Enfermedad VARCHAR(50),
    @TipoDocumento VARCHAR(50),
    @NumDocumento VARCHAR(50),
    @Grado VARCHAR(50),
    @Turno VARCHAR(50),
    @Administrador VARCHAR(50),
    @Padrino VARCHAR(50),
    @FechaRegistro DATETIME,
    @EsBecado BIT
AS
BEGIN
    UPDATE Alumno
    SET Nombre = @Nombre,
        Apellido = @Apellido,
        FechaNacimiento = @FechaNacimiento,
        IdSexo = (SELECT Id FROM Sexo WHERE Nombre = @Sexo),
        IdRole = (SELECT Id FROM Role WHERE Nombre = @Role),
        IdEncargado = (SELECT Id FROM Encargado WHERE Nombre = @Encargado),
        IdEnfermedad = (SELECT Id FROM Enfermedad WHERE Descripcion = @Enfermedad),
        IdTipoDocumento = (SELECT Id FROM TipoDocumento WHERE Nombre = @TipoDocumento),
        NumDocumento = @NumDocumento,
        IdGrado = (SELECT Id FROM Grado WHERE Nombre = @Grado),
        IdTurno = (SELECT Id FROM Turno WHERE Nombre = @Turno),
        IdAdministrador = (SELECT Id FROM [User] WHERE [Name] = @Administrador),
        IdPadrino = (SELECT Id FROM Padrino WHERE Nombre = @Padrino),
        FechaRegistro = @FechaRegistro,
        EsBecado = @EsBecado
    WHERE Id = @Id;
END
GO

-- TRAER ALUMNOS POR ID
ALTER PROCEDURE SPTraerAlumnoPorId
    @Id INT
AS
BEGIN
    SELECT a.*, 
            s.Nombre AS Sexo, 
            r.[Name] AS [Role], 
            e.Nombre AS Encargado, 
            enf.Nombre AS Enfermedad, 
            td.Nombre AS TipoDocumento, 
            g.Nombre AS Grado, 
            t.Nombre AS Turno, 
            adm.[Name] AS Administrador, 
            p.Nombre AS Padrino
    FROM Alumno a
    INNER JOIN Sexo s ON a.IdSexo = s.Id
    INNER JOIN Role r ON a.IdRole = r.Id
    INNER JOIN Encargado e ON a.IdEncargado = e.Id
    INNER JOIN Enfermedad enf ON a.IdEnfermedad = enf.Id
    INNER JOIN TipoDocumento td ON a.IdTipoDocumento = td.Id
    INNER JOIN Grado g ON a.IdGrado = g.Id
    INNER JOIN Turno t ON a.IdTurno = t.Id
    INNER JOIN [User] adm ON a.IdAdministrador = adm.Id
    INNER JOIN Padrino p ON a.IdPadrino = p.Id
    WHERE a.Id = @Id;
END
GO

-- TRAER A TODOS LOS ALUMNOS
ALTER PROCEDURE SPTraerTodosLosAlumnos
AS
BEGIN
    SELECT a.*, 
            s.Nombre AS Sexo, 
            r.[Name] AS [Role], 
            e.Nombre AS Encargado, 
            enf.Nombre AS Enfermedad, 
            td.Nombre AS TipoDocumento, 
            g.Nombre AS Grado, 
            t.Nombre AS Turno, 
            adm.[Name] AS Administrador, 
            p.Nombre AS Padrino
    FROM Alumno a
    INNER JOIN Sexo s ON a.IdSexo = s.Id
    INNER JOIN Role r ON a.IdRole = r.Id
    INNER JOIN Encargado e ON a.IdEncargado = e.Id
    INNER JOIN Enfermedad enf ON a.IdEnfermedad = enf.Id
    INNER JOIN TipoDocumento td ON a.IdTipoDocumento = td.Id
    INNER JOIN Grado g ON a.IdGrado = g.Id
    INNER JOIN Turno t ON a.IdTurno = t.Id
    INNER JOIN [User] adm ON a.IdAdministrador = adm.Id
    INNER JOIN Padrino p ON a.IdPadrino = p.Id;
END
GO

-- ELIMINAR ALUMNOS
ALTER PROCEDURE SPEliminarAlumno
    @Id INT
AS
BEGIN
    DELETE FROM Alumno
    WHERE Id = @Id;
END
GO

-- BUSCAR ALUMNOS POR NOMBRES
ALTER PROCEDURE SPBuscarAlumnosPorNombre
    @TextoBusqueda VARCHAR(50)
AS
BEGIN  
    SELECT a.*, 
            s.Nombre AS Sexo, 
            r.[Name] AS [Role], 
            e.Nombre AS Encargado, 
            enf.Nombre AS Enfermedad, 
            td.Nombre AS TipoDocumento, 
            g.Nombre AS Grado, 
            t.Nombre AS Turno, 
            adm.[Name] AS Administrador, 
            p.Nombre AS Padrino
    FROM Alumno a
    INNER JOIN Sexo s ON a.IdSexo = s.Id
    INNER JOIN Role r ON a.IdRole = r.Id
    INNER JOIN Encargado e ON a.IdEncargado = e.Id
    INNER JOIN Enfermedad enf ON a.IdEnfermedad = enf.Id
    INNER JOIN TipoDocumento td ON a.IdTipoDocumento = td.Id
    INNER JOIN Grado g ON a.IdGrado = g.Id
    INNER JOIN Turno t ON a.IdTurno = t.Id
    INNER JOIN [User] adm ON a.IdAdministrador = adm.Id
    INNER JOIN Padrino p ON a.IdPadrino = p.Id
    WHERE a.Nombre LIKE '%' + @TextoBusqueda + '%' 
    OR a.Apellido LIKE '%' + @TextoBusqueda + '%';
END
GO

-- BUSCAR ALUMNOS POR GRADO
ALTER PROCEDURE SPBuscarAlumnosPorGrado
    @Grado VARCHAR(50)
AS
BEGIN
    SELECT a.*, 
            s.Nombre AS Sexo, 
            r.[Name] AS [Role], 
            e.Nombre AS Encargado, 
            enf.Nombre AS Enfermedad, 
            td.Nombre AS TipoDocumento, 
            g.Nombre AS Grado, 
            t.Nombre AS Turno, 
            adm.[Name] AS Administrador, 
            p.Nombre AS Padrino
    FROM Alumno a
    INNER JOIN Sexo s ON a.IdSexo = s.Id
    INNER JOIN Role r ON a.IdRole = r.Id
    INNER JOIN Encargado e ON a.IdEncargado = e.Id
    INNER JOIN Enfermedad enf ON a.IdEnfermedad = enf.Id
    INNER JOIN TipoDocumento td ON a.IdTipoDocumento = td.Id
    INNER JOIN Grado g ON a.IdGrado = g.Id
    INNER JOIN Turno t ON a.IdTurno = t.Id
    INNER JOIN [User] adm ON a.IdAdministrador = adm.Id
    INNER JOIN Padrino p ON a.IdPadrino = p.Id
    WHERE g.Nombre = @Grado;
END
GO

-- BUSCAR ALUMNOS POR BECA
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
END
GO

-- OBTENER ALUMNOS POR GRADO
ALTER PROCEDURE SPGetAlumnosPorGrado
    @Grado VARCHAR(50)
AS
BEGIN
    SELECT a.*
    FROM Alumno a
    INNER JOIN Grado g ON a.IdGrado = g.Id
    WHERE g.Nombre = @Grado;
END
GO
