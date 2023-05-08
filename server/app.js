const express = require('express');
require('./db/connect');
require('dotenv').config();
const User = require('./models/userData');
const https = require('https');
const cities = require('./db/cities');
const { response } = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('form', { cities: cities });
});

let dataUser = {};

app.post('/', (req, res) => {
  try {
    const dataUser = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      contact: req.body.contact,
      address: req.body.address,
      city: req.body.city,
      gender: req.body.gender,
    });

    const storedData = dataUser.save();

    const data = {
      members: [
        {
          email_address: req.body.email,
          status: 'subscribed',
          merge_fields: {
            FNAME: req.body.fname,
            LNAME: req.body.lname,
            PHONE: req.body.contact,
            ADDRESS: req.body.address,
          },
        },
      ],
    };

    const jsonData = JSON.stringify(data);

    const url = process.env.MAILCHIMP_URL;

    const options = {
      method: 'POST',
      auth: process.env.MAILCHIMP_KEY,
    };

    const request = https.request(url, options, (response) => {
      response.on('data', (data) => {
        console.log(JSON.parse(data));
      });
    });

    request.write(jsonData);
    request.end();
    res.redirect('/list');
    console.log(`User added successfully...`);
  } catch (error) {
    res.redirect('/list');
    console.log(`User registration failed...\n${error}`);
  }
});

app.get('/list', async (req, res) => {
  User.find().exec((err, users) => {
    res.render('list', {
      usersList: users,
    });
  });
});

app.get('/delete/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/list');
      console.log(`User deleted successfully...`);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// get route update user
app.get('/edit/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.redirect('/list');
    } else {
      if (user == null) {
        res.redirect('/list');
      } else {
        res.render('edit', {
          userUpdate: user,
        });
      }
    }
  });
});

// post route update user
app.post('/update/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      contact: req.body.contact,
      address: req.body.address,
      city: req.body.city,
      gender: req.body.gender,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('User updated successfully...');
        res.redirect('/list');
      }
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}/`);
});
