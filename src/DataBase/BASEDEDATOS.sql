-- CREAR BASE DE DATOS
CREATE DATABASE CaezPagos
GO
-- usar base de datos
USE CaezPagos
--tablas independitendes
------------------------------------DIRECCIONES
-- TABLA Direccion
CREATE TABLE Direccion(
    Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(200) NOT NULL
);
GO
-- TABLA Turno
CREATE TABLE Turno(
    Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(80) NOT NULL
);
GO
-- TABLA Grado
CREATE TABLE Grado(
    Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(50) NOT NULL,
    Colegiatura DECIMAL(10, 2) NOT NULL DEFAULT 0
);
GO
-- TABLA TipoDocumento
CREATE TABLE TipoDocumento(
    Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(50) NOT NULL
);
GO
-- TABLA TipoPago
CREATE TABLE TipoPago(
    Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(80) NOT NULL
);
GO
CREATE TABLE Sexo (
    Id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    Nombre VARCHAR(10) NOT NULL
);
GO
-- TABLA Parentezco
CREATE TABLE Parentezco(
    Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(50) NOT NULL
);
CREATE TABLE Enfermedad(
    Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(MAX) NOT NULL
);
GO
CREATE TABLE Mes(
    Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(50) NOT NULL
);
GO
--***cARGO*--
create table [Role](
Id int not null identity(1,1),
[Name] VARCHAR(30) not null,
primary key(Id)
);
go
-- //USIARIO
create table [User](
    Id int not null identity(1,1),
    [Name] nvarchar(30) not null,
    LastName nvarchar(30) not null,
    [Login] NVARCHAR(100),
    [Password] nvarchar(100) not null,
    [Status] tinyint not null,
    RegistrationDate datetime not null,
    primary key(Id),
    IdRole INT NOT NULL FOREIGN KEY REFERENCES [Role](Id)
);
GO
------------------------PADRINO 
CREATE TABLE Padrino(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    IdSexo INT NOT NULL FOREIGN KEY REFERENCES Sexo(Id),
    IdRole INT NOT NULL FOREIGN KEY REFERENCES [Role](Id),
    Telefono VARCHAR (50) NOT NULL,
    Correo VARCHAR(30) not null,
    IdDireccion INT NOT NULL FOREIGN KEY REFERENCES Direccion(Id),
    IdAdministrador INT NOT NULL FOREIGN KEY REFERENCES [User](Id),
    FechaRegistro datetime not null
);
------------------------ENCARGADO
CREATE TABLE Encargado(
    Id INT NOT NULL PRIMARY KEY IDENTITY (1,1),
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    IdSexo INT NOT NULL FOREIGN KEY REFERENCES Sexo(Id),
    IdRole INT NOT NULL FOREIGN KEY REFERENCES [Role](Id),
    Telefono VARCHAR (50) NOT NULL,
    TelEmergencia VARCHAR (10) NOT NULL,
    Correo VARCHAR(30) not null,
    IdDireccion INT NOT NULL FOREIGN KEY REFERENCES Direccion(Id),
    IdTipoDocumento INT NOT NULL FOREIGN KEY REFERENCES TipoDocumento(Id),
    NumDocumento VARCHAR(50) NOT NULL,
    IdAdministrador INT NOT NULL FOREIGN KEY REFERENCES [User](Id),
	FechaRegistro datetime not null
);
GO
-----------------------ALUMNOS
CREATE TABLE Alumno(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    IdSexo INT NOT NULL FOREIGN KEY REFERENCES Sexo(Id),
    IdRole INT NOT NULL FOREIGN KEY REFERENCES [Role](Id),
    IdEncargado INT NOT NULL FOREIGN KEY REFERENCES Encargado(Id),
    IdEnfermedad INT NULL FOREIGN KEY REFERENCES Enfermedad(Id),
    IdTipoDocumento INT NOT NULL FOREIGN KEY REFERENCES TipoDocumento(Id),
    NumDocumento VARCHAR(50) NOT NULL,
    IdGrado INT NOT NULL FOREIGN KEY REFERENCES Grado(Id),
    IdGrupo INT NULL FOREIGN KEY REFERENCES Grupo(Id),
    IdTurno INT NOT NULL FOREIGN KEY REFERENCES Turno(Id),
    IdAdministrador INT NOT NULL FOREIGN KEY REFERENCES  [User](Id),
    IdPadrino INT NULL FOREIGN KEY REFERENCES Padrino(Id),
    FechaRegistro datetime not null,
    EsBecado BIT NOT NULL DEFAULT 0 -- 0 para no becado, 1 para becado
);
GO
----------GRADOS GRUPOS
CREATE TABLE Grupo(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(50) NOT NULL,
    IdAlumno INT NULL FOREIGN KEY REFERENCES Alumno(Id),
    UNIQUE(IdAlumno)
);
GO
-- TABLA Pago
GO
CREATE TABLE Pago (
    Id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    IdAlumno INT NOT NULL FOREIGN KEY REFERENCES Alumno(Id),
    Multa DECIMAL(10, 2)  NULL DEFAULT 0, ---MULTA LA QUITAMOS O QUE NO APAREZCA EN EL INGRESO DE DATOS
	IdTipoPago INT NULL,
    Descuento DECIMAL(5, 2)  NULL DEFAULT 0, -- Descuento como porcentaje (por ejemplo, 20%)
    TotalPagado DECIMAL(10, 2) NOT NULL DEFAULT 0,
    FechaRegistro DATETIME NOT NULL,
    IdAdministrador INT NOT NULL FOREIGN KEY REFERENCES [User](Id),
    Descripcion VARCHAR(MAX) NOT NULL
);

GO
CREATE TABLE PagoMes(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    IdPago INT NOT NULL FOREIGN KEY REFERENCES Pago(Id),
    IdMes INT NOT NULL FOREIGN KEY REFERENCES Mes(Id)
);
GO
CREATE TABLE Factura (
    Id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    IdPago INT NULL FOREIGN KEY REFERENCES Pago(Id),
    IdAlumno INT NOT NULL FOREIGN KEY REFERENCES Alumno(Id),
    RutaPDF NVARCHAR(MAX) NOT NULL
);
GO
CREATE TABLE InformacionFinanciera (
    Id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    FondoActual DECIMAL(10, 2) NOT NULL DEFAULT 0,
    DeudaTotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
    SaldoPorCompletar DECIMAL(10, 2) NOT NULL DEFAULT 0,
    NumEstudiantes INT NOT NULL DEFAULT 0
);

-- REGISTRO PARA USAR EL SIS
INSERT INTO Role ([Name])
VALUES ('Administrador')
---------------------------------------jeffreymardoqueo260
INSERT INTO [User] ([Name], LastName, [Login], [Password], [Status], RegistrationDate, IdRole)
VALUES ('Jeffrey', 'Mardoqueo', 'jeffreymardoqueo260@gmail.com', 'jeffreymardoqueo260', 1, SYSDATETIME(), 1)
