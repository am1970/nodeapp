const Post = require('../models/Post');
let passport = require('passport');

exports.getAll = (req, res) => {
    if(!req.params.post_id) {
        return res.status(400).send('Missing URL parameter: post_id');
    }

    Post.findById(req.params.post_id)
        .then(post => {
            console.log(post);
            res.json(post.comments);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.get = (req, res) => {
    if(!req.params.post_id) {
        return res.status(400).send('Missing URL parameter: post_id');
    }

    if(!req.params.comment_id) {
        return res.status(400).send('Missing URL parameter: comment_id');
    }

    Post.findById(req.params.post_id)
        .then(post => {
            let comment = post.comments.id(req.params.comment_id);

            if(comment) {
                res.json(comment);
            }
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

    if(!req.params.post_id) {
        return res.status(400).send('Missing URL parameter: post_id');
    }

    if(err) {
        console.log(err);
    }

    if(info !== undefined) {
        console.log(info.message);
        res.send(info.message);
    } else {
        Post.findById(req.params.post_id)
            .then(post => {
                let data = req.body;
                data.user_id = user._id;
                post.comments.push(data);
                post.save()
                    .then(post => {
                        res.status(200).send('Comment created');
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    })(req, res, next);
};

exports.update = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {

        if(!req.body) {
            return res.status(400).send('Request body is missing');
        }

        if(!req.params.post_id) {
            return res.status(400).send('Missing URL parameter: post_id');
        }

        if(!req.params.comment_id) {
            return res.status(400).send('Missing URL parameter: comment_id');
        }

        if(err) {
            console.log(err);
        }

        if(info !== undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            Post.findById(req.params.post_id)
                .then(post => {
                    let comment = post.comments.id(req.params.comment_id);
                    comment.text = req.body.text;

                    post.save()
                        .then(post => {
                            console.log(post);
                            res.status(200).send('Comment updated');
                        })
                        .catch(err => {
                            res.status(500).json(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });
        }
    })(req, res, next);
};

exports.delete = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if(!req.params.post_id) {
            return res.status(400).send('Missing URL parameter: post_id');
        }

        if(!req.params.comment_id) {
            return res.status(400).send('Missing URL parameter: comment_id');
        }

        if(err) {
            console.log(err);
        }

        if(info !== undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            Post.findById(req.params.post_id)
                .then(post => {
                    post.comments.id(req.params.comment_id).remove();
                    post.save()
                        .then(post => {
                            res.status(200).send('Comment deleted');
                        })
                        .catch(err => {
                            res.status(500).json(err);
                        });
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }
    })(req, res, next);
};