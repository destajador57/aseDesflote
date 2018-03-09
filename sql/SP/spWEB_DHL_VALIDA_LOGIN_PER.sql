USE [MIAUTODHL]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_VALIDA_LOGIN_PER]    Script Date: 09/03/2018 12:22:42 ******/
DROP PROCEDURE [dbo].[WEB_DHL_VALIDA_LOGIN_PER]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_VALIDA_LOGIN_PER]    Script Date: 09/03/2018 12:22:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<JJSY>
-- Create date: <27/02/2018>
-- Description:	<Login Web>
-- EXEC [WEB_DHL_VALIDA_LOGIN]  2, 'userweb','123'
-- =============================================
CREATE PROCEDURE [dbo].[WEB_DHL_VALIDA_LOGIN_PER]  
	@App Int=2, -- 1) App mobil, 2 App Web
	@Usuario varchar(100) ='',
	@Password varchar(100) =''
AS
BEGIN
	SET NOCOUNT ON;
	if Exists ( Select * from Seg_Usuarios where TipoUsuarioId = @App and nombreUsuario = @Usuario and contrasenia = @Password )
		Begin 
			SELECT 
               SP.columna,
			   SP.Permiso as permiso
            FROM Seg_Usuarios SU
            INNER JOIN Seg_PerfilesPermiso SP ON SU.UsuarioId=SP.UsuarioId
           	where TipoUsuarioId = @App and nombreUsuario = @Usuario and contrasenia = @Password 
		end
END

GO

