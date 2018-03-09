USE [MIAUTODHL]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_DEL_COT]    Script Date: 09/03/2018 12:33:45 ******/
DROP PROCEDURE [dbo].[WEB_DHL_DEL_COT]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_DEL_COT]    Script Date: 09/03/2018 12:33:45 ******/
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
CREATE PROCEDURE [dbo].[WEB_DHL_DEL_COT]
	 @IdPartida	int
	 

AS
	BEGIN
		DELETE [dbo].[Ope_UnidadCotizacion]
		WHERE [UnidadCotId]=@IdPartida
	END
	
SELECT 1 AS OK


GO

