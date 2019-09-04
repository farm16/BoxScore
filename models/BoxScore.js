const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoxScoreSchema = new Schema({
  json: {
    type: String
  }
});

module.exports = mongoose.model('BoxScore', BoxScoreSchema);
