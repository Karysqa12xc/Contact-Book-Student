const db = require("../../config/database/index");
const {
  queryGetAll,
  queryGetById,  
} = require("../../utils/QueryCommon");
const {queryGetByOuterTableMonHoc, 
    queryAddNewDataMonHoc,
    queryUpdateMaTaiKhoanOfCourse,
    queryDeleteCourse,
} = require("../../utils/QueyCourse");
const tableName = "MonHoc";
const tableJoinAccount = "TaiKhoan";
class CourseModel {
  async getAll() {
    try {
      const results = await db.connectAndQuerying(queryGetAll(tableName));
      return results;
    } catch (error) {
      console.log("Failed to get all course:", error);
      throw error;
    }
  }
  async getById(id) {
    try {
      const result = await db.connectAndQuerying(queryGetById(tableName, id));
      return result;
    } catch (error) {
      console.log("Failed to get course by id:", error);
      throw error;
    }
  }
  async getDataOuterTable() {
    try {
      const result = await db.connectAndQuerying(
        queryGetByOuterTableMonHoc(tableName, tableJoinAccount)
      );
      return result;
    } catch (error) {
      console.log("Failed to get course by id:", error);
      throw error;
    }
  }
  async addNewData(courseName, startTime, endTime, moneyCourse) {
    try {
      const result = await db.connectAndQuerying(
        queryAddNewDataMonHoc
        (tableName, courseName, 
          startTime, endTime, moneyCourse)
      );
      return result;
    } catch (error) {
      console.log("Failed to add new data course:", error);
      throw error;
    }
  }
  async updateMaTaiKhoanOfCourse(idAccount, idCourse){
    try {
      const result = await db.connectAndQuerying(queryUpdateMaTaiKhoanOfCourse
        (tableName, tableJoinAccount, idAccount, idCourse));
      return result;
    } catch (error) {
      console.log("Failed to update data course:", error);
      throw error;
    }
  }
  async deleteCourse(id){
    try {
      const result = await db.connectAndQuerying(queryDeleteCourse(tableName, id));
      return result;
    } catch (error) {
      console.log("Failed to delete data course:", error);
      throw error;
    }
  }
}
module.exports = new CourseModel();
