const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const path = require("path");
const route = require("./routes");

const app = express();
const port = 5000;
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
app.use(methodOverride('_method'));
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      eq(a, b){
        return a === b;
      },
      sum(a, b){
        return a + b;
      },
      format_date(str){
        const date = new Date(str);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      }
    }
  })
);

app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "resources", "views"));
route(app);

app.listen(port, () => {
  console.log(`localhost:${port}`);
});
