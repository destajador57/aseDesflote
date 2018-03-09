USE [MIAUTODHL]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_GET_COMUNIDAD]    Script Date: 09/03/2018 12:33:12 ******/
DROP PROCEDURE [dbo].[WEB_DHL_GET_COMUNIDAD]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_GET_COMUNIDAD]    Script Date: 09/03/2018 12:33:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<JJSY>
-- Create date: <05/03/2018>
-- Description:	<Comentarios por unidad>
-- EXEC [WEB_DHL_GET_COMUNIDAD] 341
-- =============================================
CREATE PROCEDURE [dbo].[WEB_DHL_GET_COMUNIDAD] 
	 @idUnidad INT
AS
BEGIN

	
	SELECT  
	UC.UnidadCometId AS idComentario, 
	UC.UnidadId AS idUnidad, 
	UC.Comentario AS comentario,
	UC.Fecha AS fecha,
	UC.UsuarioId AS idUsuario,
	U.nombreCompleto AS nombreCompleto 

	FROM Ope_UnidadComet UC
	INNER JOIN Seg_Usuarios U ON UC.UsuarioId=U.UsuarioId
	WHERE UnidadId=@idUnidad

END

GO

