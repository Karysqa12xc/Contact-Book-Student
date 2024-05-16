const  { connectAndQuerying }  = require("../../config/database");
// const { queryFixInfor } = require("../../utils/QueryFixInfor");
// const { queryGetAll } = require("../../utils/QueryCommon");
const tableName = "TaiKhoan";
class StudentModel {
     async getStudentById(MaTaiKhoan) {
        const query = `SELECT * FROM TaiKhoan WHERE MaTaiKhoan = ${MaTaiKhoan}`;
        try {
          const result = await db.connectAndQuerying(queryGetAll(query));
          return result; // Assuming result is an array and we need the first item
        } catch (error) {
          console.error('Error retrieving student information:', error);
          throw error;
        }
    }
     async updateInfo(MaTaiKhoan, updatedInfo) {
        const query = `
          UPDATE TaiKhoan
          SET
            HoVaTen = '${updatedInfo.HoVaTen}',
            SoDienThoai = '${updatedInfo.SoDienThoai}',
            DiaChi = '${updatedInfo.DiaChi}',
            GioiTinh = '${updatedInfo.GioiTinh}',
            MaLop = '${updatedInfo.MaLop}'
          WHERE MaTaiKhoan = ${MaTaiKhoan}
        `;
        try {
          await connectAndQuerying(query);
        } catch (error) {
          console.error('Error updating student information:', error);
          throw error;
        }
    }
}
module.exports = StudentModel;

