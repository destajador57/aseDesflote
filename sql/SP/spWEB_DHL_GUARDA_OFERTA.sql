USE [MIAUTODHL]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_GUARDA_OFERTA]    Script Date: 09/03/2018 12:28:24 ******/
DROP PROCEDURE [dbo].[WEB_DHL_GUARDA_OFERTA]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_GUARDA_OFERTA]    Script Date: 09/03/2018 12:28:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO







-- =============================================
-- Author:		<ALC>
-- Create date: <07/03/2018>
-- Description:	<Cotizacion por unidad>
-- EXEC [WEB_DHL_GUARDA_OFERTA] 341
-- =============================================
CREATE PROCEDURE [dbo].[WEB_DHL_GUARDA_OFERTA] 
	 @idUsuario INT,
	 @idUnidad INT,
	 @monto float,
	 @estatus varchar(MAX)
AS
BEGIN	
	if not exists(SELECT UnidadId FROM [Ope_UnidadOferta] WHERE [UnidadId] = @idUnidad)
		begin
			insert into [Ope_UnidadOferta]
			(UnidadId, Monto, Estatus, Fecha, UsuarioId)
			VALUES
			(@idUnidad, @monto, CASE WHEN @estatus = 'null' then NULL else @estatus end, GETDATE(), @idUsuario)
			
			update [Ope_Unidad]
			set statusID = 4
			where UnidadId = @idUnidad
		end
	else
		begin
			update [Ope_UnidadOferta]
			set Monto = @monto, Estatus = CASE WHEN @estatus = 'null' then NULL else @estatus end
			where UnidadId = @idUnidad

			if(@estatus = 'Aceptada')
			begin
				update [Ope_Unidad]
				set statusID = 5
				where UnidadId = @idUnidad
			end
		end

	SELECT [UnidadOfertaId],[UnidadId], [Monto], [Estatus], [Fecha], [UsuarioId]
	FROM [Ope_UnidadOferta]
	WHERE [UnidadId] = @idUnidad
END

GO

