USE [MIAUTODHL]
GO

ALTER TABLE [dbo].[Rel_Docto_Oblig] DROP CONSTRAINT [FK_Rel_Docto_Oblig_Cat_Obligatoriedad]
GO

ALTER TABLE [dbo].[Rel_Docto_Oblig] DROP CONSTRAINT [FK_Rel_Docto_Oblig_Cat_Docto]
GO

/****** Object:  Table [dbo].[Rel_Docto_Oblig]    Script Date: 09/03/2018 12:51:35 ******/
DROP TABLE [dbo].[Rel_Docto_Oblig]
GO

/****** Object:  Table [dbo].[Rel_Docto_Oblig]    Script Date: 09/03/2018 12:51:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Rel_Docto_Oblig](
	[Cat_TipoDoctoId] [int] NOT NULL,
	[Cat_DoctoId] [int] NOT NULL,
	[Cat_ObligatoriedadID] [int] NOT NULL,
	[TablaDatosEx] [varchar](100) NULL,
 CONSTRAINT [PK_Rel_Documentos] PRIMARY KEY CLUSTERED 
(
	[Cat_TipoDoctoId] ASC,
	[Cat_DoctoId] ASC,
	[Cat_ObligatoriedadID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Rel_Docto_Oblig]  WITH CHECK ADD  CONSTRAINT [FK_Rel_Docto_Oblig_Cat_Docto] FOREIGN KEY([Cat_TipoDoctoId], [Cat_DoctoId])
REFERENCES [dbo].[Cat_Docto] ([Cat_TipoDoctoId], [Cat_DoctoId])
GO

ALTER TABLE [dbo].[Rel_Docto_Oblig] CHECK CONSTRAINT [FK_Rel_Docto_Oblig_Cat_Docto]
GO

ALTER TABLE [dbo].[Rel_Docto_Oblig]  WITH CHECK ADD  CONSTRAINT [FK_Rel_Docto_Oblig_Cat_Obligatoriedad] FOREIGN KEY([Cat_ObligatoriedadID])
REFERENCES [dbo].[Cat_Obligatoriedad] ([Cat_ObligatoriedadID])
GO

ALTER TABLE [dbo].[Rel_Docto_Oblig] CHECK CONSTRAINT [FK_Rel_Docto_Oblig_Cat_Obligatoriedad]
GO

