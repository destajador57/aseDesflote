USE [MIAUTODHL]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_INS_COM]    Script Date: 09/03/2018 12:27:47 ******/
DROP PROCEDURE [dbo].[WEB_DHL_INS_COM]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_INS_COM]    Script Date: 09/03/2018 12:27:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<JJSY>
-- Create date: <06/03/2018>
-- Description:	<Inserta Comentario>
-- EXEC [WEB_DHL_INS_COM]'COMENTARIO EJEMPLO8',341
-- =============================================
CREATE PROCEDURE [dbo].[WEB_DHL_INS_COM]
	 @Comentario varchar(MAX) ,
	 @UsuarioId int,
	 @idUnidad int
	 

AS

	BEGIN
		INSERT INTO [Ope_UnidadComet]
					(UnidadId,Comentario,Fecha,UsuarioId)
			 VALUES (@idUnidad, @Comentario, GETDATE(),@UsuarioId)
	END

	select '1' as ok;


GO

