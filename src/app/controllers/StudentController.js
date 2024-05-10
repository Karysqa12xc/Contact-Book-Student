const ViewFee = require("../models/ViewFee")
class StudentController {

    async viewFee(req, res) {
        try {
            const result = await ViewFee.getAll();
            res.render("../../resources/student/money.hbs", {FeeInfor:result});
        } catch (error) {
            res.status(500).json({message: `Internal server error + ${error}`});
        }
    }
    async fixInfor(req, res) {
        try {
            res.render("../../resources/student/suathongtin.hbs")
        } catch (error) {
            res.status(500).json({message: `Internal server error + ${error}`}); 
        }
        
    }
}
module.exports = new StudentController();