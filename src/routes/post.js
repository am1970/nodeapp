let PostModel = require('../models/post.model');
let express = require('express');
let router = express.Router();
// let bodyParser = require('body-parser');
//
// const urlencodedParser = bodyParser.urlencoded({extended: false});
/**
 * @swagger
 * /posts:
 *  get:
 *      description: Thiasd asd sad sad sad sad asd sad sadsad asd sad
 */
router.get('/posts', (req, res) => {
    res.send('This should return all posts');
});
/**
 * @swagger
 * /posts/:id:
 *  get:
 *      description: Thiasd asd sad sad sad sad asd sad sadsad asd sad
 */
router.get('/posts/:id', (req, res) => {
    res.end(`This should return post with ID ${req.params.id}`);
});

/**
 * @swagger
 * /posts/:id:
 *  get:
 *      description: Thiasd asd sad sad sad sad asd sad sadsad asd sad
 */
router.post('/posts', (req, res) => {
    console.log(req.body);
    if(!req.body) {
        return res.status(400).send('Request body is missing');
    }

    let model = new PostModel(req.body);

    model.save()
        .then(doc => {
            if(!doc || doc.length === 0) {
                return res.status(500).send(doc);
            }

            res.status(201).send(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.put('/posts/:id', (req, res) => {

});

router.del('/posts/:id', (req, res) => {

});

module.exports = router;