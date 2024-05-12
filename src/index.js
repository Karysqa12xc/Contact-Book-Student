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
      eq(a, b) {
        return a === b;
      },
      sum(a, b) {
        return a + b;
      },
      format_date(date) {
        // const date = new Date(str);
        // const day = date.getDate();
        // const month = date.getMonth() + 1;
        // const year = date.getFullYear();
        // const formattedDate = `${day}/${month}/${year}`;
        // return formattedDate;
        var day = date.getDate().toString().padStart(2, "0");
        var month = (date.getMonth() + 1).toString().padStart(2, "0");
        var year = date.getFullYear();
        return day + "-" + month + "-" + year;
      },
      formatPhone(str) {
        const id = "+084";
        const result = id + str;
        return result;
      },
      formatNameCourse(str) {
        var dashIndex = str.indexOf("-");
        if (dashIndex !== -1) {
          var subjectName = str.substring(0, dashIndex).trim();
          return subjectName;
        }
      },
      renderWeeks(startDate, endDate) {
        var weeks = [];
        var currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          var weekStartDate = new Date(currentDate);
          var weekEndDate = new Date(currentDate);
          weekEndDate.setDate(weekEndDate.getDate() + 5);
          weeks.push({
            start: weekStartDate,
            end: weekEndDate,
          });
          currentDate.setDate(currentDate.getDate() + 7);
        }
        return weeks;
      },
    },
  })
);

app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "resources", "views"));
route(app);

app.listen(port, () => {
  console.log(`localhost:${port}`);
});
