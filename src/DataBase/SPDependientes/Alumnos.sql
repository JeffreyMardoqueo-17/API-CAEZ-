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

cREATE PROCEDURE SPActualizarAlumno
    @IdAlumno INT,
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

    -- Actualizar el alumno con el grupo correspondiente
    UPDATE Alumno
    SET Nombre = @Nombre,
        Apellido = @Apellido,
        FechaNacimiento = @FechaNacimiento,
        IdSexo = @IdSexo,
        IdRole = @IdRole,
        IdEncargado = @IdEncargado,
        IdEnfermedad = @IdEnfermedad,
        IdTipoDocumento = @IdTipoDocumento,
        NumDocumento = @NumDocumento,
        IdGrado = @IdGrado,
        IdGrupo = @IdGrupo,
        IdTurno = @IdTurno,
        IdAdministrador = @IdAdministrador,
        IdPadrino = @IdPadrino,
        EsBecado = @EsBecado
    WHERE Id = @IdAlumno;

    SELECT @IdAlumno AS IdAlumno;
END

GO

CREATE PROCEDURE SPActualizarAlumno
    @IdAlumno INT,
    @Nombre VARCHAR(50) = NULL,
    @Apellido VARCHAR(50) = NULL,
    @FechaNacimiento DATE = NULL,
    @IdSexo INT = NULL,
    @IdRole INT = NULL,
    @IdEncargado INT = NULL,
    @IdEnfermedad INT = NULL,
    @IdTipoDocumento INT = NULL,
    @NumDocumento VARCHAR(50) = NULL,
    @IdGrado INT = NULL,
    @IdTurno INT = NULL,
    @IdAdministrador INT = NULL,
    @IdPadrino INT = NULL,
    @EsBecado BIT = NULL
AS
BEGIN
    DECLARE @IdGrupo INT;

    -- Verificar si ya existe un grupo para el grado del alumno
    IF @IdGrado IS NOT NULL
    BEGIN
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
    END

    -- Actualizar el alumno con el grupo correspondiente
    UPDATE Alumno
    SET Nombre = COALESCE(@Nombre, Nombre),
        Apellido = COALESCE(@Apellido, Apellido),
        FechaNacimiento = COALESCE(@FechaNacimiento, FechaNacimiento),
        IdSexo = COALESCE(@IdSexo, IdSexo),
        IdRole = COALESCE(@IdRole, IdRole),
        IdEncargado = COALESCE(@IdEncargado, IdEncargado),
        IdEnfermedad = COALESCE(@IdEnfermedad, IdEnfermedad),
        IdTipoDocumento = COALESCE(@IdTipoDocumento, IdTipoDocumento),
        NumDocumento = COALESCE(@NumDocumento, NumDocumento),
        IdGrado = COALESCE(@IdGrado, IdGrado),
        IdGrupo = COALESCE(@IdGrupo, IdGrupo),
        IdTurno = COALESCE(@IdTurno, IdTurno),
        IdAdministrador = COALESCE(@IdAdministrador, IdAdministrador),
        IdPadrino = COALESCE(@IdPadrino, IdPadrino),
        EsBecado = COALESCE(@EsBecado, EsBecado)
    WHERE Id = @IdAlumno;

    SELECT @IdAlumno AS IdAlumno;
END
GO

CREATE PROCEDURE SPTraerAlumnoPorId
    @Id INT
AS
BEGIN
    SELECT 
        a.Id,
        a.Nombre,
        a.Apellido,
        a.FechaNacimiento,
        s.Nombre AS Sexo,
        r.[Name] AS Role,
        CONCAT(e.Nombre, ' ', e.Apellido) AS Encargado, -- Concatenamos Nombre y Apellido
        enf.Nombre AS Enfermedad,
        td.Nombre AS TipoDocumento,
		a.NumDocumento,  -- Aquí agregamos la columna NumDocumento
        g.Nombre AS Grado,
        t.Nombre AS Turno,
        adm.[Name] AS Administrador,
        p.Nombre AS Padrino,
        a.FechaRegistro,
        a.EsBecado,
        gr.Nombre AS Grupo
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
    INNER JOIN Grupo gr ON a.IdGrupo = gr.Id
    WHERE a.Id = @Id;
END
GO

CREATE PROCEDURE SPTraerTodosLosAlumnos
AS
BEGIN
    SELECT 
        a.Id,
        a.Nombre,
        a.Apellido,
        a.FechaNacimiento,
        s.Nombre AS Sexo,
        r.[Name] AS [Role],
        CONCAT(e.Nombre, ' ', e.Apellido) AS Encargado, -- Concatenamos Nombre y Apellido
        enf.Nombre AS Enfermedad,
        td.Nombre AS TipoDocumento,
		a.NumDocumento,  -- Aquí agregamos la columna NumDocumento
        g.Nombre AS Grado,
        t.Nombre AS Turno,
        adm.[Name] AS Administrador,
        p.Nombre AS Padrino,
        a.FechaRegistro,
        a.EsBecado,
        gr.Nombre AS Grupo
    FROM Alumno a
    INNER JOIN Sexo s ON a.IdSexo = s.Id
    INNER JOIN Role r ON a.IdRole = r.Id
    INNER JOIN Encargado e ON a.IdEncargado = e.Id
    LEFT JOIN Enfermedad enf ON a.IdEnfermedad = enf.Id -- LEFT JOIN para permitir valores nulos
    INNER JOIN TipoDocumento td ON a.IdTipoDocumento = td.Id
    INNER JOIN Grado g ON a.IdGrado = g.Id
    INNER JOIN Turno t ON a.IdTurno = t.Id
    INNER JOIN [User] adm ON a.IdAdministrador = adm.Id
    LEFT JOIN Padrino p ON a.IdPadrino = p.Id -- LEFT JOIN para permitir valores nulos
    INNER JOIN Grupo gr ON a.IdGrupo = gr.Id;
