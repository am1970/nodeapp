const Post = require('../models/Post');

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

exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send('Request body is missing');
    }

    let model = new Post(req.body);

    model.save()
        .then(doc => {
            if(!doc || doc.length === 0) {
                return res.status(500).send(doc);
            }
            res.status(201).send(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.update = (req, res) => {
    if(!req.params.id) {
        return res.status(400).send('Missing URL parameter: id');
    }

    Post.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true})
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.delete = (req, res) => {
    if(!req.params.id) {
        return res.status(400).send('Missing URL parameter: id');
    }

    Post.findOneAndRemove({ _id: req.params.id})
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};