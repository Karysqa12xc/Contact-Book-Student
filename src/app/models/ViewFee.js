const db = require("../../config/database");
const {queryHocphi} = require("../../utils/QueryFee")
const tableName = "HocPhi"
const {queryGetAll} = require("../../utils/QueryCommon")
class ViewFeeModel {
    async getAll() {
        try {
            const result = await db.connectAndQuerying(queryGetAll(tableName));
            return result;
        } catch (error) {
            console.log("Failed to get all roles:", error);
            throw error;
        }
    }
}
module.exports = new ViewFeeModel();