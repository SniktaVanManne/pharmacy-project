require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open on ${process.env.DATABASE}`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

require('./models/Registration');
const app = require('./app');

const server = app.listen(PORT, () => {
  console.log(`Express is running on port ${PORT}`);
});