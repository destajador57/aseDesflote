USE [MIAUTODHL]
GO

ALTER TABLE [dbo].[Seg_Usuarios] DROP CONSTRAINT [FK_Seg_Usuarios_Seg_TipoUsuario]
GO

/****** Object:  Table [dbo].[Seg_Usuarios]    Script Date: 09/03/2018 12:54:39 ******/
DROP TABLE [dbo].[Seg_Usuarios]
GO

/****** Object:  Table [dbo].[Seg_Usuarios]    Script Date: 09/03/2018 12:54:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Seg_Usuarios](
	[UsuarioId] [int] IDENTITY(1,1) NOT NULL,
	[TipoUsuarioId] [int] NOT NULL,
	[nombreUsuario] [varchar](50) NULL,
	[contrasenia] [varchar](50) NULL,
	[nombreCompleto] [nvarchar](50) NULL,
	[correoElectronico] [nvarchar](100) NULL,
	[empresaId] [varchar](50) NULL,
 CONSTRAINT [PK_Seg_Usuarios] PRIMARY KEY CLUSTERED 
(
	[UsuarioId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Seg_Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_Seg_Usuarios_Seg_TipoUsuario] FOREIGN KEY([TipoUsuarioId])
REFERENCES [dbo].[Seg_TipoUsuario] ([TipoUsuarioId])
GO

ALTER TABLE [dbo].[Seg_Usuarios] CHECK CONSTRAINT [FK_Seg_Usuarios_Seg_TipoUsuario]
GO

