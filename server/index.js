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

app.get('/products/:product_id', (req, res) => {
  getOneProduct(req.params.product_id)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      res.sendStatus(501);
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  getStyles(req.params.product_id)
    .then((styles) => {
      console.log('server index');
      console.log(styles);
      res.send(styles);
    })
    .catch((err) => {
      res.sendStatus(501);
    });
});

app.get('/products/:product_id/related', (req, res) => {
  getRelated(req.params.product_id)
    .then((related) => {
      res.send(related);
    })
    .catch((err) => {
      res.sendStatus(501);
    });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});