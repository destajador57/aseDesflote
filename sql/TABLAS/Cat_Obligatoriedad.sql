USE [MIAUTODHL]
GO

/****** Object:  Table [dbo].[Cat_Obligatoriedad]    Script Date: 09/03/2018 12:41:35 ******/
DROP TABLE [dbo].[Cat_Obligatoriedad]
GO

/****** Object:  Table [dbo].[Cat_Obligatoriedad]    Script Date: 09/03/2018 12:41:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Cat_Obligatoriedad](
	[Cat_ObligatoriedadID] [int] NOT NULL,
	[PersonalidadID] [varchar](2) NULL,
	[Maximo] [int] NULL,
	[Minimo] [int] NULL,
	[Caducidad] [varchar](2) NULL,
 CONSTRAINT [PK_Rel_Constr] PRIMARY KEY CLUSTERED 
(
	[Cat_ObligatoriedadID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

