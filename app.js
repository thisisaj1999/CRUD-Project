const express = require('express');
require('./db/connect');
require('dotenv').config();
const User = require('./models/userData');

const cities = require('./db/cities');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('form', { cities: cities });
});

let data = {};

app.post('/', (req, res) => {
  const data = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    contact: req.body.contact,
    address: req.body.address,
    city: req.body.city,
    gender: req.body.gender,
  });

  const storedData = data.save();

  res.redirect('/list');
});

app.get('/list', async (req, res) => {
  User.find().exec((err, users) => {
    res.render('list', {
      users: users,
    });
  });
});

app.delete('/delete/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`User deleted successfully...`);
    }
  });
});

// app.delete('/reviews/:id', function (req, res) {
//   console.log("DELETE review")
//   Review.findByIdAndRemove(req.params.id).then((review) => {
//     res.redirect('/');
//   }).catch((err) => {
//     console.log(err.message);
//   })
// })

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}/`);
});
