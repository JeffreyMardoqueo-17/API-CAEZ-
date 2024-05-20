EXEC SPInsertarUsuario 
    @Name = 'Nombre', 
    @LastName = 'Apellido', 
    @Login = 'usuario@email.com', 
    @Password = 'contrase�a', 
    @Status = 1, 
    @RegistrationDate = GETDATE(), 
    @IdRole = 1;
