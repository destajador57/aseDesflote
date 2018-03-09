USE [MIAUTODHL]
GO

ALTER TABLE [dbo].[Ope_UnidadTraslado] DROP CONSTRAINT [FK_Ope_UnidadTraslado_Ope_UnidadTraslado]
GO

/****** Object:  Table [dbo].[Ope_UnidadTraslado]    Script Date: 09/03/2018 12:51:07 ******/
DROP TABLE [dbo].[Ope_UnidadTraslado]
GO

/****** Object:  Table [dbo].[Ope_UnidadTraslado]    Script Date: 09/03/2018 12:51:07 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Ope_UnidadTraslado](
	[UnidadTrasladoId] [int] IDENTITY(1,1) NOT NULL,
	[UnidadId] [int] NOT NULL,
	[Importe] [float] NOT NULL,
	[UsuarioId] [int] NOT NULL,
	[Responsable] [varchar](20) NOT NULL,
 CONSTRAINT [PK_Ope_UnidadTraslado] PRIMARY KEY CLUSTERED 
(
	[UnidadTrasladoId] ASC,
	[UnidadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Ope_UnidadTraslado]  WITH CHECK ADD  CONSTRAINT [FK_Ope_UnidadTraslado_Ope_UnidadTraslado] FOREIGN KEY([UnidadId])
REFERENCES [dbo].[Ope_Unidad] ([UnidadId])
GO

ALTER TABLE [dbo].[Ope_UnidadTraslado] CHECK CONSTRAINT [FK_Ope_UnidadTraslado_Ope_UnidadTraslado]
GO

