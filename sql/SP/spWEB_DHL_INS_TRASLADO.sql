USE [MIAUTODHL]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_INS_TRASLADO]    Script Date: 09/03/2018 12:25:51 ******/
DROP PROCEDURE [dbo].[WEB_DHL_INS_TRASLADO]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_INS_TRASLADO]    Script Date: 09/03/2018 12:25:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO










-- =============================================
-- Author:		<ALC>
-- Create date: <07/03/2018>
-- Description:	<Traslado por unidad>
-- EXEC [WEB_DHL_INS_TRASLADO] 10, 341, 5000, 'TotalParts'
-- =============================================
CREATE PROCEDURE [dbo].[WEB_DHL_INS_TRASLADO] 
	 @idUsuario INT,
	 @idUnidad INT,
	 @importe float,
	 @responsable varchar(20)
AS
BEGIN
	if not exists(SELECT UnidadId FROM [Ope_UnidadTraslado] WHERE [UnidadId] = @idUnidad)
	begin
		INSERT INTO [dbo].[Ope_UnidadTraslado]
           ([UnidadId],[Importe],[Responsable],[UsuarioId])
		VALUES
           (@idUnidad,@importe,@responsable,@idUsuario)
	END
	else
	begin
		UPDATE [dbo].[Ope_UnidadTraslado]
		SET Responsable = @responsable, Importe = @importe
		WHERE UnidadId = @idUnidad
	end

	update [Ope_Unidad]
	set statusID = 6
	where UnidadId = @idUnidad

	select '1' as ok;
	
END

GO

