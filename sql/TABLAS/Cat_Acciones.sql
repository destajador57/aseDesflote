USE [MIAUTODHL]
GO

/****** Object:  Table [dbo].[Cat_Acciones]    Script Date: 09/03/2018 12:39:21 ******/
DROP TABLE [dbo].[Cat_Acciones]
GO

/****** Object:  Table [dbo].[Cat_Acciones]    Script Date: 09/03/2018 12:39:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Cat_Acciones](
	[AccionesId] [int] IDENTITY(1,1) NOT NULL,
	[NombreAccion] [varchar](max) NULL,
 CONSTRAINT [PK_Cat_Acciones] PRIMARY KEY CLUSTERED 
(
	[AccionesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

