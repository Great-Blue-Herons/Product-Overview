const axios = require('axios');
require('dotenv').config();
const {
  queryWithFeatures,
  queryStyles,
  queryRelated,
  asyncFindFeatures
} = require('../database/index.js');

// write one function per query that will need to happen
