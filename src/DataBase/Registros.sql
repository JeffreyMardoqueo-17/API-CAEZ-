-- SP para obtener todos los usuarios con su rol
ALTER PROCEDURE SPObtenerUsuarios
AS
BEGIN
    SELECT u.*, r.[Name]
    FROM [User] u
    JOIN Role r ON u.IdRole = r.Id;
END;
GO

-- SP para obtener un usuario por su Id con su rol
ALTER PROCEDURE SPObtenerUsuarioPorId
    @Id INT
AS
BEGIN
    SELECT u.*, r.[Name]
    FROM [User] u
    JOIN Role r ON u.IdRole = r.Id
    WHERE u.Id = @Id;
END;
GO

-- SP para insertar un nuevo usuario (sin cambios necesarios)
ALTER PROCEDURE SPInsertarUsuario
    @Name NVARCHAR(30),
    @LastName NVARCHAR(30),
    @Login NVARCHAR(100),
    @Password NVARCHAR(100),
    @Status TINYINT,
    @RegistrationDate DATETIME,
    @IdRole INT
AS
BEGIN
    INSERT INTO [User] ([Name], LastName, [Login], [Password], [Status], RegistrationDate, IdRole)
    VALUES (@Name, @LastName, @Login, @Password, @Status, @RegistrationDate, @IdRole);
END;
GO

-- SP para actualizar un usuario existente (sin cambios necesarios)
ALTER PROCEDURE SPActualizarUsuario
    @Id INT,
    @Name NVARCHAR(30),
    @LastName NVARCHAR(30),
    @Login NVARCHAR(100),
    @Status TINYINT
AS
BEGIN
    UPDATE [User]
    SET [Name] = @Name,
        LastName = @LastName,
        [Login] = @Login,
        [Status] = @Status
    WHERE Id = @Id;
END;
GO

-- SP para eliminar un usuario por su Id (sin cambios necesarios)
ALTER PROCEDURE SPEliminarUsuario
    @Id INT
AS
BEGIN
    DELETE FROM [User]
    WHERE Id = @Id;
END;
GO

-- SP para iniciar sesi�n (sin cambios necesarios)
ALTER PROCEDURE SPIniciarSesion
    @Login NVARCHAR(100),
    @Password NVARCHAR(100)
AS
BEGIN
    SELECT Id, [Name], LastName, [Status], RegistrationDate, IdRole
    FROM [User]
    WHERE [Login] = @Login AND [Password] = @Password;
END;
GO

-- SP para cambiar la contrase�a de un usuario (sin cambios necesarios)
ALTER PROCEDURE SPCambiarContrase�a
    @Id INT,
    @NewPassword NVARCHAR(100)
AS
BEGIN
    UPDATE [User]
    SET [Password] = @NewPassword
    WHERE Id = @Id;
END;
GO
--  SP para obtener todos los padrinos con sus roles y direcciones
ALTER PROCEDURE SPObtenerPadrinos
AS
BEGIN
    SELECT p.*, r.[Name], d.Nombre
    FROM Padrino p
    JOIN Role r ON p.IdRole = r.Id
    JOIN Direccion d ON p.IdDireccion = d.Id;
END;
GO

-- SP para obtener un padrino por su Id con su rol y direcci�n
ALTER PROCEDURE SPObtenerPadrinoPorId
    @Id INT
AS
BEGIN
    SELECT p.*, r.[Name], d.Nombre
    FROM Padrino p
    JOIN Role r ON p.IdRole = r.Id
    JOIN Direccion d ON p.IdDireccion = d.Id
    WHERE p.Id = @Id;
END;
GO

-- SP para insertar un nuevo padrino (sin cambios necesarios)
ALTER PROCEDURE SPInsertarPadrino
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @IdSexo INT,
    @IdRole INT,
    @Telefono VARCHAR(50),
    @Correo VARCHAR(30),
    @IdDireccion INT,
    @IdAdministrador INT,
    @FechaRegistro DATETIME
AS
BEGIN
    INSERT INTO Padrino (Nombre, Apellido, IdSexo, IdRole, Telefono, Correo, IdDireccion, IdAdministrador, FechaRegistro)
    VALUES (@Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @Correo, @IdDireccion, @IdAdministrador, @FechaRegistro);
END;
GO

