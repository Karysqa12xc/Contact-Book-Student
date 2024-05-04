const sideRouter = require("./side");
const authRouter = require("./auth");
const adminRouter = require("./admin");
function route(app){
    app.use("/login", authRouter);
    app.use("/admin", adminRouter);
    app.use("/", sideRouter);
}
module.exports = route;