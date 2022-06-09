require('dotenv').config();
const { Client } = require('pg');
const client = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD, // put in .env file
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE
});