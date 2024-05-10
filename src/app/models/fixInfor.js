const db = require("../../config/database");
const {queryFixInfor} = require("../../utils/QueryFixInfor");
const tableName = "TaiKhoan";
class fixInforModel {
    async getAll() {
        try {
            const results = await db.connectAndQuerying(queryGetAll(tableName));
            return results;
        } catch (error) {
            console.log("Failed to get all account:", error);
            throw error;
        }
    }
}
module.exports = new fixInforModel();