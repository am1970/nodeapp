let User = require('../models/User');

exports.findByEmail = (email) => {
  return User.findOne({email: email});
};
