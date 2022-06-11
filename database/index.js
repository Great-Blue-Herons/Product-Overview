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


// query one product with feature details

const queryWithFeatures = (product_id) => {
  return pool
    .query(`select json_build_object(
      'id', a.id,
      'name', a.name,
      'slogan', a.slogan,
      'description', a.description,
      'category', a.category,
      'default_price', a.default_price,
      'features', (
        select json_agg(json_build_object(
          'feature', f.feature,
          'value', f.value
        ))
        from features f where f.product_id = a.id
      )
    ) as result
    from all_products a
    where a.id = ${product_id};`)
    .then((results) => {
      console.log(results.rows);
    })
    .catch((err) => {
      console.error(err);
    });
};

// query all styles for one product

const queryStyles = (product_id) => {
  return pool
    .query(`select json_build_object(
          'product_id', al.id,
          'results', (
              select json_agg(json_build_object(
          'style_id', st.id,
          'name', st.name,
          'original_price', st.original_price,
          'sale_price', st.sale_price,
          'default?', st.default_style,
          'photos', (
              select json_agg(json_build_object(
                  'thumbnail_url', ph.thumbnail_url,
                  'url', ph.url
              ))
              from photos ph where ph.styleid = st.id),
          'skus', (
              select json_object_agg(
                  sk.id, (select json_build_object(
                      'quantity', sk.quantity,
                      'size', sk.size)
              from skus where "id" = sk.id)
              )
           from skus as sk where "styleid" = st.id
           )
      ))
      as result
      from styles st
      where st.productid = al.id

          )
      ) as result
      from all_products al
      where al.id = ${product_id};`)
    .then((results) => {
      return results.rows;
    })
    .catch((err) => {
      console.error(err);
    });
};

// query all products related to one specific product

const queryRelated = (product_id) => {
  return pool
    .query(`select json_agg(related_product_id)
        from related where current_product_id
        = ${product_id};`)
    .then((results) => {
      return results.rows;
    })
    .catch((err) => {
      console.error(err);
    });
};

// query product with features async

const findFeatures = (product_id) => {
  var obj = {};
  ; (async () => {
    obj = await queryOne(product_id);
    obj.features = await queryFeatures(product_id);
    await console.log(obj);
  })()
};

pool.end();

module.exports = {

}