-- SP para actualizar un padrino existente (sin cambios necesarios)
ALTER PROCEDURE SPActualizarPadrino
    @Id INT,
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @IdSexo INT,
    @IdRole INT,
    @Telefono VARCHAR(50),
    @Correo VARCHAR(30),
    @IdDireccion INT,
    @IdAdministrador INT,
    @FechaRegistro DATETIME
AS
BEGIN
    UPDATE Padrino
    SET Nombre = @Nombre,
        Apellido = @Apellido,
        IdSexo = @IdSexo,
        IdRole = @IdRole,
        Telefono = @Telefono,
        Correo = @Correo,
        IdDireccion = @IdDireccion,
        IdAdministrador = @IdAdministrador,
        FechaRegistro = @FechaRegistro
    WHERE Id = @Id;
END;
GO

-- SP para eliminar un padrino por su Id (sin cambios necesarios)
ALTER PROCEDURE SPEliminarPadrino
    @Id INT
AS
BEGIN
    DELETE FROM Padrino
    WHERE Id = @Id;
END;
GO

-- SP para buscar padrinos por nombre (sin cambios necesarios)
ALTER PROCEDURE SPBuscarPadrinosPorNombre
    @NombreBusqueda VARCHAR(50)
AS
BEGIN
    SELECT * FROM Padrino
    WHERE Nombre LIKE '%' + @NombreBusqueda + '%';
END;
GO


-- SP para insertar un nuevo encargado (sin cambios necesarios)
ALTER PROCEDURE SPInsertarEncargado
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @IdSexo INT,
    @IdRole INT,
    @Telefono VARCHAR(50),
    @TelEmergencia VARCHAR(10),
    @Correo VARCHAR(30),
    @IdDireccion INT,
    @IdTipoDocumento INT,
    @NumDocumento VARCHAR(50),
    @IdAdministrador INT
AS
BEGIN
    INSERT INTO Encargado (Nombre, Apellido, IdSexo, IdRole, Telefono, TelEmergencia, Correo, IdDireccion, IdTipoDocumento, NumDocumento, IdAdministrador, FechaRegistro)
    VALUES (@Nombre, @Apellido, @IdSexo, @IdRole, @Telefono, @TelEmergencia, @Correo, @IdDireccion, @IdTipoDocumento, @NumDocumento, @IdAdministrador, GETDATE());
END
GO

-- SP para obtener un encargado por su Id con su rol y direcci�n
ALTER PROCEDURE SPObtenerEncargadoPorId
    @Id INT
AS
BEGIN
    SELECT e.*, r.[Name], d.Nombre
    FROM Encargado e
    JOIN Role r ON e.IdRole = r.Id
    JOIN Direccion d ON e.IdDireccion = d.Id
    WHERE e.Id = @Id;
END
GO

-- SP para obtener todos los encargados con sus roles y direcciones
ALTER PROCEDURE SPTraerTodosEncargados
AS
BEGIN
    SELECT e.*, r.[Name], d.Nombre
    FROM Encargado e
    JOIN Role r ON e.IdRole = r.Id
    JOIN Direccion d ON e.IdDireccion = d.Id;
END
GO

-- SP para actualizar un encargado existente (sin cambios necesarios)
ALTER PROCEDURE SPActualizarEncargado
    @Id INT,
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @IdSexo INT,
    @IdRole INT,
    @Telefono VARCHAR(50),
    @TelEmergencia VARCHAR(10),
    @Correo VARCHAR(30),
    @IdDireccion INT,
    @IdTipoDocumento INT,
    @NumDocumento VARCHAR(50),
    @IdAdministrador INT
AS
BEGIN
    UPDATE Encargado
    SET Nombre = @Nombre, Apellido = @Apellido, IdSexo = @IdSexo, IdRole = @IdRole, Telefono = @Telefono, TelEmergencia = @TelEmergencia,
        Correo = @Correo, IdDireccion = @IdDireccion, IdTipoDocumento = @IdTipoDocumento, NumDocumento = @NumDocumento, IdAdministrador = @IdAdministrador
    WHERE Id = @Id;
END
GO

-- SP para eliminar un encargado por su Id (sin cambios necesarios)
ALTER PROCEDURE SPEliminarEncargado
    @Id INT
AS
BEGIN
    DELETE FROM Encargado WHERE Id = @Id;
END
GO

-- SP para buscar encargados por nombre o apellido (sin cambios necesarios)
ALTER PROCEDURE SPBuscarEncargadoPorNombre
    @TextoBusqueda VARCHAR(50)
