const db = require("../../config/database/index");
const {queryGetAll} = require("../../utils/QueryCommon");
const {
  queryAddNewDataToCourseDetails,
  queryGetAllValueJoinOtherTable,
  queryGetValueJoinOtherTableWithIdClassOfTeacher,
  queryGetValueJoinOtherTableWithIdAccount,
  queryGetDataToAddHocPhi,
  queryGetDataToAddScore,
  queryUpdateIsExport,
  queryGetValueJoinOtherTableWithIdClassOfStudent,
  queryGetDataForViewScore,
  queryUpdateScore,
  queryGetDataToAddAttendance,
  queryGetOnlyThoiGianInCourseDetails
} = require("../../utils/QueryCourseDetails");

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
  async addNewDataToCourseDetails(idSemester, idClass, idCourse, dayValue) {
    try {
      const result = await db.connectAndQuerying(
        queryAddNewDataToCourseDetails(
          tableName,
          idSemester,
          idClass,
          idCourse,
          dayValue
        )
      );
      return result;
    } catch (error) {
      console.log("Failed to add new data of course details:", error);
      throw error;
    }
  }
  async getAllValueJoinOtherTable() {
    try {
      const results = await db.connectAndQuerying(
        queryGetAllValueJoinOtherTable()
      );
      return results;
    } catch (error) {
      console.log("Failed to get all data join other course details:", error);
      throw error;
    }
  }
  async GetValueJoinOtherTableWithIdClassOfTeacher(value) {
    try {
      const results = await db.connectAndQuerying(
        queryGetValueJoinOtherTableWithIdClassOfTeacher(value)
      );
      return results;
    } catch (error) {
      console.log(
        "Failed to get data with id class join other course details:",
        error
      );
      throw error;
    }
  }
  async GetDataForViewScore(MaLop) {
    try {
      const results = await db.connectAndQuerying(queryGetDataForViewScore(MaLop));
      return results;
    } catch (error) {
      console.log(
        "Failed to get data with id account join other course details:",
        error
      );
      throw error;
    }
  }
  async GetValueJoinOtherTableWithIdClassOfStudent(value) {
    try {
      const results = await db.connectAndQuerying(
        queryGetValueJoinOtherTableWithIdClassOfStudent(value)
      );
      return results;
    } catch (error) {
      console.log(
        "Failed to get data with id class join other course details:",
        error
      );
      throw error;
    }
  }
  async GetValueJoinOtherTableWithIdAccount(value) {
    try {
      const results = await db.connectAndQuerying(
        queryGetValueJoinOtherTableWithIdAccount(value)
      );
      return results;
    } catch (error) {
      console.log(
        "Failed to get data with id account join other course details:",
        error
      );
      throw error;
    }
  }
  async GetOnlyThoiGianInCourseDetails(value){
    try {
      const result = await db.connectAndQuerying(queryGetOnlyThoiGianInCourseDetails(value));
      return result;
    } catch (error) {
      console.log("Failed to get data:", error);
      throw error;
    }
  }
  async GetDataToAddHocPhi(value) {
    try {
      const result = await db.connectAndQuerying(
        queryGetDataToAddHocPhi(value)
      );
      return result;
    } catch (error) {
      console.log("Failed to get data fee to add:", error);
      throw error;
    }
  }
  async GetDataToAddAttendance(IdClass, IdSemester){
    try {
      const result = await db.connectAndQuerying(queryGetDataToAddAttendance(IdClass, IdSemester));
      return result;
    } catch (error) {
      console.log("Failed to get data fee to add:", error);
      throw error;
    }
  }
  async GetDataToAddScore(value) {
    try {
      const result = await db.connectAndQuerying(queryGetDataToAddScore(value));
      return result;
    } catch (error) {
      console.log("Failed to get data to add score:", error);
      throw error;
    }
  }
  async UpdateIsExport(isExport, idClass, idCourse, idSemester) {
    try {
      const results = await db.connectAndQuerying(
        queryUpdateIsExport(isExport, idClass, idCourse, idSemester)
      );
      return results;
    } catch (error) {
      console.log("Failed to update data in course details:", error);
      throw error;
    }
  }
  async UpdateScore(IdClass, IdCourse, IdSemester, Score) {
    try {
      const result = await db.connectAndQuerying(
        queryUpdateScore(IdClass, IdCourse, IdSemester, Score)
      );
      return result;
    } catch (error) {
      console.log("Failed to update data in course details:", error);
      throw error;
    }
  }
}

module.exports = new CourseDetailsModel();
