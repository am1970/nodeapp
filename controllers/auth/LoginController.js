let User = require('../../models/User');
let passport = require('passport');
let authConfig = require('../../config/auth');
let jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {

       if(err) {
           console.log(err);
       }

        if(info !== undefined) {
            console.log(info.message);
        } else {
            req.logIn(user, err => {
                User.findOne({
                    email: user.email
                }).then(user => {
                   const token = jwt.sign({email: user.email, id: user._id}, authConfig.jwt_secret);
                   res.status(200).send({
                       auth: true,
                       token: token,
                       message: 'user found & logged in'
                   });
                });
            });
        }
    })(req, res, next);
};

