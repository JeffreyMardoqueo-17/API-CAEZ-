-- 1. Crear un nuevo registro en Enfermedad
DELIMITER / / CREATE PROCEDURE SPEnfermedadCreate (IN Nombre VARCHAR(50), IN Descripcion TEXT) BEGIN
INSERT INTO
    Enfermedad (Nombre, Descripcion)
VALUES
    (Nombre, Descripcion);

SELECT
    LAST_INSERT_ID () AS Id;

-- Devuelve el Id del registro recién insertado
END / / DELIMITER;

-- 2. Obtener todos los registros de Enfermedad o uno por Id
DELIMITER / / CREATE PROCEDURE SPEnfermedadGet (IN Id INT) BEGIN IF Id IS NULL THEN
SELECT
    *
FROM
    Enfermedad;

ELSE
SELECT
    *
FROM
    Enfermedad
WHERE
    Id = Id;

END IF;

END / / DELIMITER;

-- 3. Obtener Enfermedad por Id específico
DELIMITER / / CREATE PROCEDURE SPGetEnfermedadPorId (IN Id INT) BEGIN
SELECT
    *
FROM
    Enfermedad
WHERE
    Id = Id;

END / / DELIMITER;

-- 4. Actualizar Enfermedad
DELIMITER / / CREATE PROCEDURE SPEnfermedadUpdate (
    IN Id INT,
    IN Nombre VARCHAR(50),
    IN Descripcion TEXT
) BEGIN
UPDATE Enfermedad
SET
    Nombre = Nombre,
    Descripcion = Descripcion
WHERE
    Id = Id;

-- Devuelve el registro actualizado
SELECT
    *
FROM
    Enfermedad
WHERE
    Id = Id;

END / / DELIMITER;

-- 5. Eliminar Enfermedad
DELIMITER / / CREATE PROCEDURE SPEnfermedadDelete (IN Id INT) BEGIN
DELETE FROM Enfermedad
WHERE
    Id = Id;

END / / DELIMITER;