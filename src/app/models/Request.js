const db = require("../../config/database/index");
const {queryGetAll, queryGetById} = require("../../utils/QueryCommon");
const {
  queryAddNewDataRequest,
  queryGetRequestByIdNguoiGuiOrNhan,
  queryGetOuterDataTableYeuCau,
  queryGetRequestIsRead,
  queryUpdateWasRead
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
  async GetRequestByIdNguoiGuiOrNhan(id, value) {
    try {
      const result = await db.connectAndQuerying(
        queryGetRequestByIdNguoiGuiOrNhan(tableName, id, value)
      );
      return result;
    } catch (error) {
      console.log("Failed to get request by id nguoi gui or nhan:", error);
      throw error;
    }
  }
  async addNewData(TieuDe, NoiDung, NguoiGui, NguoiNhan, DaDoc) {
    try {
      const result = await db.connectAndQuerying(
        queryAddNewDataRequest(
          tableName,
          TieuDe,
          NoiDung,
          NguoiGui,
          NguoiNhan,
          DaDoc
        )
      );
      return result;
    } catch (error) {
      console.log("Failed to add new request:", error);
      throw error;
    }
  }
  async GetOuterDataTableYeuCau(id) {
    try {
      const result = await db.connectAndQuerying(
        queryGetOuterDataTableYeuCau(tableName, id)
      );
      return result;
    } catch (error) {
      console.log("Failed to get request outer table:", error);
      throw error;
    }
  }
  async getRequestIsRead(value) {
    try {
      const result = await db.connectAndQuerying(
        queryGetRequestIsRead(tableName, value)
      );
      return result;
    } catch (error) {
      console.log("Failed to get request outer table:", error);
      throw error;
    }
  }
  async requestWasRead(id, value) {
    try {
      const result = await db.connectAndQuerying(
        queryUpdateWasRead(tableName, id ,value)
      );
      return result;
    } catch (error) {
      console.log("Failed to get request outer table:", error);
      throw error;
    }
  }
}
module.exports = new RequestModel();
