const db = require("../../config/database");
const {
  queryDocHocPHi,
  queryAddNewDataFee,
} = require("../../utils/QueryFee");
const {queryGetAll, queryGetById} = require("../../utils/QueryCommon");
const tableName = "HocPhi";

class ViewFeeModel {
  async getAll() {
    try {
      const result = await db.connectAndQuerying(queryGetAll(tableName));
      return result;
    } catch (error) {
      console.log("Failed to get all roles:", error);
      throw error;
    }
  }
  async getById(id) {
    try {
      const result = await db.connectAndQuerying(queryGetById(tableName, id));
      return result;
    } catch (error) {
      console.log("Failed to get role by id:", error);
      throw error;
    }
  }

  async getByMaTaiKhoan(MaTaiKhoan) {
    try {
      const result = await db.connectAndQuerying(
        queryDocHocPHi(tableName, MaTaiKhoan)
      );
      return result;
    } catch (error) {
      console.log("Failed to get fee info by MaTaiKhoan:", error);
      throw error;
    }
  }
  async AddNewDataFee(MaTaiKhoan, MaHocKi, HanDong, IsExport){
    try {
      const result = await db.connectAndQuerying(queryAddNewDataFee(MaTaiKhoan, MaHocKi, HanDong, IsExport));
      return result;
    } catch (error) {
      console.log("Failed to add data to fee:", error);
      throw error;
    }
  }
}

module.exports = new ViewFeeModel();
