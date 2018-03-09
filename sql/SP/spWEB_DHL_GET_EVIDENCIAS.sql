USE [MIAUTODHL]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_GET_EVIDENCIAS]    Script Date: 09/03/2018 12:31:25 ******/
DROP PROCEDURE [dbo].[WEB_DHL_GET_EVIDENCIAS]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_GET_EVIDENCIAS]    Script Date: 09/03/2018 12:31:25 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<JJSY>
-- Create date: <05/03/2018>
-- Description:	<Obtener evidencias registradas por unidad>
-- EXEC [WEB_DHL_GET_EVIDENCIAS] 341
-- =============================================
CREATE PROCEDURE [dbo].[WEB_DHL_GET_EVIDENCIAS]
@idUnidad int =0
AS
BEGIN

	DECLARE @vin NVARCHAR(100)=(select vin from Ope_Unidad where [UnidadId]=@idUnidad)-- toma el vin de las unidades
	SELECT TOP 1 CA.Cat_ArchivoId,CD.Docto,Ruta,CA.Extencion,CA.Cat_DoctoId 
		from [Cat_Archivo] CA
		INNER JOIN [Cat_Docto] CD ON CA.Cat_DoctoId=CD.Cat_DoctoId
		where [Obserbaciones]=@vin and CA.Cat_DoctoId=1 
	    UNION
    SELECT TOP 1 CA.Cat_ArchivoId,CD.Docto,Ruta,CA.Extencion,CA.Cat_DoctoId
		from [Cat_Archivo] CA
		INNER JOIN [Cat_Docto] CD ON CA.Cat_DoctoId=CD.Cat_DoctoId
		where [Obserbaciones]=@vin and CA.Cat_DoctoId=2 
		UNION
    SELECT TOP 1 CA.Cat_ArchivoId,CD.Docto,Ruta,CA.Extencion,CA.Cat_DoctoId
		from [Cat_Archivo] CA
		INNER JOIN [Cat_Docto] CD ON CA.Cat_DoctoId=CD.Cat_DoctoId
		where [Obserbaciones]=@vin and CA.Cat_DoctoId=3
		UNION
	SELECT TOP 1 CA.Cat_ArchivoId,CD.Docto,Ruta,CA.Extencion,CA.Cat_DoctoId
		from [Cat_Archivo] CA
		INNER JOIN [Cat_Docto] CD ON CA.Cat_DoctoId=CD.Cat_DoctoId
		where [Obserbaciones]=@vin and CA.Cat_DoctoId=4
		UNION
	SELECT TOP 1 CA.Cat_ArchivoId,CD.Docto,Ruta,CA.Extencion,CA.Cat_DoctoId
		from [Cat_Archivo] CA
		INNER JOIN [Cat_Docto] CD ON CA.Cat_DoctoId=CD.Cat_DoctoId
		where [Obserbaciones]=@vin and CA.Cat_DoctoId=5
		UNION
	SELECT TOP 1 CA.Cat_ArchivoId,CD.Docto,Ruta,CA.Extencion,CA.Cat_DoctoId
		from [Cat_Archivo] CA
		INNER JOIN [Cat_Docto] CD ON CA.Cat_DoctoId=CD.Cat_DoctoId
		where [Obserbaciones]=@vin and CA.Cat_DoctoId=6
		UNION
	SELECT TOP 1 CA.Cat_ArchivoId,CD.Docto,Ruta,CA.Extencion,CA.Cat_DoctoId
		from [Cat_Archivo] CA
		INNER JOIN [Cat_Docto] CD ON CA.Cat_DoctoId=CD.Cat_DoctoId
		where [Obserbaciones]=@vin and CA.Cat_DoctoId=7
		UNION
	SELECT TOP 1 CA.Cat_ArchivoId,CD.Docto,Ruta,CA.Extencion,CA.Cat_DoctoId
		from [Cat_Archivo] CA
		INNER JOIN [Cat_Docto] CD ON CA.Cat_DoctoId=CD.Cat_DoctoId
		where [Obserbaciones]=@vin and CA.Cat_DoctoId=8
		UNION
	SELECT TOP 1 CA.Cat_ArchivoId,CD.Docto,Ruta,CA.Extencion,CA.Cat_DoctoId
		from [Cat_Archivo] CA
		INNER JOIN [Cat_Docto] CD ON CA.Cat_DoctoId=CD.Cat_DoctoId
		where [Obserbaciones]=@vin and CA.Cat_DoctoId=9
		UNION
	SELECT TOP 1 CA.Cat_ArchivoId,CD.Docto,Ruta,CA.Extencion,CA.Cat_DoctoId 
		from [Cat_Archivo] CA
		INNER JOIN [Cat_Docto] CD ON CA.Cat_DoctoId=CD.Cat_DoctoId
		where [Obserbaciones]=@vin and CA.Cat_DoctoId=10
		order by Cat_DoctoId


END





GO

