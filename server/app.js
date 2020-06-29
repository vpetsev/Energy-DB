const fs = require("fs");
const fastcsv = require("fast-csv");
const models = require("./models")
const Pool = require("pg").Pool;


let stream = fs.createReadStream("texas-well-locations.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function (data) {
    csvData.push(data);
  })
  .on("end", function () {
    // remove the first line: header
    csvData.shift();

    const pool = new Pool({
      host: "localhost",
      user: "postgres",
      database: "energyDB",
      password: null,
      port: 5432,
    });
    const query =
      "INSERT INTO category (WKT, SYMNUM, GIS_SYMBOL_DESCRIPTION, RELIAB, GIS_LOCATION_SOURCE, API, GIS_WELL_NUMBER, GIS_API5, GIS_LONG83, GIS_LAT83, GIS_LAT27, UNIQID, GIS_LONG27, SHAPE_X, SHAPE_Y) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)";

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach((row) => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });

stream.pipe(csvStream);


