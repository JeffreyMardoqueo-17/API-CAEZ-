-- TABLA Cargo-- TABLA Cargo
CREATE DATABASE APICaezBD
USE APICaezBD

-- TABLA Cargo
CREATE TABLE Cargo(
    Id TINYINT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(80) NOT NULL
);
GO

-- TABLA Direccion
CREATE TABLE Direccion(
    Id TINYINT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(200) NOT NULL
);
GO

-- TABLA Turno
CREATE TABLE Turno(
    Id TINYINT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(80) NOT NULL
);
GO

-- TABLA Grado
CREATE TABLE Grado(
    Id TINYINT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(50) NOT NULL
);
GO

-- TABLA TipoDocumento
CREATE TABLE TipoDocumento(
    Id TINYINT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(80) NOT NULL
);
GO

-- TABLA TipoPago
CREATE TABLE TipoPago(
    Id TINYINT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(80) NOT NULL
);
GO

-- TABLA Mes
CREATE TABLE Mes(
    Id TINYINT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(50) NOT NULL
);
GO

-- TABLA Administrador
CREATE TABLE Administrador(
    Id BIGINT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    IdCargo TINYINT NOT NULL FOREIGN KEY REFERENCES Cargo(Id),
    Telefono VARCHAR(50) NOT NULL,
    Pass VARCHAR(200) NOT NULL
);
GO

-- TABLA Encargado
CREATE TABLE Encargado(
    Id BIGINT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    IdTipoDoc TINYINT NOT NULL FOREIGN KEY REFERENCES TipoDocumento(Id),
    NumeroDocumento VARCHAR(50) NOT NULL,
    Telefono VARCHAR(50) NOT NULL,
    Direccion TINYINT NOT NULL FOREIGN KEY REFERENCES Direccion(Id),
    Parentezco VARCHAR(50),
    IdAdministrador BIGINT NOT NULL FOREIGN KEY REFERENCES Administrador(Id)
);
GO

-- TABLA Alumno
CREATE TABLE Alumno(
    Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    IdGrado TINYINT NOT NULL FOREIGN KEY REFERENCES Grado(Id),
    IdTipoDoc TINYINT NOT NULL FOREIGN KEY REFERENCES TipoDocumento(Id),
    NumeroDocumento VARCHAR(50) NOT NULL,
    IdEncargado BIGINT NOT NULL FOREIGN KEY REFERENCES Encargado(Id),
    IdTurno TINYINT NOT NULL FOREIGN KEY REFERENCES Turno(Id),
    IdAdministrador BIGINT NOT NULL FOREIGN KEY REFERENCES Administrador(Id)
);
GO

-- TABLA Fondo
CREATE TABLE Fondo(
 Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Monto DECIMAL(10, 2) NOT NULL
);
GO

-- TABLA Pago
CREATE TABLE Pago(
    Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
    NumeroFactura INT NOT NULL,
    IdAlumno INT NOT NULL FOREIGN KEY REFERENCES Alumno(Id),
    IdEncargado BIGINT NOT NULL,
    Multa DECIMAL(10, 2) NOT NULL,
    FechaRegistro DATE NOT NULL,
    IdAdministrador BIGINT NOT NULL FOREIGN KEY REFERENCES Administrador(Id)
);
GO

-- TABLA Parentezco
CREATE TABLE Parentezco(
    Id TINYINT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(50) NOT NULL
);
GO

-- TABLA Multa
CREATE TABLE Multa(
    Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(50) NOT NULL,
    IdPago INT NOT NULL FOREIGN KEY REFERENCES Pago(Id)
);
GO

-- TABLA Factura
CREATE TABLE Factura(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    IdPago INT NOT NULL FOREIGN KEY REFERENCES Pago(Id)
);
GO

