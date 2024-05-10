class TeacherController {
    async enterScore(req, res) {
        try {
            res.render("../../resources/teacher/enterscore.hbs")
        } catch (error) {
            res.status(500).json({message: `Internal server error + ${error}`}); 
        }

    }
    async editInfo(req, res) {
        try {
            res.render("../../resources/student/suathongtin.hbs")
        } catch (error) {
            res.status(500).json({message: `Internal server error + ${error}`}); 
        }
        
    }
}
module.exports = new TeacherController();