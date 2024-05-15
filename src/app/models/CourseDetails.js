const db = require("../../config/database/index");
const {queryGetAll} = require("../../utils/QueryCommon");
const {queryAddNewDataToCourseDetails, queryGetAllValueJoinOtherTable} = require("../../utils/QueryCourseDetails");
const Role = require("./Role");
const Course = require("./Course");
const tableName = "MonHocChiTiet";
class CourseDetailsModel {
  async getAll() {
    try {
      const results = await db.connectAndQuerying(queryGetAll(tableName));
      return results;
    } catch (error) {
      console.log("Failed to get all course details:", error);
      throw error;
    }
  }
  async addNewDataToCourseDetails(idSemester, idClass, idCourse, dayValue){
    try {
      const result = await db.connectAndQuerying(queryAddNewDataToCourseDetails(tableName, idSemester, idClass, idCourse, dayValue));
      return result;
    } catch (error) {
      console.log("Failed to add new data of course details:", error);
      throw error;
    }
  }
  async getAllValueJoinOtherTable(){
    try {
      const results = await db.connectAndQuerying(queryGetAllValueJoinOtherTable());
      return results;
    } catch (error) {
      console.log("Failed to get all data join other course details:", error);
      throw error;
    }
  }
}

module.exports = new CourseDetailsModel();
