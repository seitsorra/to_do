const Pool = require("pg").Pool;

const pool = new Pool({
    user: "ssorra",
    password: "shkolla12",
    host: "tododb.cr6lmmvis3nv.us-east-1.rds.amazonaws.com",
    port: 5432,
    database: "tododb"
});

module.exports = pool;