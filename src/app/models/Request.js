const db = require("../../config/database/index");
const {queryGetAll, queryGetById} = require("../../utils/QueryCommon");
const {
  queryAddNewDataRequest,
  queryGetRequestByIdNguoiGuiOrNhan,
  queryGetOuterDataTableYeuCau,
} = require("../../utils/QueryRequest");
const tableName = "Yeu_Cau";
class RequestModel {
  async getAll() {
    try {
      const results = await db.connectAndQuerying(queryGetAll(tableName));
      return results;
    } catch (error) {
      console.log("Failed to get all request:", error);
      throw error;
    }
  }
  async getById(id) {
    try {
      const result = await db.connectAndQuerying(queryGetById(tableName, id));
      return result;
    } catch (error) {
      console.log("Failed to get request by id:", error);
      throw error;
    }
  }
  async GetRequestByIdNguoiGuiOrNhan(id){
    try {
      const result = await db.connectAndQuerying(queryGetRequestByIdNguoiGuiOrNhan(tableName, id))
      return result;
    } catch (error) {
      console.log("Failed to get request by id nguoi gui or nhan:", error);
      throw error;
    }
  }
  async addNewData(TieuDe, NoiDung, NguoiGui, NguoiNhan) {
    try {
      const result = await db.connectAndQuerying(
        queryAddNewDataRequest(tableName, TieuDe, NoiDung, NguoiGui, NguoiNhan)
      );
      return result;
    } catch (error) {
      console.log("Failed to add new request:", error);
      throw error;
    }
  }
  async GetOuterDataTableYeuCau(id){
    try {
      const result = await db.connectAndQuerying(queryGetOuterDataTableYeuCau(tableName, id));
      return result;
    } catch (error) {
      console.log("Failed to get request outer table:", error);
      throw error;
    }
  }
}
module.exports = new RequestModel();
