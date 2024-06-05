const db = require("../../config/database");
const {
  queryGetAll,
  queryGetById,
} = require("../../utils/QueryCommon");
const {queryAddScore, queryGetDataForViewScore} = require("../../utils/QueryScoreCourse");
const tableName = "DiemMonHoc";
class ScoreCourseModel {
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
  async addScore(IdClass, IdCourse, IdSemester, IdAccount, Score) {
    try {
      const result = await db.connectAndQuerying(
        queryAddScore(IdClass, IdCourse, IdSemester, IdAccount, Score)
      );
      return result;
    } catch (error) {
      console.log("Failed to update data in course details:", error);
      throw error;
    }
  }
  async GetDataForViewScore(MaLop, MaTaiKhoan) {
    try {
      const results = await db.connectAndQuerying(queryGetDataForViewScore(MaLop, MaTaiKhoan));
      return results;
    } catch (error) {
      console.log(
        "Failed to get data with id account join other course details:",
        error
      );
      throw error;
    }
  }
}
module.exports = new ScoreCourseModel();
