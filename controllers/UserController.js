let passport = require('passport');

exports.get = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if(err) {
            console.log(err);
        }

        if(info !== undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            console.log('user found in db from route');
            res.status(200).send({
                auth: true,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                message: 'user found in db'
            });
        }


    })(req, res, next);
};