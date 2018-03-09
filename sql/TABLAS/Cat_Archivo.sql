USE [MIAUTODHL]
GO

ALTER TABLE [dbo].[Cat_Archivo] DROP CONSTRAINT [FK_Cat_Archivo_Cat_Docto]
GO

/****** Object:  Table [dbo].[Cat_Archivo]    Script Date: 09/03/2018 12:40:26 ******/
DROP TABLE [dbo].[Cat_Archivo]
GO

/****** Object:  Table [dbo].[Cat_Archivo]    Script Date: 09/03/2018 12:40:26 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Cat_Archivo](
	[Cat_TipoDoctoId] [int] NOT NULL,
	[Cat_DoctoId] [int] NOT NULL,
	[Cat_ArchivoId] [uniqueidentifier] NOT NULL DEFAULT (newid()),
	[Version] [int] NOT NULL,
	[Cat_StatusDoctoId] [smallint] NOT NULL,
	[Fecha] [datetime] NULL,
	[Identificador] [varchar](max) NOT NULL,
	[Obserbaciones] [varchar](max) NULL,
	[Ruta] [varchar](max) NOT NULL,
	[Extencion] [varchar](max) NOT NULL,
	[Cat_OficinaID] [int] NULL,
	[Estante] [varchar](max) NOT NULL,
	[Cajon] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Cat_Archivo] PRIMARY KEY CLUSTERED 
(
	[Cat_TipoDoctoId] ASC,
	[Cat_DoctoId] ASC,
	[Cat_ArchivoId] ASC,
	[Version] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Cat_Archivo]  WITH CHECK ADD  CONSTRAINT [FK_Cat_Archivo_Cat_Docto] FOREIGN KEY([Cat_TipoDoctoId], [Cat_DoctoId])
REFERENCES [dbo].[Cat_Docto] ([Cat_TipoDoctoId], [Cat_DoctoId])
GO

ALTER TABLE [dbo].[Cat_Archivo] CHECK CONSTRAINT [FK_Cat_Archivo_Cat_Docto]
GO

