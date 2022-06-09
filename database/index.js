require('dotenv').config();
const { Client } = require('pg');
const client = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE
});

client.connect()
  .then(() => {
    console.log('Connected successfully');
  })
  .catch((err) => {
    console.error(err)
  });

client.query('select * from all_products where id < 10')
.then((results) => {console.log(results.rows)})
.catch((err) => {console.error(err)});