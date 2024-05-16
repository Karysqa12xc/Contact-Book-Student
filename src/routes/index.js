const sideRouter = require("./side");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const studentRouter = require("./student");
const teacherRouter = require("./teacher");
const userRouter = require("./user");
// const bodyParser = require('body-parser');
function route(app){
    // app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(bodyParser.json());
    app.use("/login", authRouter);
    app.use("/admin", adminRouter);
    app.use("/student",studentRouter)
    app.use("/teacher", teacherRouter)
    app.use("/user", userRouter)
    app.use("/", sideRouter);

}
module.exports = route;