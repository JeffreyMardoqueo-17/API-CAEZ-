ALTER PROCEDURE SPBuscarPadrinosPorNombre
    @NombreBusqueda VARCHAR(50)
AS
BEGIN
    SELECT * FROM Padrino
    WHERE Nombre LIKE '%' + @NombreBusqueda + '%'
    OR Apellido LIKE '%' + @NombreBusqueda + '%';
END;
GO
