USE [master]
GO
/****** Object:  Database [SoLienLac-Test]    Script Date: 5/24/2024 2:57:04 PM ******/
CREATE DATABASE [SoLienLac-Test]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SoLienLac-Test', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\SoLienLac-Test.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SoLienLac-Test_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\SoLienLac-Test_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [SoLienLac-Test] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SoLienLac-Test].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SoLienLac-Test] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET ARITHABORT OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SoLienLac-Test] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SoLienLac-Test] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SoLienLac-Test] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SoLienLac-Test] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SoLienLac-Test] SET  MULTI_USER 
GO
ALTER DATABASE [SoLienLac-Test] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SoLienLac-Test] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SoLienLac-Test] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SoLienLac-Test] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SoLienLac-Test] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SoLienLac-Test] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [SoLienLac-Test] SET QUERY_STORE = ON
GO
ALTER DATABASE [SoLienLac-Test] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [SoLienLac-Test]
GO
/****** Object:  Table [dbo].[DiemDanh]    Script Date: 5/24/2024 2:57:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DiemDanh](
	[MaDiemDanh] [int] IDENTITY(1,1) NOT NULL,
	[MaHocKi] [varchar](255) NULL,
	[MaLop] [int] NULL,
	[MaMonHoc] [int] NULL,
	[MaTaiKhoan] [varchar](255) NULL,
	[TrangThai] [bit] NULL,
	[ThoiGianDiemDanh] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaDiemDanh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HocKi]    Script Date: 5/24/2024 2:57:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HocKi](
	[MaHocKi] [varchar](255) NOT NULL,
	[TenHocKi] [nvarchar](255) NOT NULL,
	[ThoiGianBatDau] [date] NULL,
	[ThoiGianKetThuc] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaHocKi] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HocPhi]    Script Date: 5/24/2024 2:57:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HocPhi](
	[MaHocPhi] [int] IDENTITY(1,1) NOT NULL,
	[TongTien] [real] NOT NULL,
	[MaTaiKhoan] [varchar](255) NULL,
	[MaHocKi] [varchar](255) NULL,
	[HanDong] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaHocPhi] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Lop]    Script Date: 5/24/2024 2:57:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lop](
	[MaLop] [int] IDENTITY(1,1) NOT NULL,
	[TenLop] [nvarchar](255) NOT NULL,
	[SiSo] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaLop] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [unique_tenlop] UNIQUE NONCLUSTERED 
(
	[TenLop] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MonHoc]    Script Date: 5/24/2024 2:57:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MonHoc](
	[MaMonHoc] [int] IDENTITY(1,1) NOT NULL,
	[TenMonHoc] [nvarchar](255) NOT NULL,
	[ThoiGianBatDauMonHoc] [varchar](5) NULL,
	[ThoiGianKetThucMonHoc] [varchar](5) NULL,
	[SoTien] [real] NOT NULL,
	[MaTaiKhoan] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaMonHoc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UC_TenMonHoc_ThoiGian] UNIQUE NONCLUSTERED 
(
	[TenMonHoc] ASC,
	[ThoiGianBatDauMonHoc] ASC,
	[ThoiGianKetThucMonHoc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MonHocChiTiet]    Script Date: 5/24/2024 2:57:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MonHocChiTiet](
	[MaMonHocChiTiet] [int] IDENTITY(1,1) NOT NULL,
	[MaMonHoc] [int] NOT NULL,
	[MaLop] [int] NOT NULL,
	[MaHocKi] [varchar](255) NOT NULL,
	[ThoiGian] [nvarchar](30) NOT NULL,
	[Diem] [real] NULL,
	[isExport] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaMonHocChiTiet] ASC,
	[MaMonHoc] ASC,
	[MaLop] ASC,
	[MaHocKi] ASC,
	[ThoiGian] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaiKhoan]    Script Date: 5/24/2024 2:57:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaiKhoan](
	[MaTaiKhoan] [varchar](255) NOT NULL,
	[TenTaiKhoan] [varchar](255) NOT NULL,
	[MatKhau] [varchar](255) NOT NULL,
	[HoVaTen] [nvarchar](255) NOT NULL,
	[SoDienThoai] [varchar](11) NULL,
	[DiaChi] [nvarchar](255) NOT NULL,
	[NamSinh] [date] NULL,
	[GioiTinh] [bit] NOT NULL,
	[KhoaTaiKhoan] [bit] NULL,
	[MaLop] [int] NULL,
	[MaVaiTro] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaTaiKhoan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[TenTaiKhoan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VaiTro]    Script Date: 5/24/2024 2:57:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VaiTro](
	[MaVaiTro] [varchar](255) NOT NULL,
	[TenVaiTro] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaVaiTro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Yeu_Cau]    Script Date: 5/24/2024 2:57:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Yeu_Cau](
	[MaYeuCau] [int] IDENTITY(1,1) NOT NULL,
	[TenYeuCau] [nvarchar](255) NOT NULL,
	[NoiDung] [nvarchar](255) NOT NULL,
	[MaTaiKhoanGui] [varchar](255) NULL,
	[MaTaiKhoanNhan] [varchar](255) NULL,
	[DaDoc] [bit] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MonHocChiTiet] ADD  DEFAULT ((0)) FOR [isExport]
GO
ALTER TABLE [dbo].[Yeu_Cau] ADD  DEFAULT ((0)) FOR [DaDoc]
GO
ALTER TABLE [dbo].[DiemDanh]  WITH CHECK ADD  CONSTRAINT [FK__DiemDanh__MaHocK__2C29722F] FOREIGN KEY([MaMonHoc])
REFERENCES [dbo].[MonHoc] ([MaMonHoc])
GO
ALTER TABLE [dbo].[DiemDanh] CHECK CONSTRAINT [FK__DiemDanh__MaHocK__2C29722F]
GO
ALTER TABLE [dbo].[DiemDanh]  WITH CHECK ADD FOREIGN KEY([MaLop])
REFERENCES [dbo].[Lop] ([MaLop])
GO
ALTER TABLE [dbo].[DiemDanh]  WITH CHECK ADD FOREIGN KEY([MaTaiKhoan])
REFERENCES [dbo].[TaiKhoan] ([MaTaiKhoan])
GO
ALTER TABLE [dbo].[HocPhi]  WITH CHECK ADD FOREIGN KEY([MaHocKi])
REFERENCES [dbo].[HocKi] ([MaHocKi])
GO
ALTER TABLE [dbo].[HocPhi]  WITH CHECK ADD FOREIGN KEY([MaTaiKhoan])
REFERENCES [dbo].[TaiKhoan] ([MaTaiKhoan])
GO
ALTER TABLE [dbo].[MonHoc]  WITH CHECK ADD FOREIGN KEY([MaTaiKhoan])
REFERENCES [dbo].[TaiKhoan] ([MaTaiKhoan])
GO
ALTER TABLE [dbo].[MonHocChiTiet]  WITH CHECK ADD  CONSTRAINT [FK__MonHocChi__MaHoc__72BBEAA9] FOREIGN KEY([MaMonHoc])
REFERENCES [dbo].[MonHoc] ([MaMonHoc])
GO
ALTER TABLE [dbo].[MonHocChiTiet] CHECK CONSTRAINT [FK__MonHocChi__MaHoc__72BBEAA9]
GO
ALTER TABLE [dbo].[MonHocChiTiet]  WITH CHECK ADD FOREIGN KEY([MaLop])
REFERENCES [dbo].[Lop] ([MaLop])
GO
ALTER TABLE [dbo].[TaiKhoan]  WITH CHECK ADD FOREIGN KEY([MaLop])
REFERENCES [dbo].[Lop] ([MaLop])
GO
ALTER TABLE [dbo].[TaiKhoan]  WITH CHECK ADD FOREIGN KEY([MaVaiTro])
REFERENCES [dbo].[VaiTro] ([MaVaiTro])
GO
ALTER TABLE [dbo].[Yeu_Cau]  WITH CHECK ADD FOREIGN KEY([MaTaiKhoanGui])
REFERENCES [dbo].[TaiKhoan] ([MaTaiKhoan])
GO
ALTER TABLE [dbo].[Yeu_Cau]  WITH CHECK ADD FOREIGN KEY([MaTaiKhoanNhan])
REFERENCES [dbo].[TaiKhoan] ([MaTaiKhoan])
GO
USE [master]
GO
ALTER DATABASE [SoLienLac-Test] SET  READ_WRITE 
GO
