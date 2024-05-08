const sql = require("msnodesqlv8");
const connectionString =
  "Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-9QRKE9M\DUCTHANG;Database=SoLienLac-Test;Trusted_Connection=yes;";

async function connectAndQuerying(query) {
  return new Promise((resolve, reject) => {
    sql.open(connectionString, (err, conn) => {
      if (err) {
        console.log("Connect Failed!!!");
        reject(err);
        return;
      } else {
        console.log("Connect Success!!!");
      }
      const queryString = query;
      conn.query(queryString, (err, results) => {
        if (err) {
          console.log("Failed Executing query", err);
          reject(err);
          return;
        } else {
          resolve(results);
        }
        conn.close();
      });
    });
  });
}

module.exports = { connectAndQuerying };
