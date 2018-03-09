USE [MIAUTODHL]
GO

/****** Object:  Table [dbo].[Seg_TipoUsuario]    Script Date: 09/03/2018 12:54:10 ******/
DROP TABLE [dbo].[Seg_TipoUsuario]
GO

/****** Object:  Table [dbo].[Seg_TipoUsuario]    Script Date: 09/03/2018 12:54:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Seg_TipoUsuario](
	[TipoUsuarioId] [int] IDENTITY(1,1) NOT NULL,
	[nombreTipoUsuario] [varchar](50) NULL,
 CONSTRAINT [PK_Seg_TipoUsuario] PRIMARY KEY CLUSTERED 
(
	[TipoUsuarioId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

