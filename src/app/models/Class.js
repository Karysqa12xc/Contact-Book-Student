const db = require("../../config/database");
const {queryAddNewDataTableLop} = require("../../utils/QueryClass");
const {
  queryGetAll,
  queryGetAllReverse,
  queryGetById,
  queryGetOnlyIdAndName,
} = require("../../utils/QueryCommon");
const tableName = "Lop";
class ClassModel {
  async getAll() {
    try {
      const results = await db.connectAndQuerying(queryGetAll(tableName));
      return results;
    } catch (error) {
      console.log("Failed to get all account:", error);
      throw error;
    }
  }
  async getAllReverse() {
    try {
      const results = await db.connectAndQuerying(
        queryGetAllReverse(tableName)
      );
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
  async getOnlyIdAndName() {
    try {
      const result = await db.connectAndQuerying(queryGetOnlyIdAndName(tableName));
      return result;
    } catch (error) {
      console.log("Failed to get account by id:", error);
      throw error;
    }
  }
  async addNewData(TenLop, SiSo) {
    try {
      const result = await db.connectAndQuerying(
        queryAddNewDataTableLop(tableName, TenLop, SiSo)
      );
      return result;
    } catch (error) {
      console.log("Failed to add data class:", error);
      throw error;
    }
  }
}
module.exports = new ClassModel();
