const axios = require('axios');
require('dotenv').config();
const {
  queryWithFeatures,
  queryStyles,
  queryRelated,
  asyncFindFeatures
} = require('../database/index.js');

// write one function per query that will need to happen

// get one product
let getOneProduct = (product_id) => {
  return queryWithFeatures(product_id);
};

// get styles
let getStyles = (product_id) => {
  return queryStyles(product_id);
};

// get related
let getRelated = (product_id) => {
  return queryRelated(product_id);
};

module.exports = {
  getOneProduct: getOneProduct,
  getStyles: getStyles,
  getRelated: getRelated
};