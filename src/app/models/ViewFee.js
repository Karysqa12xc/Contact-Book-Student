const db = require("../../config/database");
const { queryDocHocPhi } = require("../../utils/QueryFee");
const { queryGetAll } = require("../../utils/QueryCommon");
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

  async getByMaTaiKhoan(MaTaiKhoan) {
    try {
      const query = queryDocHocPhi();
      const finalQuery = query.replace('@MaTaiKhoan', `'${MaTaiKhoan}'`);
      const result = await db.connectAndQuerying(finalQuery);
      return result;
    } catch (error) {
      console.log("Failed to get fee info by MaTaiKhoan:", error);
      throw error;
    }
  }
}

module.exports = new ViewFeeModel();
