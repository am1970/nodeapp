let express = require('express');
let router = express.Router();
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

module.exports = router;