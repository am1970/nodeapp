const jwtSecret = require('./auth');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    User = require('../models/User'),
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  'register',
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
        },
        (email, password, done) => {
            try {
                User.findOne({
                    email: email,
                }).then(user => {
                    if(user != null) {
                        console.log('email already taken');
                        return done(null, false, {message: 'email already taken'});
                    } else {
                        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                            let user = new User({email, password: hashedPassword});
                            user.save().then(user => {
                                return done(null, user);
                            });
                        })
                    }
                })
            } catch (err) {
                done(err);
            }
    })
);

passport.use(
    'login',
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, (email, password, done) => {
        try {
            User.findOne({
                email: email,
            }).then(user => {
                if(user == null) {
                    return done(null, false, {message: 'bad email'});
                } else {
                   bcrypt.compare(password, user.password)
                       .then(res => {
                            if(res !== true) {
                                console.log('password do not match');
                                return done(null, false, {message: 'password do not match'});
                            }

                            console.log('user found & authenticated');
                            return done(null, user);
                        });
                }
            })
        } catch (err) {
            done(err);
        }
    })
);

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.jwt_secret
};

passport.use(
    'jwt',
    new JWTstrategy(opts, (jwtPayload, done) => {
        try {
            User.findOne({
                email: jwtPayload.email,
            }).then(user => {
                if(user) {
                    console.log('user found in db in passport');
                    done(null, user);
                } else {
                    console.log('user not found in db');
                    done(null, false);
                }
            })
        } catch (err) {
            done(err);
        }
    })
);

passport.use(
    'post-access',
    new JWTstrategy(opts, (jwtPayload, done) => {
        try {
            Post.findById({
                email: jwtPayload.email,
            }).then(user => {
                if(user) {
                    console.log('user found in db in passport');
                    done(null, user);
                } else {
                    console.log('user not found in db');
                    done(null, false);
                }
            })
        } catch (err) {
            done(err);
        }
    })
);