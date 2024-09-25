DELIMITER / / CREATE PROCEDURE SPTurnoCreate (IN Nombre VARCHAR(80)) BEGIN
INSERT INTO
    Turno (Nombre)
VALUES
    (Nombre);

SELECT
    LAST_INSERT_ID () AS Id;

-- Devuelve el Id del registro recién insertado
END / / DELIMITER;

DELIMITER / / CREATE PROCEDURE SPTurnoGet (IN Id INT) BEGIN IF Id IS NULL THEN
SELECT
    *
FROM
    Turno;

ELSE
SELECT
    *
FROM
    Turno
WHERE
    Id = Id;

END IF;

END / / DELIMITER;

DELIMITER / / CREATE PROCEDURE SPGetTurnoPorId (IN Id INT) BEGIN
SELECT
    *
FROM
    Turno
WHERE
    Id = Id;

END / / DELIMITER;

DELIMITER / / CREATE PROCEDURE SPTurnoUpdate (IN Id INT, IN Nombre VARCHAR(80)) BEGIN
UPDATE Turno
SET
    Nombre = Nombre
WHERE
    Id = Id;

-- Devuelve el registro actualizado
SELECT
    *
FROM
    Turno
WHERE
    Id = Id;

END / / DELIMITER;

DELIMITER / / CREATE PROCEDURE SPTurnoDelete (IN Id INT) BEGIN
DELETE FROM Turno
WHERE
    Id = Id;

END / / DELIMITER;