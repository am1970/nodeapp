let User = require('../../models/User');
let passport = require('passport');

exports.register = (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if(err) {
            console.log(err);
        }

        if(info !== undefined) {
            console.log(info.message);
        } else {
            req.logIn(user, err => {
                const data = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: user.email
                };

                User.findOneAndUpdate({ email: data.email}, data, {new: true})
                    .then(user => {
                        if(user) {
                            res.status(200).send({message: 'user created'});
                        }
                    }).catch(err => {
                    res.status(500).send({message: 'user did not create', err});
                })
            });
        }
    })(req, res, next);
};