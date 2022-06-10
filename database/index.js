require('dotenv').config();
const { Client } = require('pg');
const client = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE
});

// client.connect()
//   .then(() => {
//     console.log('Connected successfully');
//   })
//   .catch((err) => {
//     console.error(err)
//   });


// query for all products (based on page and count)
const queryAll = (row_count = 5, page = 0) => {
  if (page > 0 ) {
    page = page - 1;
  };
  client.connect()
  client.query(`select * from all_products limit ${row_count} offset ${page * row_count}`)
    .then((results) => { console.log(results.rows) })
    .catch((err) => { console.error(err) })
    .finally(() => client.end());

};

// queryAll();

// query for specific product and details

const queryOne = (product_id) => {
  client.connect()
  client.query(`select * from all_products where id = ${product_id}`)
    .then((result) => {console.log(result.rows)})
    .catch((err) => {console.error(err)})
    .finally(() => client.end());
};

queryOne(1);