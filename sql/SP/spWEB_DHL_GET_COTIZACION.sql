USE [MIAUTODHL]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_GET_COTIZACION]    Script Date: 09/03/2018 12:32:01 ******/
DROP PROCEDURE [dbo].[WEB_DHL_GET_COTIZACION]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_GET_COTIZACION]    Script Date: 09/03/2018 12:32:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<JAGA>
-- Create date: <07/03/2018>
-- Description:	<Cotizacion por unidad>
-- EXEC [WEB_DHL_GET_COTIZACION] 341
-- =============================================
CREATE PROCEDURE [dbo].[WEB_DHL_GET_COTIZACION] 
	 @idUnidad INT
AS
BEGIN

	
	SELECT  
	UC.UnidadCotId AS idCotizacion, 
	UC.UnidadId AS idUnidad, 
	UC.Partida AS partida,
	UC.Fecha AS fecha,
	UC.Cantidad AS cantidad,
	UC.Precio AS precio,
	UC.UsuarioId AS idUsuario,
	ISNULL(UC.Aprobada,0) AS aprobada
	FROM [Ope_UnidadCotizacion] UC
	INNER JOIN Seg_Usuarios U ON UC.UsuarioId=U.UsuarioId
	WHERE UC.UnidadId=@idUnidad

END

GO

