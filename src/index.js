const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const handlebars = require("express-handlebars");

const methodOverride = require("method-override");
const path = require("path");
const route = require("./routes");

const app = express();
const port = 3000;
app.use(morgan("combined"));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(methodOverride("_method"));
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      eq(a, b){
        return a === b;
      }
    }
  })
);

app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "resources", "views"));
route(app);
app.get('/suathongtin',(req, res) => {
  res.render('suathongtin');
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
