USE [MIAUTODHL]
GO

ALTER TABLE [dbo].[Seg_PerfilesPermiso] DROP CONSTRAINT [FK_Seg_PerfilesPermiso_Seg_Usuarios]
GO

ALTER TABLE [dbo].[Seg_PerfilesPermiso] DROP CONSTRAINT [FK_Seg_PerfilesPermiso_Seg_Perfiles]
GO

/****** Object:  Table [dbo].[Seg_PerfilesPermiso]    Script Date: 09/03/2018 12:53:33 ******/
DROP TABLE [dbo].[Seg_PerfilesPermiso]
GO

/****** Object:  Table [dbo].[Seg_PerfilesPermiso]    Script Date: 09/03/2018 12:53:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Seg_PerfilesPermiso](
	[PerfilId] [int] NOT NULL,
	[UsuarioId] [int] NOT NULL,
	[Table] [varchar](100) NOT NULL,
	[Columna] [varchar](100) NOT NULL,
	[Permiso] [varchar](1) NOT NULL,
 CONSTRAINT [PK_Seg_PerfilesPermiso] PRIMARY KEY CLUSTERED 
(
	[PerfilId] ASC,
	[UsuarioId] ASC,
	[Table] ASC,
	[Columna] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Seg_PerfilesPermiso]  WITH CHECK ADD  CONSTRAINT [FK_Seg_PerfilesPermiso_Seg_Perfiles] FOREIGN KEY([PerfilId])
REFERENCES [dbo].[Seg_Perfiles] ([PerfilId])
GO

ALTER TABLE [dbo].[Seg_PerfilesPermiso] CHECK CONSTRAINT [FK_Seg_PerfilesPermiso_Seg_Perfiles]
GO

ALTER TABLE [dbo].[Seg_PerfilesPermiso]  WITH CHECK ADD  CONSTRAINT [FK_Seg_PerfilesPermiso_Seg_Usuarios] FOREIGN KEY([UsuarioId])
REFERENCES [dbo].[Seg_Usuarios] ([UsuarioId])
GO

ALTER TABLE [dbo].[Seg_PerfilesPermiso] CHECK CONSTRAINT [FK_Seg_PerfilesPermiso_Seg_Usuarios]
GO

