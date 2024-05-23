const db = require("../../config/database");
const account = require("../../utils/QueryTaiKhoan")
const {queryGetAll} = require("../../utils/QueryCommon");
const attendance = require("../../utils/QueryAttendence")
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
} = require("../../utils/QueryCourseDetails");
const table = "TaiKhoan";
const tableName = "MonHocChiTiet";
async function getClasses(table, idClass) {
    try {
      const results = await db.connectAndQuerying(
        account.queryGetTaiKhoanByMaLop(idClass)
      );
      return results;
    } catch (error) {
      console.log("Failed to get all data join other course details:", error);
      throw error;
    }
  }
// Save attendance records
async function saveAttendance(classId, attendance) {
    try {
      const result = await db.connectAndQuerying(
        queryAddNewDataAttendance(classId,attendanceDate, attendance)
      );
      return result;
    } catch (error) {
      console.log("Failed to update data in course details:", error);
      throw error;
    }
  }
module.exports = {
    getClasses,
    saveAttendance
};
