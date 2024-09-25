-- Procedimientos Almacenados (Stored Procedures) para Parentezco
-- 1. Crear un nuevo Parentezco
DELIMITER / / CREATE PROCEDURE SPParentezcoCreate (IN Nombre VARCHAR(50)) BEGIN
INSERT INTO
    Parentezco (Nombre)
VALUES
    (Nombre);

SELECT
    LAST_INSERT_ID () AS Id;

-- Devuelve el Id del registro recién insertado
END / / DELIMITER;

-- 2. Obtener todos los registros de Parentezco o uno por Id
DELIMITER / / CREATE PROCEDURE SPParentezcoGet (IN Id INT) BEGIN IF Id IS NULL THEN
SELECT
    *
FROM
    Parentezco;

ELSE
SELECT
    *
FROM
    Parentezco
WHERE
    Id = Id;

END IF;

END / / DELIMITER;

-- 3. Obtener Parentezco por Id específico
DELIMITER / / CREATE PROCEDURE SPGetParentezcoPorId (IN Id INT) BEGIN
SELECT
    *
FROM
    Parentezco
WHERE
    Id = Id;

END / / DELIMITER;

-- 4. Actualizar Parentezco
DELIMITER / / CREATE PROCEDURE SPParentezcoUpdate (IN Id INT, IN Nombre VARCHAR(50)) BEGIN
UPDATE Parentezco
SET
    Nombre = Nombre
WHERE
    Id = Id;

-- Devuelve el registro actualizado
SELECT
    *
FROM
    Parentezco
WHERE
    Id = Id;

END / / DELIMITER;

-- 5. Eliminar Parentezco
DELIMITER / / CREATE PROCEDURE SPParentezcoDelete (IN Id INT) BEGIN
DELETE FROM Parentezco
WHERE
    Id = Id;

END / / DELIMITER;