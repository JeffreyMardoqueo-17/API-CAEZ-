INSERT INTO Administrador (Nombre, Apellido, IdCargo, Telefono, Pass)
VALUES ('Jeffrey', 'Mardoqueo', 1, '123456789', 'jeffrey20068f');

INSERT INTO TipoDocumento (Nombre) VALUES ('NIE')
INSERT INTO Direccion (Nombre) VALUES ('Cas. Loz Vasquez, El Zarzal, Santo Domingo de Guzman, Sonsonate ')
INSERT INTO Parentezco (Nombre) VALUES ('Papá')

INSERT INTO Encargado (Nombre, Apellido, IdTipoDoc, NumeroDocumento, Telefono, IdDireccion, IdParentezco, IdAdministrador)
VALUES ('NombreDelEncargado', 'ApellidoDelEncargado', 1, '123456789', '123456789', 1, 1, 1);

INSERT INTO Turno (Nombre) VALUES ('Mañana')

INSERT INTO Alumno (Nombre, Apellido, IdGrado, IdTipoDoc, NumeroDocumento, IdEncargado, IdTurno, IdAdministrador)
VALUES ('NombreDelAlumno', 'ApellidoDelAlumno', 1, 2, '1234567890', 1, 1, 1);

INSERT INTO Mes (Nombre)
VALUES ('Enero'), ('Febrero'), ('Marzo'), ('Abril'), ('Mayo'), ('Junio'), ('Julio'), ('Agosto'), ('Septiembre'), ('Octubre'), ('Noviembre'), ('Diciembre');

INSERT INTO Pago (IdAlumno, IdEncargado, MontoPagar, Multa, TotalPagado, FechaRegistro, IdAdministrador, IdMes)
VALUES (1, 1, 100.00, 0.00, 200.00, '2022-03-09', 1, 3);

INSERT INTO Factura (NumeroFactura, IdPago, FechaDescarga)
VALUES (1, 1, '2022-03-09 08:00:00');

ALTER TABLE Pago ENABLE TRIGGER ActualizarMontoTotal; --Activo el triger

SELECT OBJECTPROPERTY(OBJECT_ID('ActualizarMontoTotal'), 'ExecIsTriggerDisabled');

SELECT OBJECT_DEFINITION(OBJECT_ID('ActualizarMontoTotal'));


SELECT * FROM FONDO
SELECT * FROM Factura
SELECT * FROM Pago
SELECT * FROM Administrador
SELECT * FROM TipoDocumento
SELECT * FROM Direccion
SELECT * FROM Parentezco
SELECT * FROM Encargado
SELECT * FROM Grado
SELECT * FROM Alumno

CREATE TRIGGER ActualizarMontoTotal
ON Pago
AFTER INSERT
AS
BEGIN
    DECLARE @MontoNuevoPago DECIMAL(10, 2);
    SELECT @MontoNuevoPago = MontoPagar FROM inserted;
    
    UPDATE FONDO
    SET MontoTotal = MontoTotal + @MontoNuevoPago;
END;