AS
BEGIN
    SELECT e.*, r.[Name], d.Nombre
    FROM Encargado e
    JOIN Role r ON e.IdRole = r.Id
    JOIN Direccion d ON e.IdDireccion = d.Id
    WHERE e.Nombre LIKE '%' + @TextoBusqueda + '%' 
    OR e.Apellido LIKE '%' + @TextoBusqueda + '%';
END
GO

 ALTER PROCEDURE SPTraerAlumnoPorId
     @Id INT
 AS
 BEGIN
     SELECT a.Id, a.Nombre, a.Apellido, a.FechaNacimiento,
            s.Nombre AS Sexo, r.[Name] AS [Role], e.Nombre AS Encargado,
            en.Nombre AS Enfermedad, td.Nombre AS TipoDocumento,
            a.NumDocumento, g.Nombre AS Grado, t.Nombre AS Turno,
            ad.[name] AS Administrador, p.Nombre AS Padrino, 
            a.FechaRegistro, a.EsBecado
     FROM Alumno a
     LEFT JOIN Sexo s ON a.IdSexo = s.Id
     LEFT JOIN Role r ON a.IdRole = r.Id
     LEFT JOIN Encargado e ON a.IdEncargado = e.Id
     LEFT JOIN Enfermedad en ON a.IdEnfermedad = en.Id
     LEFT JOIN TipoDocumento td ON a.IdTipoDocumento = td.Id
     LEFT JOIN Grado g ON a.IdGrado = g.Id
     LEFT JOIN Turno t ON a.IdTurno = t.Id
     LEFT JOIN Administrador ad ON a.IdAdministrador = ad.Id
     LEFT JOIN Padrino p ON a.IdPadrino = p.Id
     WHERE a.Id = @Id;
 END
 GO
 ALTER PROCEDURE SPTraerTodosLosAlumnos
 AS
 BEGIN
     SELECT a.Id, a.Nombre, a.Apellido, a.FechaNacimiento,
            s.Nombre AS Sexo, r.Nombre AS Role, e.Nombre AS Encargado,
            en.Nombre AS Enfermedad, td.Nombre AS TipoDocumento,
            a.NumDocumento, g.Nombre AS Grado, t.Nombre AS Turno,
            ad.Nombre AS Administrador, p.Nombre AS Padrino, 
            a.FechaRegistro, a.EsBecado
     FROM Alumno a
     LEFT JOIN Sexo s ON a.IdSexo = s.Id
     LEFT JOIN Role r ON a.IdRole = r.Id
     LEFT JOIN Encargado e ON a.IdEncargado = e.Id
     LEFT JOIN Enfermedad en ON a.IdEnfermedad = en.Id
     LEFT JOIN TipoDocumento td ON a.IdTipoDocumento = td.Id
     LEFT JOIN Grado g ON a.IdGrado = g.Id
     LEFT JOIN Turno t ON a.IdTurno = t.Id
     LEFT JOIN Administrador ad ON a.IdAdministrador = ad.Id
     LEFT JOIN Padrino p ON a.IdPadrino = p.Id;
 END
 GO
 ALTER PROCEDURE SPBuscarAlumnosPorNombre
     @TextoBusqueda VARCHAR(50)
 AS
 BEGIN  
     SELECT a.Id, a.Nombre, a.Apellido, a.FechaNacimiento,
            s.Nombre AS Sexo, r.Nombre AS Role, e.Nombre AS Encargado,
            en.Nombre AS Enfermedad, td.Nombre AS TipoDocumento,
            a.NumDocumento, g.Nombre AS Grado, t.Nombre AS Turno,
            ad.Nombre AS Administrador, p.Nombre AS Padrino, 
            a.FechaRegistro, a.EsBecado
     FROM Alumno a
     LEFT JOIN Sexo s ON a.IdSexo = s.Id
     LEFT JOIN Role r ON a.IdRole = r.Id
     LEFT JOIN Encargado e ON a.IdEncargado = e.Id
     LEFT JOIN Enfermedad en ON a.IdEnfermedad = en.Id
     LEFT JOIN TipoDocumento td ON a.IdTipoDocumento = td.Id
     LEFT JOIN Grado g ON a.IdGrado = g.Id
     LEFT JOIN Turno t ON a.IdTurno = t.Id
     LEFT JOIN Administrador ad ON a.IdAdministrador = ad.Id
     LEFT JOIN Padrino p ON a.IdPadrino = p.Id
     WHERE a.Nombre LIKE '%' + @TextoBusqueda + '%' 
     OR a.Apellido LIKE '%' + @TextoBusqueda + '%';
 END
 GO

