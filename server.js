require('dotenv').config();
const express = require('express');
const path = require('path');

const serverInfo = { port: 3001, serverName: 'BoxScore Server' };
const routes = require('./routes');

const PORT = process.env.PORT || serverInfo.port;
const app = express();

// Define  middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ex.  /api/v1/users/findall
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};
app.use(allowCrossDomain); //allow all http calls - cors NOT HEALTHY !!!
app.use(routes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Node Server's Status ->  Succesfully Running on PORT:${PORT}`);
});

////mongoDB not needed
// const db_connect = require('./config/keys').mongoURI;
// const mongoose = require('mongoose');
////database connection
// mongoose
//   .connect(db_connect, { useNewUrlParser: true, useCreateIndex: true })
//   .then(() => console.log(`DB's Status -> Successfully Connected`))
//   .catch(err => console.log(err));
// const db = mongoose.connection; //output error if any
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
