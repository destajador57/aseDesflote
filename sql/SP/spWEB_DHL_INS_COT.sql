USE [MIAUTODHL]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_INS_COT]    Script Date: 09/03/2018 12:26:45 ******/
DROP PROCEDURE [dbo].[WEB_DHL_INS_COT]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_INS_COT]    Script Date: 09/03/2018 12:26:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<JAGA>
-- Create date: <07/03/2018>
-- Description:	<Inserta Cotizacion>
-- EXEC [WEB_DHL_INS_COT]'COMENTARIO EJEMPLO8',341,10
-- =============================================
CREATE PROCEDURE [dbo].[WEB_DHL_INS_COT]
	 @Partida varchar(MAX) ,
	 @Cantidad	int,
	 @Precio	float,
	 @UsuarioId int,
	 @idUnidad int
	 

AS

	BEGIN
		INSERT INTO [dbo].[Ope_UnidadCotizacion]
					([UnidadId], [Partida], [Fecha], [Cantidad], [Precio], [UsuarioId])
			 VALUES (@idUnidad, @Partida, GETDATE(), @Cantidad , @Precio, @UsuarioId )
	END
	
	SELECT [UnidadCotId],[UnidadId], [Partida], [Fecha], [Cantidad], [Precio], [UsuarioId] FROM [Ope_UnidadCotizacion]
	WHERE [UnidadId]=@idUnidad


GO

