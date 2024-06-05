const db = require("../../config/database/index");
const {queryGetAll} = require("../../utils/QueryCommon");
const {
  queryAddNewDataToCourseDetails,
  queryGetAllValueJoinOtherTable,
  queryGetValueJoinOtherTableWithIdClassOfTeacher,
  queryGetValueJoinOtherTableWithIdAccount,
  queryGetDataToAddHocPhi,
  queryGetDataToAddScore,
  queryGetValueJoinOtherTableWithIdClassOfStudent,
  queryGetDataToAddAttendance,
  queryGetDataClassOfTeacher,
  queryGetOnlyThoiGianVaMonHocInCourseDetails,
  queryDeleteScore,
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
  async GetDataClassOfTeacher(value){
    try {
      const results = await db.connectAndQuerying(
        queryGetDataClassOfTeacher(value)
      );
      return results;
    } catch (error) {
      console.log("Failed to get data join other course details:", error);
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
  async GetValueJoinOtherTableWithIdClassOfStudent(MaLop, MaMonHoc) {
    try {
      const results = await db.connectAndQuerying(
        queryGetValueJoinOtherTableWithIdClassOfStudent(MaLop, MaMonHoc)
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
  async GetOnlyThoiGianVaMonHocInCourseDetails(value){
    try {
      const result = await db.connectAndQuerying(queryGetOnlyThoiGianVaMonHocInCourseDetails(value));
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
  async GetDataToAddAttendance(IdClass, IdSemester, ThoiGian, MonHoc){
    try {
      const result = await db.connectAndQuerying(queryGetDataToAddAttendance(IdClass, IdSemester, ThoiGian, MonHoc));
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
  
  async DeleteCourseDetails(id){
    try {
      const result = await db.connectAndQuerying(
        queryDeleteScore(id)
      );
      return result;
    } catch (error) {
      console.log("Failed to delete data in course details:", error);
      throw error;
    }
  }
}

module.exports = new CourseDetailsModel();
