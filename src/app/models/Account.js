const db = require("../../config/database");
const {queryGetAll, queryGetById, queryGetByOuterTableTaiKhoan} = require("../../utils/QueryCommon")
const tableName = "TaiKhoan";
const tableJoin = "VaiTro";
class AccountModel{
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
      async getAttributeOutTable(){
        try {
          const result = await db.connectAndQuerying(queryGetByOuterTableTaiKhoan(tableName, tableJoin));
          return result;
        } catch (error) {
          console.log("Failed to get account by outer table:", error);
          throw error;
        }
      }
}
module.exports = new AccountModel();