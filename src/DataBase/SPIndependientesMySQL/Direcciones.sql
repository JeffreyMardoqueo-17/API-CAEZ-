DELIMITER / / CREATE PROCEDURE SPDireccionesCreate (IN Nombre VARCHAR(200)) BEGIN
INSERT INTO
    Direccion (Nombre)
VALUES
    (Nombre);

SELECT
    LAST_INSERT_ID () AS Id;

-- Devuelve el Id del registro recién insertado
END / / DELIMITER;

DELIMITER / / CREATE PROCEDURE SPDireccionesGet (IN Id INT) BEGIN IF Id IS NULL THEN
SELECT
    *
FROM
    Direccion;

ELSE
SELECT
    *
FROM
    Direccion
WHERE
    Id = Id;

END IF;

END / / DELIMITER;

DELIMITER / / CREATE PROCEDURE SPGetDireccionesPorId (IN Id INT) BEGIN
SELECT
    *
FROM
    Direccion
WHERE
    Id = Id;

END / / DELIMITER;

DELIMITER / / CREATE PROCEDURE SPDireccionesUpdate (IN Id INT, IN Nombre VARCHAR(200)) BEGIN
UPDATE Direccion
SET
    Nombre = Nombre
WHERE
    Id = Id;

-- Devuelve el registro actualizado
SELECT
    *
FROM
    Direccion
WHERE
    Id = Id;

END / / DELIMITER;

DELIMITER / / CREATE PROCEDURE SPDireccionesDelete (IN Id INT) BEGIN
DELETE FROM Direccion
WHERE
    Id = Id;

END / / DELIMITER;