const db = require('../models');

module.exports = {
  findById: function(req, res) {
    db.User.findById({ _id: req.params.id })
      .then(dbModel => {
        console.log(dbModel);
        return res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  }
};
