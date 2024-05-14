const db = require("../../config/database/index");
const {queryGetAll, queryGetById} = require("../../utils/QueryCommon");
const {queryAddNewData} = require("../../utils/QueryRequest");
const tableName = "Yeu_Cau";
class RequestModel {
  async getAll() {
    try {
      const results = await db.connectAndQuerying(queryGetAll(tableName));
      return results;
    } catch (error) {
      console.log("Failed to get all account:", error);
      throw error;
    }
  }
  async getById(id) {
    try {
      const result = await db.connectAndQuerying(queryGetById(tableName, id));
      return result;
    } catch (error) {
      console.log("Failed to get account by id:", error);
      throw error;
    }
  }
}
module.exports = new RequestModel();
