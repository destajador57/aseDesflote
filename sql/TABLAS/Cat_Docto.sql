USE [MIAUTODHL]
GO

ALTER TABLE [dbo].[Cat_Docto] DROP CONSTRAINT [FK_Cat_Docto_Cat_TipoDocto]
GO

/****** Object:  Table [dbo].[Cat_Docto]    Script Date: 09/03/2018 12:41:01 ******/
DROP TABLE [dbo].[Cat_Docto]
GO

/****** Object:  Table [dbo].[Cat_Docto]    Script Date: 09/03/2018 12:41:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Cat_Docto](
	[Cat_TipoDoctoId] [int] NOT NULL,
	[Cat_DoctoId] [int] NOT NULL,
	[Docto] [varchar](100) NOT NULL,
 CONSTRAINT [PK_Cat_Docto] PRIMARY KEY CLUSTERED 
(
	[Cat_TipoDoctoId] ASC,
	[Cat_DoctoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Cat_Docto]  WITH CHECK ADD  CONSTRAINT [FK_Cat_Docto_Cat_TipoDocto] FOREIGN KEY([Cat_TipoDoctoId])
REFERENCES [dbo].[Cat_TipoDocto] ([Cat_TipoDoctoId])
GO

ALTER TABLE [dbo].[Cat_Docto] CHECK CONSTRAINT [FK_Cat_Docto_Cat_TipoDocto]
GO

