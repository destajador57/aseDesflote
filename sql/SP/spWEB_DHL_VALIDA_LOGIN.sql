USE [MIAUTODHL]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_VALIDA_LOGIN]    Script Date: 09/03/2018 12:24:25 ******/
DROP PROCEDURE [dbo].[WEB_DHL_VALIDA_LOGIN]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_VALIDA_LOGIN]    Script Date: 09/03/2018 12:24:25 ******/
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
CREATE PROCEDURE [dbo].[WEB_DHL_VALIDA_LOGIN]  
	@App Int=2, -- 1) App mobil, 2 App Web
	@Usuario varchar(100) ='',
	@Password varchar(100) =''
AS
BEGIN
	SET NOCOUNT ON;
	if Exists ( Select * from Seg_Usuarios where TipoUsuarioId = @App and nombreUsuario = @Usuario and contrasenia = @Password )
		Begin 
			SELECT top 1
				
			    '1' as ok,
				SU.UsuarioId As idusuario,
				SU.nombreUsuario As usuario,
				SU.nombreCompleto As nombre,
				SU.correoElectronico As correo,
				SU.empresaId As id,
				P.nombrePerfil,
				'' as permisos
			FROM Seg_Usuarios SU
			INNER JOIN Seg_PerfilesPermiso SP ON SU.UsuarioId=SP.UsuarioId
			INNER JOIN Seg_Perfiles P ON SP.PerfilId=P.PerfilId
           	where TipoUsuarioId = @App and nombreUsuario = @Usuario and contrasenia = @Password 
		end
	else 
		Begin
			select '0' as ok;
		end
END

GO


