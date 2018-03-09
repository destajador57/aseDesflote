USE [MIAUTODHL]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_GET_VIN]    Script Date: 09/03/2018 12:29:06 ******/
DROP PROCEDURE [dbo].[WEB_DHL_GET_VIN]
GO

/****** Object:  StoredProcedure [dbo].[WEB_DHL_GET_VIN]    Script Date: 09/03/2018 12:29:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<JJSY>
-- Create date: <27/02/2018>
-- Description:	<Busqueda por (Vin o Placas) y Status>
-- EXEC [dbo].[WEB_DHL_GET_VIN] 'KY9' o EXEC [dbo].[WEB_DHL_GET_VIN] 'ZFAEA7589C2120289'
-- =============================================
CREATE PROCEDURE [dbo].[WEB_DHL_GET_VIN] 
	@Vin Varchar(20)=''
	
	AS
BEGIN
	SET NOCOUNT ON;
	if Exists ( Select * from Ope_Unidad where vin like '%' + @Vin + '%')
		Begin 
			Select * from Ope_Unidad where vin like '%' + @Vin + '%'
		end
	else 
		Begin
			if Exists ( Select * from Ope_Unidad where placas like '%' + @Vin + '%')
				Begin 
					Select * from Ope_Unidad where placas like '%' + @Vin + '%' 
				end
			else 
				Begin
					select '0' as ok;
				end;
		end
	
END





GO

