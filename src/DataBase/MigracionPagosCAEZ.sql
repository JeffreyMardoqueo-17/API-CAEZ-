-- CREAR BASE DE DATOS
CREATE DATABASE PagosCAEZ;

USE PagosCAEZ;

-- TABLA Direccion
CREATE TABLE
    Direccion (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(200) NOT NULL
    );

-- TABLA Turno
CREATE TABLE
    Turno (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(80) NOT NULL
    );

-- TABLA Grado
CREATE TABLE
    Grado (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(50) NOT NULL,
        Colegiatura DECIMAL(10, 2) NOT NULL DEFAULT 0
    );

-- TABLA TipoDocumento
CREATE TABLE
    TipoDocumento (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(50) NOT NULL
    );

-- TABLA TipoPago
CREATE TABLE
    TipoPago (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(80) NOT NULL
    );

-- TABLA Sexo
CREATE TABLE
    Sexo (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(10) NOT NULL
    );

-- TABLA Parentezco
CREATE TABLE
    Parentezco (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(50) NOT NULL
    );

-- TABLA Enfermedad
CREATE TABLE
    Enfermedad (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(50) NOT NULL,
        Descripcion TEXT NOT NULL
    );

-- TABLA Mes
CREATE TABLE
    Mes (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(50) NOT NULL
    );

-- TABLA Role
CREATE TABLE
    Role (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Name VARCHAR(30) NOT NULL
    );

-- TABLA User
CREATE TABLE
    User (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Name NVARCHAR (30) NOT NULL,
        LastName NVARCHAR (30) NOT NULL,
        Login NVARCHAR (100),
        Password NVARCHAR (100) NOT NULL,
        Status TINYINT NOT NULL,
        RegistrationDate DATETIME NOT NULL,
        IdRole INT NOT NULL,
        FOREIGN KEY (IdRole) REFERENCES Role (Id)
    );

-- TABLA Padrino
CREATE TABLE
    Padrino (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(50) NOT NULL,
        Apellido VARCHAR(50) NOT NULL,
        IdSexo INT NOT NULL,
        IdRole INT NOT NULL,
        Telefono VARCHAR(50) NOT NULL,
        Correo VARCHAR(30) NOT NULL,
        IdDireccion INT NOT NULL,
        IdAdministrador INT NOT NULL,
        FechaRegistro DATETIME NOT NULL,
        FOREIGN KEY (IdSexo) REFERENCES Sexo (Id),
        FOREIGN KEY (IdRole) REFERENCES Role (Id),
        FOREIGN KEY (IdDireccion) REFERENCES Direccion (Id),
        FOREIGN KEY (IdAdministrador) REFERENCES User (Id)
    );

-- TABLA Encargado
CREATE TABLE
    Encargado (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(50) NOT NULL,
        Apellido VARCHAR(50) NOT NULL,
        IdSexo INT NOT NULL,
        IdRole INT NOT NULL,
        Telefono VARCHAR(50) NOT NULL,
        TelEmergencia VARCHAR(10) NOT NULL,
        Correo VARCHAR(30) NOT NULL,
        IdDireccion INT NOT NULL,
        IdTipoDocumento INT NOT NULL,
        NumDocumento VARCHAR(50) NOT NULL,
        IdAdministrador INT NOT NULL,
        FechaRegistro DATETIME NOT NULL,
        FOREIGN KEY (IdSexo) REFERENCES Sexo (Id),
        FOREIGN KEY (IdRole) REFERENCES Role (Id),
        FOREIGN KEY (IdDireccion) REFERENCES Direccion (Id),
        FOREIGN KEY (IdTipoDocumento) REFERENCES TipoDocumento (Id),
        FOREIGN KEY (IdAdministrador) REFERENCES User (Id)
    );

-- TABLA Alumno
CREATE TABLE
    Alumno (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(50) NOT NULL,
        Apellido VARCHAR(50) NOT NULL,
        FechaNacimiento DATE NOT NULL,
        IdSexo INT NOT NULL,
        IdRole INT NOT NULL,
        IdEncargado INT NOT NULL,
        IdEnfermedad INT,
        IdTipoDocumento INT NOT NULL,
        NumDocumento VARCHAR(50) NOT NULL,
        IdTurno INT NOT NULL,
        IdAdministrador INT NOT NULL,
        IdPadrino INT,
        FechaRegistro DATETIME NOT NULL,
        EsBecado BIT NOT NULL DEFAULT 0,
        FOREIGN KEY (IdSexo) REFERENCES Sexo (Id),
        FOREIGN KEY (IdRole) REFERENCES Role (Id),
        FOREIGN KEY (IdEncargado) REFERENCES Encargado (Id),
        FOREIGN KEY (IdEnfermedad) REFERENCES Enfermedad (Id),
        FOREIGN KEY (IdTipoDocumento) REFERENCES TipoDocumento (Id),
        FOREIGN KEY (IdTurno) REFERENCES Turno (Id),
        FOREIGN KEY (IdAdministrador) REFERENCES User (Id),
        FOREIGN KEY (IdPadrino) REFERENCES Padrino (Id)
    );

-- TABLA AlumnoGrado (Intermedia para Alumno y Grado)
CREATE TABLE
    AlumnoGrado (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        IdAlumno INT NOT NULL,
        IdGrado INT NOT NULL,
        FOREIGN KEY (IdAlumno) REFERENCES Alumno (Id),
        FOREIGN KEY (IdGrado) REFERENCES Grado (Id)
    );

-- TABLA Pago
CREATE TABLE
    Pago (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        IdAlumno INT NOT NULL,
        Multa DECIMAL(10, 2) NULL DEFAULT 0,
        IdTipoPago INT NULL,
        Descuento DECIMAL(5, 2) NULL DEFAULT 0,
        Precio DECIMAL(10, 2) NOT NULL DEFAULT 0,
        TotalPagado DECIMAL(10, 2) NOT NULL DEFAULT 0,
        FechaRegistro DATETIME NOT NULL,
        IdAdministrador INT NOT NULL,
        Descripcion TEXT NOT NULL,
        FOREIGN KEY (IdAlumno) REFERENCES Alumno (Id),
        FOREIGN KEY (IdTipoPago) REFERENCES TipoPago (Id),
        FOREIGN KEY (IdAdministrador) REFERENCES User (Id)
    );

-- TABLA PagoMes
CREATE TABLE
    PagoMes (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        IdPago INT NOT NULL,
        IdMes INT NOT NULL,
        FOREIGN KEY (IdPago) REFERENCES Pago (Id),
        FOREIGN KEY (IdMes) REFERENCES Mes (Id)
    );

-- TABLA Factura
CREATE TABLE
    Factura (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        IdPago INT,
        IdAlumno INT NOT NULL,
        RutaPDF VARCHAR(255) NOT NULL, -- Ajusté el NVARCHAR(MAX) a VARCHAR(255)
        FOREIGN KEY (IdPago) REFERENCES Pago (Id),
        FOREIGN KEY (IdAlumno) REFERENCES Alumno (Id)
    );

-- TABLA InformacionFinanciera
CREATE TABLE
    InformacionFinanciera (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        FondoActual DECIMAL(10, 2) NOT NULL DEFAULT 0,
        DeudaTotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
        SaldoPorCompletar DECIMAL(10, 2) NOT NULL DEFAULT 0,
        NumEstudiantes INT NOT NULL DEFAULT 0
    );