const db = require("../../config/database");
const {queryGetAll, queryGetById} = require("../../utils/QueryCommon");
const {queryGetDifAdmin} = require("../../utils/QueryRole");
const tableName = "VaiTro";
class RolesModel {
  async getAll() {
    try {
      const results = await db.connectAndQuerying(queryGetAll(tableName));
      return results;
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
  async getDataDifAdmin(){
    try {
      const result = await db.connectAndQuerying(queryGetDifAdmin(tableName));
      return result;
    } catch (error) {
      console.log("Failed to get role dif id admin:", error);
      throw error;
    }
  }
}

module.exports = new RolesModel();
