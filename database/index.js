require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE
});

// pool.connect()
//   .then(() => {
//     console.log('Connected successfully');
//   })
//   .catch((err) => {
//     console.error(err)
//   });


// query for all products (based on page and count)

const queryAll = (row_count = 5, page = 0) => {
  if (page > 0) {
    page = page - 1;
  };
  pool
    .query(`select * from all_products limit ${row_count} offset ${page * row_count};`)
    .then((results) => {

      console.log(results.rows);
    })
    .catch((err) => {
      console.error(err)

    })
};

queryAll();

// query for specific product and details

const queryOne = (product_id) => {
  pool
    .query(`select * from all_products where id = ${product_id};`)
    .then((result) => {
      console.log(result.rows);
    })
    .catch((err) => {
      console.error(err);
    });
};

queryOne(1);

// write query to just return all details and features for one product

const queryFeatures = (product_id) => {
  pool
    .query(`select *
        from all_products
        inner join features
        on all_products.id = features.product_id
        where all_products.id = ${product_id};`)
    .then((results) => {
      console.log(results.rows);
    })
    .catch((err) => {
      console.error(err);
    });
};

queryFeatures(1);

// const queryStyles = (product_id) => {
//   pool.connect()
//     .then((client) => {
//       return client
//         .query(``)
//         .then((results) => {
//           client.release();
//           console.log(results.rows);
//         })
//         .catch((err) => {
//           console.error(err);
//           client.release();
//         });
//     });
// };

// queryStyles(1);

const queryRelated = (product_id) => {
  pool
    .query(`select json_agg(related_product_id)
        from related where current_product_id
        = ${product_id};`)
    .then((results) => {
      console.log(results.rows);
    })
    .catch((err) => {
      console.error(err);
    });
};

queryRelated(1);