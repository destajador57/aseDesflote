
-- Nombre: ASEDesflote
-- Tipo: base de datos
-- Desarrollador: Miguel Angel Reyes Xinaxtle
-- Objetivo: Base de datos para administrar el desflote de grupo andrade
-- aplicaciones: Asedesflote web y Asedesflote movil

CREATE DATABASE ASEDesflote

-- Nombre: ASEDesflote
-- Tipo: esquema
-- Desarrollador: Miguel Angel Reyes Xinaxtle
-- Objetivo: Agrupar las tablas que forman parte de la seguridad
-- aplicaciones: Asedesflote web y Asedesflote movil

USE [ASEDesflote]
GO

CREATE SCHEMA [Seguridad]
GO

-- Nombre: ASEDesflote
-- Tipo: esquema
-- Desarrollador: Miguel Angel Reyes Xinaxtle
-- Objetivo: Agrupar las tablas que funcionan como catalogos
-- aplicaciones: Asedesflote web y Asedesflote movil

USE [ASEDesflote]
GO

CREATE SCHEMA [Catalogo]
GO

-- Nombre: ASEDesflote
-- Tipo: esquema
-- Desarrollador: Miguel Angel Reyes Xinaxtle
-- Objetivo: Agrupar las tablas que funcionan de core para la aplicación
-- aplicaciones: Asedesflote web y Asedesflote movil

USE [ASEDesflote]
GO

CREATE SCHEMA [Operacion]
GO

-- Nombre: ASEDesflote
-- Tipo: esquema
-- Desarrollador: Miguel Angel Reyes Xinaxtle
-- Objetivo: Agrupar las tablas que funcionan como relaciones entre tablas
-- aplicaciones: Asedesflote web y Asedesflote movil

USE [ASEDesflote]
GO

CREATE SCHEMA [Relacion]
GO
