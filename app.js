const express = require('express');
require('./db/connect');
require('dotenv').config();
const cities = require('./data/cities');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('form', { cities: cities });
});

let data = {};

app.post('/', (req, res) => {
  data = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    contact: req.body.contact,
    address: req.body.address,
    city: req.body.city,
    gender: req.body.gender,
  };
  res.redirect('/list');
});

app.get('/list', (req, res) => {
  res.render('list', {
    name: `${data.fname} ${data.lname}`,
    email: data.email,
    contact: data.contact,
    address: data.address,
    city: data.city,
    gender: data.gender,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}/`);
});
