USE [EmployeeDB]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 4/7/2022 11:46:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Companies]    Script Date: 4/7/2022 11:46:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Companies](
	[CompanyName] [nvarchar](max) NULL,
	[CompanyId] [int] IDENTITY(1,1) NOT NULL,
	[DateCreated] [datetime2](7) NULL,
	[DateUpdated] [datetime2](7) NULL,
 CONSTRAINT [PK_Companies] PRIMARY KEY CLUSTERED 
(
	[CompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Deductions]    Script Date: 4/7/2022 11:46:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Deductions](
	[DeductionId] [int] IDENTITY(1,1) NOT NULL,
	[PaycheckId] [int] NOT NULL,
	[Discount] [numeric](18, 2) NULL,
	[Name] [varchar](50) NULL,
	[Cost] [numeric](18, 2) NULL,
 CONSTRAINT [PK__Deductio__E2604C5749F010BF] PRIMARY KEY CLUSTERED 
(
	[DeductionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Dependents]    Script Date: 4/7/2022 11:46:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dependents](
	[DependentId] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [int] NOT NULL,
	[DependentFirstName] [varchar](30) NULL,
	[DependentLastName] [varchar](30) NULL,
	[DependentSSN] [varchar](9) NULL,
	[DateCreated] [date] NULL,
	[DateUpdated] [date] NULL,
	[DateOfBirth] [datetime2](7) NULL,
 CONSTRAINT [PK__Dependen__9BC67CF1B2EA84BA] PRIMARY KEY CLUSTERED 
(
	[DependentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 4/7/2022 11:46:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[EmployeeId] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeFirstName] [varchar](30) NULL,
	[EmployeeLastName] [varchar](30) NULL,
	[EmployeeSSN] [varchar](9) NULL,
	[DateCreated] [date] NULL,
	[DateUpdated] [date] NULL,
	[DateOfBirth] [datetime2](7) NULL,
	[IsTerminated] [bit] NULL,
	[CompanyId] [int] NOT NULL,
 CONSTRAINT [PK__Employee__7AD04F113516F170] PRIMARY KEY CLUSTERED 
(
	[EmployeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Paychecks]    Script Date: 4/7/2022 11:46:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Paychecks](
	[PaycheckId] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [int] NOT NULL,
	[GrossPay] [numeric](18, 2) NULL,
	[DeductionsTotal] [numeric](18, 2) NULL,
	[NetPay] [numeric](18, 2) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[PayrollId] [int] NOT NULL,
 CONSTRAINT [PK__Paycheck__E1043DFE65C7B3C5] PRIMARY KEY CLUSTERED 
(
	[PaycheckId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payrolls]    Script Date: 4/7/2022 11:46:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payrolls](
	[PayrollId] [int] IDENTITY(1,1) NOT NULL,
	[CompanyId] [int] NOT NULL,
	[CreatedDate] [datetime2](7) NULL,
	[StartDate] [datetime2](7) NULL,
	[EndDate] [datetime2](7) NULL,
 CONSTRAINT [PK_Payrolls] PRIMARY KEY CLUSTERED 
(
	[PayrollId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Paychecks] ADD  DEFAULT ((0)) FOR [PayrollId]
GO
ALTER TABLE [dbo].[Deductions]  WITH CHECK ADD  CONSTRAINT [FK_Deductions_Paychecks] FOREIGN KEY([PaycheckId])
REFERENCES [dbo].[Paychecks] ([PaycheckId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Deductions] CHECK CONSTRAINT [FK_Deductions_Paychecks]
GO
ALTER TABLE [dbo].[Dependents]  WITH CHECK ADD  CONSTRAINT [FK__Dependent__Emplo__534D60F1] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employees] ([EmployeeId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Dependents] CHECK CONSTRAINT [FK__Dependent__Emplo__534D60F1]
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD  CONSTRAINT [FK_Employees_Companies_CompanyId] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Companies] ([CompanyId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Employees] CHECK CONSTRAINT [FK_Employees_Companies_CompanyId]
GO
ALTER TABLE [dbo].[Paychecks]  WITH CHECK ADD  CONSTRAINT [FK_Paycheck_Employees] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employees] ([EmployeeId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Paychecks] CHECK CONSTRAINT [FK_Paycheck_Employees]
GO
ALTER TABLE [dbo].[Paychecks]  WITH CHECK ADD  CONSTRAINT [FK_Paychecks_Payrolls_PayrollId] FOREIGN KEY([PayrollId])
REFERENCES [dbo].[Payrolls] ([PayrollId])
GO
ALTER TABLE [dbo].[Paychecks] CHECK CONSTRAINT [FK_Paychecks_Payrolls_PayrollId]
GO
ALTER TABLE [dbo].[Payrolls]  WITH CHECK ADD  CONSTRAINT [FK_Payrolls_Companies_CompanyId] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Companies] ([CompanyId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Payrolls] CHECK CONSTRAINT [FK_Payrolls_Companies_CompanyId]
GO
