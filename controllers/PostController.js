let Post = require('../models/Post');
let passport = require('passport');

exports.getAll = (req, res) => {
    Post.find({})
        .then(docs => {
            console.log(docs);
            res.json(docs);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.get = (req, res) => {
    if(!req.params.id) {
        return res.status(400).send('Missing URL parameter: id');
    }

    Post.findById(req.params.id)
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.create = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        console.log(user);
        if(!req.body) {
            return res.status(400).send('Request body is missing');
        }

        if(err) {
            console.log(err);
        }

        if(info !== undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            let post = new Post(req.body);
            post.user_id = user._id;
            post.save()
                .then(post => {
                    if (!post || post.length === 0) {
                        return res.status(500).send(post);
                    }
                    res.status(201).send(post);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }
    })(req, res, next);
};

exports.update = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        console.log(user, 'update');
        if(!req.body) {
            return res.status(400).send('Request body is missing');
        }

        if(err) {
            console.log(err);
        }

        if(info !== undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            if (!req.params.id) {
                return res.status(400).send('Missing URL parameter: id');
            }

            Post.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
                .then(doc => {
                    res.json(doc);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }
    })(req, res, next);
};

exports.delete = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        console.log(user);
        if(!req.body) {
            return res.status(400).send('Request body is missing');
        }

        if(err) {
            console.log(err);
        }

        if(info !== undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {

            if (!req.params.id) {
                return res.status(400).send('Missing URL parameter: id');
            }

            Post.findOneAndRemove({_id: req.params.id})
                .then(doc => {
                    res.json(doc);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }
    })(req, res, next);
};