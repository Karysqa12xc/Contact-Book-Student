const db = require("../../config/database");
const {queryGetAll} = require("../../utils/QueryCommon");
const {queryAddNewDataAttendance} = require("../../utils/QueryAttendance");
class AttendanceModel {
  async getAll() {
    try {
      const results = await db.connectAndQuerying(queryGetAll(tableName));
      return results;
    } catch (error) {
      console.log("Failed to get all account:", error);
      throw error;
    }
  }
  async saveAttendance(
    IdSemester,
    IdClass,
    IdCourse,
    IdAccount,
    ThoiGian,
    attendance
  ) {
    try {
      const result = await db.connectAndQuerying(
        queryAddNewDataAttendance(
          IdSemester,
          IdClass,
          IdCourse,
          IdAccount,
          ThoiGian,
          attendance
        )
      );
      return result;
    } catch (error) {}
  }
}

module.exports = new AttendanceModel();
