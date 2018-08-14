const pg = require("pg");
const url = require("url");

// Initialise postgres client
const dbUrl = process.env.DATABASE_URL;

let config;

if (process.env.DATABASE_URL) {
  const params = url.parse(dbUrl);
  const auth = params.auth.split(":");

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split("/")[1],
    ssl: true
  };
} else {
  config = {
    user: "elvera",
    host: "127.0.0.1",
    database: "snacky",
    port: 5432
  };
}

const pool = new pg.Pool(config);

pool.on("error", function(err) {
  console.log("idle client error", err.message, err.stack);
});

module.exports = pool;
