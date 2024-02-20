SELECT
    o.name AS NombreProcedimiento,
    o.type_desc AS Tipo,
    m.definition AS Definicion
FROM
    sys.sql_modules AS m
JOIN
    sys.objects AS o ON m.object_id = o.object_id
WHERE
    o.type = 'P'
ORDER BY
    CHARINDEX('--Tabla:', m.definition), o.name;

