const express = require('express');
// require('./db/connect');
// require('dotenv').config();
const cities = require('./data/cities');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('form', { cities: cities });
});

let temp = [];

app.post('/', (req, res) => {
  temp.push(req.body);
  res.redirect('/list');
});

app.get('/list', (req, res) => {
  for (let i = 0; i < temp.length; i++) {
    console.log(temp[i]);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}/`);
});
