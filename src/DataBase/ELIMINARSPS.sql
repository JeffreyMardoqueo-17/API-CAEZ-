DECLARE @sql NVARCHAR(MAX) = '';

SELECT @sql += 'DROP PROCEDURE ' + QUOTENAME(SCHEMA_NAME(schema_id)) + '.' + QUOTENAME(name) + ';' + CHAR(13)
FROM sys.procedures
WHERE name LIKE '%Alumno%';

EXEC sp_executesql @sql;
