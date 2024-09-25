-- Procedimientos Almacenados (Stored Procedures) para TipoDocumento
-- 1. Crear un nuevo Tipo de Documento
DELIMITER / / CREATE PROCEDURE SPTipoDocumentoCreate (IN Nombre VARCHAR(50)) BEGIN
INSERT INTO
    TipoDocumento (Nombre)
VALUES
    (Nombre);

SELECT
    LAST_INSERT_ID () AS Id;

-- Devuelve el Id del registro recién insertado
END / / DELIMITER;

-- 2. Obtener todos los Tipos de Documento o uno por Id
DELIMITER / / CREATE PROCEDURE SPTipoDocumentoGet (IN Id INT) BEGIN IF Id IS NULL THEN
SELECT
    *
FROM
    TipoDocumento;

ELSE
SELECT
    *
FROM
    TipoDocumento
WHERE
    Id = Id;

END IF;

END / / DELIMITER;

-- 3. Obtener Tipo de Documento por Id específico
DELIMITER / / CREATE PROCEDURE SPGetTipoDocumentoPorId (IN Id INT) BEGIN
SELECT
    *
FROM
    TipoDocumento
WHERE
    Id = Id;

END / / DELIMITER;

-- 4. Actualizar Tipo de Documento
DELIMITER / / CREATE PROCEDURE SPTipoDocumentoUpdate (IN Id INT, IN Nombre VARCHAR(50)) BEGIN
UPDATE TipoDocumento
SET
    Nombre = Nombre
WHERE
    Id = Id;

-- Devuelve el registro actualizado
SELECT
    *
FROM
    TipoDocumento
WHERE
    Id = Id;

END / / DELIMITER;

-- 5. Eliminar Tipo de Documento
DELIMITER / / CREATE PROCEDURE SPTipoDocumentoDelete (IN Id INT) BEGIN
DELETE FROM TipoDocumento
WHERE
    Id = Id;

END / / DELIMITER;