END
GO


CREATE PROCEDURE SPGetAlumnosPorGrupo
    @Grupo NVARCHAR(50)
AS
BEGIN
    SELECT 
        a.Id,
        a.Nombre,
        a.Apellido,
        a.FechaNacimiento,
        s.Nombre AS Sexo,
        r.[Name] AS Role,
        CONCAT(e.Nombre, ' ', e.Apellido) AS Encargado, -- Concatenamos Nombre y Apellido
        enf.Nombre AS Enfermedad,
        td.Nombre AS TipoDocumento,
        a.NumDocumento,  -- Aquí agregamos la columna NumDocumento
        g.Nombre AS Grado,
        t.Nombre AS Turno,
        adm.[Name] AS Administrador,
        p.Nombre AS Padrino,
        a.FechaRegistro,
        a.EsBecado,
        gr.Nombre AS Grupo
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
    INNER JOIN Grupo gr ON a.IdGrupo = gr.Id
    WHERE gr.Nombre = @Grupo;
END
GO
CREATE PROCEDURE SPBuscarAlumnosPorNombre
    @TextoBusqueda NVARCHAR(50)
AS
BEGIN
    SELECT 
        a.Id,
        a.Nombre,
        a.Apellido,
        a.FechaNacimiento,
        s.Nombre AS Sexo,
        r.[Name] AS Role,
        CONCAT(e.Nombre, ' ', e.Apellido) AS Encargado, -- Concatenamos Nombre y Apellido
        enf.Nombre AS Enfermedad,
        td.Nombre AS TipoDocumento,
        g.Nombre AS Grado,
        t.Nombre AS Turno,
        adm.[Name] AS Administrador,
        p.Nombre AS Padrino,
        a.FechaRegistro,
        a.EsBecado,
        gr.Nombre AS Grupo
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
    INNER JOIN Grupo gr ON a.IdGrupo = gr.Id
    WHERE a.Nombre LIKE '%' + @TextoBusqueda + '%'
       OR a.Apellido LIKE '%' + @TextoBusqueda + '%';
END
GO

CREATE PROCEDURE SPGetAlumnosPorBecaStatus
    @EsBecado BIT
AS
BEGIN
    SELECT 
        a.Id,
        a.Nombre,
        a.Apellido,
        a.FechaNacimiento,
        s.Nombre AS Sexo,
        r.[Name] AS Role,
        CONCAT(e.Nombre, ' ', e.Apellido) AS Encargado, -- Concatenamos Nombre y Apellido
        enf.Nombre AS Enfermedad,
        td.Nombre AS TipoDocumento,
        a.NumDocumento,  -- Aquí agregamos la columna NumDocumento
        g.Nombre AS Grado,
        t.Nombre AS Turno,
        adm.[Name] AS Administrador,
        p.Nombre AS Padrino,
        a.FechaRegistro,
        a.EsBecado,
        gr.Nombre AS Grupo
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
    INNER JOIN Grupo gr ON a.IdGrupo = gr.Id
    WHERE a.EsBecado = @EsBecado;
END
GO

CREATE PROCEDURE SPFiltrarOrdenarAlumnos
    @Orden nvarchar(20)
AS
BEGIN
    SELECT 
        a.Id,
        a.Nombre,
        a.Apellido,
        a.FechaNacimiento,
        s.Nombre AS Sexo,
        r.[Name] AS [Role],
        CONCAT(e.Nombre, ' ', e.Apellido) AS Encargado,
        enf.Nombre AS Enfermedad,
        td.Nombre AS TipoDocumento,
        a.NumDocumento,
        g.Nombre AS Grado,
        t.Nombre AS Turno,
        adm.[Name] AS Administrador,
        p.Nombre AS Padrino,
        a.FechaRegistro,
        a.EsBecado,
        gr.Nombre AS Grupo
    FROM Alumno a
    INNER JOIN Sexo s ON a.IdSexo = s.Id
    INNER JOIN Role r ON a.IdRole = r.Id
    INNER JOIN Encargado e ON a.IdEncargado = e.Id
    LEFT JOIN Enfermedad enf ON a.IdEnfermedad = enf.Id
    INNER JOIN TipoDocumento td ON a.IdTipoDocumento = td.Id
    INNER JOIN Grado g ON a.IdGrado = g.Id
    INNER JOIN Turno t ON a.IdTurno = t.Id
    INNER JOIN [User] adm ON a.IdAdministrador = adm.Id
    LEFT JOIN Padrino p ON a.IdPadrino = p.Id
    INNER JOIN Grupo gr ON a.IdGrupo = gr.Id
    ORDER BY
        CASE 
            WHEN @Orden = 'NombreAsc' THEN a.Nombre
            WHEN @Orden = 'NombreDesc' THEN a.Nombre
            ELSE NULL
        END ASC,
        CASE 
            WHEN @Orden = 'NombreDesc' THEN a.Nombre
            ELSE NULL
        END DESC,
        CASE 
            WHEN @Orden = 'FechaRegistro' THEN a.FechaRegistro
            ELSE NULL
        END DESC;
END
GO
