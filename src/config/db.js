const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '172.16.16.161',
  database: 'postgres',
  password: 'root',
  port: 5432,
  timezone: 'utc'
})

module.exports = pool;