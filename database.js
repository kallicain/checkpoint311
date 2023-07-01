let mysql = require("mysql");

let pool = mysql.createPool({
  user: process.env.username,
  password: process.env.password,
  host: process.env.host,
  port: process.env.port
});

module.exports = pool;