USE [MIAUTODHL]
GO

ALTER TABLE [dbo].[Ope_UnidadComet] DROP CONSTRAINT [FK_Ope_UnidadComet_Ope_Unidad]
GO

/****** Object:  Table [dbo].[Ope_UnidadComet]    Script Date: 09/03/2018 12:43:52 ******/
DROP TABLE [dbo].[Ope_UnidadComet]
GO

/****** Object:  Table [dbo].[Ope_UnidadComet]    Script Date: 09/03/2018 12:43:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Ope_UnidadComet](
	[UnidadCometId] [int] IDENTITY(1,1) NOT NULL,
	[UnidadId] [int] NOT NULL,
	[Comentario] [varchar](max) NULL,
	[Fecha] [datetime] NULL,
	[UsuarioId] [int] NULL,
 CONSTRAINT [PK_Ope_UnidadComet] PRIMARY KEY CLUSTERED 
(
	[UnidadCometId] ASC,
	[UnidadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Ope_UnidadComet]  WITH CHECK ADD  CONSTRAINT [FK_Ope_UnidadComet_Ope_Unidad] FOREIGN KEY([UnidadId])
REFERENCES [dbo].[Ope_Unidad] ([UnidadId])
GO

ALTER TABLE [dbo].[Ope_UnidadComet] CHECK CONSTRAINT [FK_Ope_UnidadComet_Ope_Unidad]
GO

