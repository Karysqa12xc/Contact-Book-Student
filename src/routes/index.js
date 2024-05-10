const sideRouter = require("./side");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const studentRouter = require("./student");
const teacherRouter = require("./teacher")
function route(app){
    app.use("/login", authRouter);
    app.use("/admin", adminRouter);
    app.use("/student",studentRouter)
    app.use("/teacher", teacherRouter)
    app.use("/", sideRouter);

}
module.exports = route;