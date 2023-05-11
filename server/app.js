const express = require('express');
require('./db/connect');
const cors = require('cors');

require('dotenv').config();
const User = require('./models/userData');
const https = require('https');
const cities = require('./db/cities');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/all-cities', (req, res) => {
  res.json({ cities: cities });
});

app.post('/add-user', async (req, res) => {
  const dataUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    contact: req.body.contact,
    address: req.body.address,
    city: req.body.city,
    gender: req.body.gender,
  });

  const userEmail = await User.findOne({ email: dataUser.email });
  const userContact = await User.findOne({ contact: dataUser.contact });

  if (!userEmail && !userContact) {
    console.log(dataUser);
    dataUser.save();

    // const data = {
    //   members: [
    //     {
    //       email_address: req.body.email,
    //       status: 'subscribed',
    //       merge_fields: {
    //         FNAME: req.body.fname,
    //         LNAME: req.body.lname,
    //         PHONE: req.body.contact,
    //         ADDRESS: req.body.address,
    //       },
    //     },
    //   ],
    // };

    // const jsonData = JSON.stringify(data);

    // const url = process.env.MAILCHIMP_URL;

    // const options = {
    //   method: 'POST',
    //   auth: process.env.MAILCHIMP_KEY,
    // };

    // const request = https.request(url, options, (response) => {
    //   response.on('data', (data) => {
    //     console.log(JSON.parse(data));
    //   });
    // });

    // request.write(jsonData);
    // request.end();

    res.status(200).json({ msg: `User Created Successfully...` });
  } else if (!userContact) {
    res
      .status(400)
      .json({ msg: `Email "${dataUser.email}" Already Exists...` });
  } else if (!userEmail) {
    res
      .status(400)
      .json({ msg: `Contact "${dataUser.contact}" Already Exists...` });
  }
});

app.get('/list', async (req, res) => {
  User.find().exec((err, users) => {
    res.json({ usersList: users });
  });
});

app.delete('/delete/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json({ msg: `User Deleted Successfully...` });
    })
    .catch((err) => {
      res.status(400).json({ msg: `Error Deleting User...`, error: err });
    });
});

// get route update user
// app.patch('/edit/:id', (req, res) => {
//   User.findById(req.params.id, (err, user) => {
//     if (err) {
//       res.redirect('/list');
//     } else {
//       if (user == null) {
//         res.redirect('/list');
//       } else {
//         res.render('edit', {
//           userUpdate: user,
//         });
//       }
//     }
//   });
// });

// post route update user
app.patch('/update/:id', (req, res) => {
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
        res.status(400).json({ msg: `Error Updating User...`, error: err });
      } else {
        res.status(200).json({ msg: `User Updated Successfully...` });
      }
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}/`);
});
