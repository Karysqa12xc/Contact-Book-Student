const db = require("../../config/database/index");
const {queryGetAll} = require("../../utils/QueryCommon");
const Role = require("./Role");
const Course = require("./Course");
const tableName = "MonHocChiTiet";
class CourseDetailsModel {
  async getAll() {
    try {
      const results = await db.connectAndQuerying(queryGetAll(tableName));
      return results;
    } catch (error) {
      console.log("Failed to get all course:", error);
      throw error;
    }
  }
}

module.exports = new CourseDetailsModel();
