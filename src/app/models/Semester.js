const db = require("../../config/database/index");
const {queryGetAll, queryGetById} = require("../../utils/QueryCommon");
const {queryAddNewDataSemester} = require("../../utils/QuerySemester");
const tableName = "HocKi";
class SemesterModel {
  async getAll() {
    try {
      const results = await db.connectAndQuerying(queryGetAll(tableName));
      return results;
    } catch (error) {
      console.log("Failed to get all semester:", error);
      throw error;
    }
  }
  async getById(id) {
    try {
      const result = await db.connectAndQuerying(queryGetById(tableName, id));
      return result;
    } catch (error) {
      console.log("Failed to get semester by id:", error);
      throw error;
    }
  }
  async addNewDataInHocKi(
    idSemester,
    nameSemester,
    StartTimeSemester,
    EndTimeSemester
  ) {
    try {
      const result = await db.connectAndQuerying(queryAddNewDataSemester(tableName, idSemester, nameSemester, StartTimeSemester, EndTimeSemester));
      return result;
    } catch (error) {
      console.log("Failed to add new semester:", error);
      throw error;
    }
  }
}
module.exports = new SemesterModel();
