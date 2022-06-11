const express = require('express');
let app = express();
const path = require('path');
require('dotenv').config();
const {
  getOneProduct,
  getStyles,
  getRelated
} = require('./controllers.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get();

app.get();

app.get();

app.list(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${SERVER_PORT}`);
});