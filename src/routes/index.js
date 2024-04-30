const sideRouter = require("./side");
const authRouter = require("./auth");
function route(app){
    app.use("/login", authRouter);
    app.use("/", sideRouter);
}
module.exports = route;