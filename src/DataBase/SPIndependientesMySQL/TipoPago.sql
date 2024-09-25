-- Procedimientos Almacenados (Stored Procedures) para TipoPago
-- 1. Crear un nuevo Tipo de Pago
DELIMITER / / CREATE PROCEDURE SPTipoPagoCreate (IN Nombre VARCHAR(80)) BEGIN
INSERT INTO
    TipoPago (Nombre)
VALUES
    (Nombre);

SELECT
    LAST_INSERT_ID () AS Id;

-- Devuelve el Id del registro recién insertado
END / / DELIMITER;

-- 2. Obtener todos los Tipos de Pago o uno por Id
DELIMITER / / CREATE PROCEDURE SPTipoPagoGet (IN Id INT) BEGIN IF Id IS NULL THEN
SELECT
    *
FROM
    TipoPago;

ELSE
SELECT
    *
FROM
    TipoPago
WHERE
    Id = Id;

END IF;

END / / DELIMITER;

-- 3. Obtener Tipo de Pago por Id específico
DELIMITER / / CREATE PROCEDURE SPGetTipoPagoPorId (IN Id INT) BEGIN
SELECT
    *
FROM
    TipoPago
WHERE
    Id = Id;

END / / DELIMITER;

-- 4. Actualizar Tipo de Pago
DELIMITER / / CREATE PROCEDURE SPTipoPagoUpdate (IN Id INT, IN Nombre VARCHAR(80)) BEGIN
UPDATE TipoPago
SET
    Nombre = Nombre
WHERE
    Id = Id;

-- Devuelve el registro actualizado
SELECT
    *
FROM
    TipoPago
WHERE
    Id = Id;

END / / DELIMITER;

-- 5. Eliminar Tipo de Pago
DELIMITER / / CREATE PROCEDURE SPTipoPagoDelete (IN Id INT) BEGIN
DELETE FROM TipoPago
WHERE
    Id = Id;

END / / DELIMITER;