-- Procedimientos Almacenados (Stored Procedures) para Sexo
-- 1. Obtener todos los registros de la tabla Sexo
DELIMITER / / CREATE PROCEDURE SPSexoGetAll () BEGIN
SELECT
    *
FROM
    Sexo;

END / / DELIMITER;

-- 2. Obtener Sexo por Id específico
DELIMITER / / CREATE PROCEDURE SPSexoGetById (IN Id INT) BEGIN
SELECT
    *
FROM
    Sexo
WHERE
    Id = Id;

END / / DELIMITER;