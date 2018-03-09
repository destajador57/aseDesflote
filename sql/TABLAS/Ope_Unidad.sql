USE [MIAUTODHL]
GO

ALTER TABLE [dbo].[Ope_Unidad] DROP CONSTRAINT [FK_Ope_Unidad_Cat_Status]
GO

ALTER TABLE [dbo].[Ope_Unidad] DROP CONSTRAINT [FK_Ope_Unidad_Cat_Acciones]
GO

/****** Object:  Table [dbo].[Ope_Unidad]    Script Date: 09/03/2018 12:43:17 ******/
DROP TABLE [dbo].[Ope_Unidad]
GO

/****** Object:  Table [dbo].[Ope_Unidad]    Script Date: 09/03/2018 12:43:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Ope_Unidad](
	[UnidadId] [int] IDENTITY(1,1) NOT NULL,
	[vin] [varchar](50) NULL,
	[placas] [varchar](50) NULL,
	[modelo] [varchar](10) NULL,
	[marca] [varchar](50) NULL,
	[submarca] [varchar](50) NULL,
	[fecha] [datetime] NULL,
	[statusID] [int] NULL,
	[accionId] [int] NULL,
	[gps] [varchar](200) NULL,
	[combustible] [varchar](50) NULL,
	[ZonaId] [int] NULL,
	[idOperacion] [int] NULL,
	[idCentroTrabajo] [int] NULL,
	[numeroEconomico] [nvarchar](50) NULL,
 CONSTRAINT [PK_Ope_Unidad] PRIMARY KEY CLUSTERED 
(
	[UnidadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Ope_Unidad]  WITH CHECK ADD  CONSTRAINT [FK_Ope_Unidad_Cat_Acciones] FOREIGN KEY([accionId])
REFERENCES [dbo].[Cat_Acciones] ([AccionesId])
GO

ALTER TABLE [dbo].[Ope_Unidad] CHECK CONSTRAINT [FK_Ope_Unidad_Cat_Acciones]
GO

ALTER TABLE [dbo].[Ope_Unidad]  WITH CHECK ADD  CONSTRAINT [FK_Ope_Unidad_Cat_Status] FOREIGN KEY([statusID])
REFERENCES [dbo].[Cat_Status] ([StatusId])
GO

ALTER TABLE [dbo].[Ope_Unidad] CHECK CONSTRAINT [FK_Ope_Unidad_Cat_Status]
GO

