USE [MIAUTODHL]
GO

/****** Object:  Table [dbo].[Cat_TipoDocto]    Script Date: 09/03/2018 12:42:47 ******/
DROP TABLE [dbo].[Cat_TipoDocto]
GO

/****** Object:  Table [dbo].[Cat_TipoDocto]    Script Date: 09/03/2018 12:42:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Cat_TipoDocto](
	[Cat_TipoDoctoId] [int] IDENTITY(1,1) NOT NULL,
	[TipoDocto] [varchar](100) NOT NULL,
 CONSTRAINT [PK_Cat_TipoDocto] PRIMARY KEY CLUSTERED 
(
	[Cat_TipoDoctoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

