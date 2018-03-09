USE [MIAUTODHL]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_APROB_COT]    Script Date: 09/03/2018 12:34:30 ******/
DROP PROCEDURE [dbo].[WEB_DHL_APROB_COT]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_APROB_COT]    Script Date: 09/03/2018 12:34:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<JAGA>
-- Create date: <07/03/2018>
-- Description:	<Aprobar/Anular de Cotizacion>
-- EXEC [dbo].[WEB_DHL_APROB_COT] 109,1,59
-- =============================================
CREATE PROCEDURE [dbo].[WEB_DHL_APROB_COT]
	 @IdUnidad	int,
	 @IdAprob int,
	 @UsuarioId varchar(MAX)
	 

AS

SET @IdAprob = ISNULL(@IdAprob,0)

	BEGIN
		UPDATE [dbo].[Ope_UnidadCotizacion] SET Aprobada=@IdAprob,FechaAprob=GETDATE(),UsuarioAprob=@UsuarioId
		WHERE UnidadId=@IdUnidad
	END

	IF @IdAprob=1
	BEGIN
	UPDATE [dbo].[Ope_Unidad] SET statusID=3
	WHERE [UnidadId]=@IdUnidad
	END

	IF @IdAprob=2
	BEGIN 
	UPDATE [dbo].[Ope_Unidad] SET statusID=6
	WHERE [UnidadId]=@IdUnidad
	END

--DELETE [dbo].[Ope_UnidadCotizacion]

--aprobada - Reparacion
--Rechazada - Entregada BANORTE  

	
SELECT 1 AS OK

--GO
--BEGIN TRAN

--EXEC [dbo].[WEB_DHL_APROB_COT] 109,1,59

--select * from [dbo].[Ope_Unidad]
--where statusID<>1

--ROLLBACK TRAN

GO

