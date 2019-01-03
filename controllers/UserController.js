const User = require('../models/User');

exports.register = (req, res) => {
   return res.send('This route for register user');
};

exports.login = (req, res) => {
    return res.send('This route for login user');
};

exports.logout = (req, res) => {
    return res.send('This route for logout user');
};