# **CHÚ Ý:**
> * Tải thư thì gõ: `npm i --save-dev`
> * Tạo branch mới mỗi khi làm một chức năng vào giao diện mới, đặt tên branch "tên người làm - tên chức năng".
> * Cấu hình các Driver trong ODBC(64 bit)
> * Thay tên sever và tên database trong connectString
> * Dùng phiên bản npm version 9.5.1 và node 18.16.1
# TỔNG QUAN VỀ PROJECT:
* Hệ thống webapp sổ liên lạc điện tử giúp cho học sinh và nhà trường có thể dễ theo dõi các thông tin về học phí, môn học, điểm số va thông tin cá nhân. 
## CÁC CHỨC NĂNG:
* **Back-end**: Đọc thông tin lớp học, đọc thông tin học sinh, xem học phí, sửa(cập nhật) thông tin học sinh, sửa(cập nhật) thông tin giáo viên, giáo viên nhập điểm, admin khoá tài khoản, admin tạo tài khoản, admin phân lớp, admin phân quyền.
* **Front-end**: Tạo giao diện đăng nhập, tạo giao diện
xem thông tin học sinh, tạo giao diện xem thông tin giáo viên, tạo giao diện thời khoá biểu, tạo giao diện xem học phí, tạo giao diện sửa thông tin, tạo giao diện nhập điểm, tạo giao diện khoá tài khoản, tạo giao diện trang About, sửa phần footer
## Phân công:
* **Nam**: Đọc thông tin lớp học, đọc thông tin học sinh, xem học phí, sửa(cập nhật) thông tin học sinh, sửa(cập nhật) thông tin giáo viên, giáo viên nhập điểm, admin khoá tài khoản, admin tạo tài khoản, admin phân lớp, admin phân quyền, giáo viên gửi yêu cầu sửa điểm
* **Thắng**: Tạo giao diện đăng nhập, tạo giao diện
xem thông tin học sinh, tạo giao diện xem thông tin giáo viên, tạo giao diện thời khoá biểu.
* **Tuấn**: tạo giao diện xem học phí, tạo giao diện sửa thông tin, tạo giao diện nhập điểm, tạo giao diện khoá tài khoản
* **Việt Anh**: Tạo giao diện trang About, sửa phần , footer, tạo giao diện điểm danh. 
## Các document:
* [Handlebars](https://handlebarsjs.com/guide/#what-is-handlebars)
* [Express](https://expressjs.com/)
* [Sử dụng git](https://youtu.be/-VmX40r5ARI?si=k9KSQ8acmji6Sumi)
* [Tải node với nvm](https://youtu.be/4b1Z6ezUsT4?si=zUPH3pZzR1mimwtD)
## Cơ sở dữ liệu: 
* Bảng lớp:

`   CREATE TABLE Lop (
	MaLop int IDENTITY(1,1),
	TenLop nvarchar(255) NOT NULL,
	SiSo int NOT NULL,
	PRIMARY KEY(MaLop),
);
GO`
* Bảng vai trò:

`   CREATE TABLE VaiTro (
	MaVaiTro varchar(255) NOT NULL,
	TenVaiTro NVARCHAR(255) NOT NULL,
	PRIMARY KEY(MaVaiTro),
);`
* Bảng tài khoản:

`   CREATE TABLE TaiKhoan (
	MaTaiKhoan varchar(255) NOT NULL,
	TenTaiKhoan varchar(255) NOT NULL UNIQUE,
	MatKhau varchar(255) NOT NULL,
	HoVaTen nvarchar(255) NOT NULL,
	SoDienThoai varchar(11) NUll,
	DiaChi  nvarchar(255) NOT NUll,
	NamSinh Date,
	GioiTinh BIT NOT NULL,
	KhoaTaiKhoan BIT,
	MaLop int NULL,
	MaVaiTro varchar(255),
	PRIMARY KEY(MaTaiKhoan),
    FOREIGN KEY(MaLop) REFERENCES Lop(MaLop),
    FOREIGN KEY(MaVaiTro) REFERENCES VaiTro(MaVaiTro)
);`
* Bảng Yêu cầu:

`   CREATE TABLE Yeu_Cau (
	MaYeuCau int IDENTITY(1,1),
	TenYeuCau nvarchar(255) NOT NULL,
	TinhTrangXuLy BIT NOT NULL,
	MaTaiKhoan varchar(255),
	PRIMARY KEY(MaYeuCau),
    FOREIGN KEY(MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan)
);
GO`
* Bảng Môn học:

`  CREATE TABLE MonHoc (
	MaMonHoc INT IDENTITY(1,1),
	TenMonHoc nvarchar(255) NOT NULL,
	ThoiGianBatDau TIME,
	ThoiGianKetThuc TIME,
	SoTien float(10) NOT NULL,
	MaTaiKhoan varchar(255),
	PRIMARY KEY(MaMonHoc),
	FOREIGN KEY(MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan)
); 
GO`
* Bảng Học kì:

`   CREATE TABlE HocKi(
	MaHocKi varchar(255) NOT NULL,
	TenHocKi NVARCHAR(255) NOT NULL,
	PRIMARY KEY(MaHocKi),
)`
* Bảng Học phí:

`  CREATE TABLE HocPhi (
	MaHocPhi INT IDENTITY(1,1),
	TongTien float(10) NOT NULL,
	HanDong timestamp NOT NULL,
	MaTaiKhoan varchar(255),
	MaHocKi varchar(255),
	PRIMARY KEY(MaHocPhi),
    FOREIGN KEY(MaTaiKhoan) REFERENCES  TaiKhoan(MaTaiKhoan),
	FOREIGN KEY(MaHocKi) REFERENCES HocKi(MaHocKi),
);
GO`
* Bảng Môn học chi tiết:

`   CREATE TABLE MonHocChiTiet (
	MaTaiKhoan varchar(255),
	MaMonHoc INT,
	MaLop INT,
	MaHocKi varchar(255),
	ThoiGianMonHoc TIMESTAMP,
	Diem float(10),
	PRIMARY KEY(MaTaiKhoan, MaHocMaMonHoc, MaLop),
	FOREIGN KEY(MaTaiKhoan) REFERENCES  TaiKhoan(MaTaiKhoan),
	FOREIGN KEY(MaLop) REFERENCES  Lop(MaLop),
	FOREIGN KEY(MaMonHoc) REFERENCES MonHoc(MaMonHoc),
	FOREIGN KEY(MaHocKi) REFERENCES HocKi(MaHocKi),
    );
GO`
* Bảng Điểm danh:

`   CREATE TABLE DiemDanh (
    MaDiemDanh INT IDENTITY(1, 1),
    MaHocKi varchar(255),
    MaLop INT,
    MaMonHoc INT,
    ThoiGian TIMESTAMP,
    MaTaiKhoan VARCHAR(255),
    TrangThai BIT,
	PRIMARY KEY(MaDiemDanh),
    FOREIGN KEY(MaHocKi) REFERENCES HocKi(MaHocKi),
    FOREIGN KEY(MaLop) REFERENCES Lop(MaLop),
    FOREIGN KEY(MaMonHoc) REFERENCES MonHoc(MaMonHoc),
    FOREIGN KEY(MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan)
);
GO`




