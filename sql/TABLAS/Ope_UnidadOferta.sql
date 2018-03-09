USE [MIAUTODHL]
GO

ALTER TABLE [dbo].[Ope_UnidadOferta] DROP CONSTRAINT [FK_Ope_UnidadOferta_Ope_Unidad]
GO

/****** Object:  Table [dbo].[Ope_UnidadOferta]    Script Date: 09/03/2018 12:50:30 ******/
DROP TABLE [dbo].[Ope_UnidadOferta]
GO

/****** Object:  Table [dbo].[Ope_UnidadOferta]    Script Date: 09/03/2018 12:50:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Ope_UnidadOferta](
	[UnidadOfertaId] [int] IDENTITY(1,1) NOT NULL,
	[UnidadId] [int] NOT NULL,
	[Monto] [float] NOT NULL,
	[Estatus] [nvarchar](50) NULL,
	[Fecha] [datetime] NOT NULL,
	[UsuarioId] [int] NOT NULL,
 CONSTRAINT [PK_Ope_UnidadOferta] PRIMARY KEY CLUSTERED 
(
	[UnidadOfertaId] ASC,
	[UnidadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Ope_UnidadOferta]  WITH CHECK ADD  CONSTRAINT [FK_Ope_UnidadOferta_Ope_Unidad] FOREIGN KEY([UnidadId])
REFERENCES [dbo].[Ope_Unidad] ([UnidadId])
GO

ALTER TABLE [dbo].[Ope_UnidadOferta] CHECK CONSTRAINT [FK_Ope_UnidadOferta_Ope_Unidad]
GO

