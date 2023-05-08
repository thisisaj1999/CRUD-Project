const mongoose = require('mongoose');
require('dotenv').config();
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB connected successfully...`);
  })
  .catch((err) => {
    console.log(`DB connection falied...\n${err}`);
  });
