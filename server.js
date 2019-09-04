require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const serverInfo = { port: 5037, serverName: 'BoxScore Server' };
const db_connect = require('./config/keys').mongoURI;

const PORT = process.env.PORT || serverInfo.port;
const app = express();
const routes = require('./routes');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ex.  /api/v1/users/findall
app.use(routes);
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
//database connection

mongoose
  .connect(db_connect, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log(`DB's Status -> Successfully Connected`))
  .catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
  console.log(`Node Server's Status ->  Succesfully Running on PORT:${PORT}`);
});
