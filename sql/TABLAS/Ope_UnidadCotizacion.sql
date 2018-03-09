USE [MIAUTODHL]
GO

ALTER TABLE [dbo].[Ope_UnidadCotizacion] DROP CONSTRAINT [FK_Ope_UnidadCotizacion_Ope_Unidad]
GO

/****** Object:  Table [dbo].[Ope_UnidadCotizacion]    Script Date: 09/03/2018 12:44:42 ******/
DROP TABLE [dbo].[Ope_UnidadCotizacion]
GO

/****** Object:  Table [dbo].[Ope_UnidadCotizacion]    Script Date: 09/03/2018 12:44:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Ope_UnidadCotizacion](
	[UnidadCotId] [int] IDENTITY(1,1) NOT NULL,
	[UnidadId] [int] NOT NULL,
	[Partida] [varchar](max) NULL,
	[Fecha] [datetime] NULL,
	[Cantidad] [int] NULL,
	[Precio] [float] NULL,
	[UsuarioId] [int] NULL,
	[Aprobada] [int] NULL,
	[FechaAprob] [datetime] NULL,
	[UsuarioAprob] [int] NULL,
 CONSTRAINT [PK_Ope_UnidadCotizacion] PRIMARY KEY CLUSTERED 
(
	[UnidadCotId] ASC,
	[UnidadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Ope_UnidadCotizacion]  WITH CHECK ADD  CONSTRAINT [FK_Ope_UnidadCotizacion_Ope_Unidad] FOREIGN KEY([UnidadId])
REFERENCES [dbo].[Ope_Unidad] ([UnidadId])
GO

ALTER TABLE [dbo].[Ope_UnidadCotizacion] CHECK CONSTRAINT [FK_Ope_UnidadCotizacion_Ope_Unidad]
GO

