USE [MIAUTODHL]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_GET_UNIDADES]    Script Date: 09/03/2018 12:30:46 ******/
DROP PROCEDURE [dbo].[WEB_DHL_GET_UNIDADES]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_GET_UNIDADES]    Script Date: 09/03/2018 12:30:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<JJSY>
-- Create date: <01/03/2018>
-- Description:	<OBTENER TODAS LAS UNIDADES >
-- EXEC WEB_DHL_GET_UNIDADES
-- =============================================
CREATE PROCEDURE [dbo].[WEB_DHL_GET_UNIDADES]
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

			select  OU.UnidadId As id,OU.fecha,OU.marca,OU.submarca,OU.modelo,OU.vin,CS.NombreStatus,O.Monto monto, O.estatus estatusOferta
			,CASE WHEN (SELECT COUNT(*) FROM Ope_UnidadCotizacion AS UC WHERE UC.UnidadId=OU.UnidadId)>0 THEN 'SI'
			ELSE
			'NO'
			END AS TieneCot
			,ISNULL((SELECT TOP 1 UC.Aprobada FROM Ope_UnidadCotizacion AS UC WHERE UC.UnidadId=OU.UnidadId),0) AS Aprobada
			from [Ope_Unidad] OU
			INNER JOIN [Cat_Status] CS ON OU.statusID=CS.StatusId
			LEFT JOIN [Ope_UnidadOferta] O ON OU.UnidadId=O.UnidadId
			WHERE OU.statusID >= 2



END

GO

