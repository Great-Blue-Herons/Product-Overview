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

app.get('/products/(id)', (req, res) => {
  getOneProduct(req.query.id)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      res.sendStatus(501);
    });
});

app.get('/products/(id)/styles', (req, res) => {
  getStyles(req.query.id)
    .then((styles) => {
      res.send(styles);
    })
    .catch((err) => {
      res.sendStatus(501);
    });
});

app.get('/products/(id)/related', (req, res) => {
  getRelated(req.query.id)
    .then((related) => {
      res.send(related);
    })
    .catch((err) => {
      res.sendStatus(501);
    });
});

app.list(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${SERVER_PORT}`);
});