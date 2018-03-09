USE [MIAUTODHL]
GO

ALTER TABLE [dbo].[Rel_Docto_Unidad] DROP CONSTRAINT [FK_Rel_Docto_Unidad_Ope_Unidad]
GO

ALTER TABLE [dbo].[Rel_Docto_Unidad] DROP CONSTRAINT [FK_Rel_Docto_Unidad_Cat_Archivo]
GO

/****** Object:  Table [dbo].[Rel_Docto_Unidad]    Script Date: 09/03/2018 12:52:25 ******/
DROP TABLE [dbo].[Rel_Docto_Unidad]
GO

/****** Object:  Table [dbo].[Rel_Docto_Unidad]    Script Date: 09/03/2018 12:52:25 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Rel_Docto_Unidad](
	[Cat_TipoDoctoId] [int] NOT NULL,
	[Cat_DoctoId] [int] NOT NULL,
	[Cat_ArchivoID] [uniqueidentifier] NOT NULL,
	[Version] [int] NOT NULL,
	[UnidadId] [int] NULL,
	[Vin] [varchar](50) NULL,
 CONSTRAINT [PK_Rel_Docto_Unidad] PRIMARY KEY CLUSTERED 
(
	[Cat_TipoDoctoId] ASC,
	[Cat_DoctoId] ASC,
	[Cat_ArchivoID] ASC,
	[Version] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Rel_Docto_Unidad]  WITH CHECK ADD  CONSTRAINT [FK_Rel_Docto_Unidad_Cat_Archivo] FOREIGN KEY([Cat_TipoDoctoId], [Cat_DoctoId], [Cat_ArchivoID], [Version])
REFERENCES [dbo].[Cat_Archivo] ([Cat_TipoDoctoId], [Cat_DoctoId], [Cat_ArchivoId], [Version])
GO

ALTER TABLE [dbo].[Rel_Docto_Unidad] CHECK CONSTRAINT [FK_Rel_Docto_Unidad_Cat_Archivo]
GO

ALTER TABLE [dbo].[Rel_Docto_Unidad]  WITH CHECK ADD  CONSTRAINT [FK_Rel_Docto_Unidad_Ope_Unidad] FOREIGN KEY([UnidadId])
REFERENCES [dbo].[Ope_Unidad] ([UnidadId])
GO

ALTER TABLE [dbo].[Rel_Docto_Unidad] CHECK CONSTRAINT [FK_Rel_Docto_Unidad_Ope_Unidad]
GO

