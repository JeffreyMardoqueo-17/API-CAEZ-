-- Procedimientos Almacenados (Stored Procedures) para Grado
-- 1. Crear un nuevo Grado
DELIMITER / / CREATE PROCEDURE SPGradoCreate (
    IN Nombre VARCHAR(50),
    IN Colegiatura DECIMAL(10, 2)
) BEGIN
INSERT INTO
    Grado (Nombre, Colegiatura)
VALUES
    (Nombre, Colegiatura);

SELECT
    LAST_INSERT_ID () AS Id;

-- Devuelve el Id del registro recién insertado
END / / DELIMITER;

-- 2. Obtener todos los Grados o uno por Id
DELIMITER / / CREATE PROCEDURE SPGradoGet (IN Id INT) BEGIN IF Id IS NULL THEN
SELECT
    *
FROM
    Grado;

ELSE
SELECT
    *
FROM
    Grado
WHERE
    Id = Id;

END IF;

END / / DELIMITER;

-- 3. Obtener Grado por Id específico
DELIMITER / / CREATE PROCEDURE SPGetGradoPorId (IN Id INT) BEGIN
SELECT
    *
FROM
    Grado
WHERE
    Id = Id;

END / / DELIMITER;

-- 4. Actualizar Grado
DELIMITER / / CREATE PROCEDURE SPGradoUpdate (
    IN Id INT,
    IN Nombre VARCHAR(50),
    IN Colegiatura DECIMAL(10, 2)
) BEGIN
UPDATE Grado
SET
    Nombre = Nombre,
    Colegiatura = Colegiatura
WHERE
    Id = Id;

-- Devuelve el registro actualizado
SELECT
    *
FROM
    Grado
WHERE
    Id = Id;

END / / DELIMITER;

-- 5. Eliminar Grado
DELIMITER / / CREATE PROCEDURE SPGradoDelete (IN Id INT) BEGIN
DELETE FROM Grado
WHERE
    Id = Id;

END / / DELIMITER;