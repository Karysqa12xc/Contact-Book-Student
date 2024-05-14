const ViewFee = require("../models/ViewFee");
const fixInforModel = require("../models/fixInfor");
class StudentController {
  async viewFee(req, res) {
    try {
      const result = await ViewFee.getAll();
      if (!result || !Array.isArray(result)) {
        throw new Error("Invalid data received from database");
      }
      res.render("../../resources/user/student/money.hbs", { FeeInfor: result }, (err, html) => {
        if (err) {
          console.error("Error rendering template:", err);
          res.status(500).json({ message: "Error rendering template" });
          return;
        }
        res.send(html);
      });
    } catch (error) {
      console.error("Error in viewFee:", error);
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  }
  async viewFeeByMaTaiKhoan(req, res) {
    try {
      const MaTaiKhoan = req.params.MaTaiKhoan;
      const result = await ViewFee.getByMaTaiKhoan(MaTaiKhoan);
      if (!result || !Array.isArray(result)) {
        throw new Error("Invalid data received from database");
      }
      res.render("../../resources/user/student/money.hbs", { FeeInfor: result }, (err, html) => {
        if (err) {
          console.error("Error rendering template:", err);
          res.status(500).json({ message: "Error rendering template" });
          return;
        }
        res.send(html);
      });
    } catch (error) {
      console.error("Error in viewFeeByMaTaiKhoan:", error);
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  }
    
  async renderEditForm(req, res) {
  const MaTaiKhoan = req.params.id;
  try {
    const studentData = await fixInforModel.getStudentById(MaTaiKhoan);
    res.render('../../resources/user/student/suathongtin.hbs', { student: studentData });
  } catch (error) {
    res.status(500).send('Error retrieving student information');
  }
}


async  updateStudentInfo(req, res) {
  const MaTaiKhoan = req.params.id;
  const updatedInfo = req.body;
  try {
    await Student.updateInfo(MaTaiKhoan, updatedInfo);
    res.redirect('/students'); // Chuyển hướng sau khi cập nhật thành công
  } catch (error) {
    res.status(500).send('Failed to update student information');
  }
}
}

module.exports = new StudentController();