ALTER PROCEDURE SPBuscarAlumnosPorGrado
    @IdGrado INT
AS
BEGIN
    SELECT a.Id, a.Nombre, a.Apellido, a.FechaNacimiento,
           s.Nombre AS Sexo, r.Nombre AS Role, e.Nombre AS Encargado,
           en.Nombre AS Enfermedad, td.Nombre AS TipoDocumento,
           a.NumDocumento, g.Nombre AS Grado, t.Nombre AS Turno,
           ad.Nombre AS Administrador, p.Nombre AS Padrino, 
           a.FechaRegistro, a.EsBecado
    FROM Alumno a
    LEFT JOIN Sexo s ON a.IdSexo = s.Id
    LEFT JOIN Role r ON a.IdRole = r.Id
    LEFT JOIN Encargado e ON a.IdEncargado = e.Id
    LEFT JOIN Enfermedad en ON a.IdEnfermedad = en.Id
    LEFT JOIN TipoDocumento td ON a.IdTipoDocumento = td.Id
    LEFT JOIN Grado g ON a.IdGrado = g.Id
    LEFT JOIN Turno t ON a.IdTurno = t.Id
    LEFT JOIN Administrador ad ON a.IdAdministrador = ad.Id
    LEFT JOIN Padrino p ON a.IdPadrino = p.Id
    WHERE a.IdGrado = @IdGrado;
END
GO

 ALTER PROCEDURE SPBuscarAlumnosPorBeca
 AS
 BEGIN
     SELECT a.Id, a.Nombre, a.Apellido, a.FechaNacimiento,
            s.Nombre AS Sexo, r.Nombre AS Role, e.Nombre AS Encargado,
            en.Nombre AS Enfermedad, td.Nombre AS TipoDocumento,
            a.NumDocumento, g.Nombre AS Grado, t.Nombre AS Turno,
            ad.Nombre AS Administrador, p.Nombre AS Padrino, 
            a.FechaRegistro, a.EsBecado
     FROM Alumno a
     LEFT JOIN Sexo s ON a.IdSexo = s.Id
     LEFT JOIN Role r ON a.IdRole = r.Id
     LEFT JOIN Encargado e ON a.IdEncargado = e.Id
     LEFT JOIN Enfermedad en ON a.IdEnfermedad = en.Id
     LEFT JOIN TipoDocumento td ON a.IdTipoDocumento = td.Id
     LEFT JOIN Grado g ON a.IdGrado = g.Id
     LEFT JOIN Turno t ON a.IdTurno = t.Id
     LEFT JOIN Administrador ad ON a.IdAdministrador = ad.Id
     LEFT JOIN Padrino p ON a.IdPadrino = p.Id
     WHERE a.EsBecado = 1;
 END
 GO
 ALTER PROCEDURE SPGetAlumnosPorGrado
     @Grado INT
 AS
 BEGIN
     SELECT a.Id, a.Nombre, a.Apellido, a.FechaNacimiento,
            s.Nombre AS Sexo, r.Nombre AS Role, e.Nombre AS Encargado,
            en.Nombre AS Enfermedad, td.Nombre AS TipoDocumento,
            a.NumDocumento, g.Nombre AS Grado, t.Nombre AS Turno,
            ad.Nombre AS Administrador, p.Nombre AS Padrino, 
            a.FechaRegistro, a.EsBecado
     FROM Alumno a
     LEFT JOIN Sexo s ON a.IdSexo = s.Id
     LEFT JOIN Role r ON a.IdRole = r.Id
     LEFT JOIN Encargado e ON a.IdEncargado = e.Id
     LEFT JOIN Enfermedad en ON a.IdEnfermedad = en.Id
     LEFT JOIN TipoDocumento td ON a.IdTipoDocumento = td.Id
     LEFT JOIN Grado g ON a.IdGrado = g.Id
     LEFT JOIN Turno t ON a.IdTurno = t.Id
     LEFT JOIN Administrador ad ON a.IdAdministrador = ad.Id
     LEFT JOIN Padrino p ON a.IdPadrino = p.Id
     WHERE g.Nombre = CONCAT('Grado ', @Grado);
 END
 GO
