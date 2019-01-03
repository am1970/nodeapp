let PostController = require('../controllers/PostController');
let express = require('express');
let router = express.Router();

/**
 * @swagger
 * /posts:
 *      get:
 *          description: Get all posts
 */
router.get('/', PostController.getAll);
/**
 * @swagger
 * /posts/:id:
 *      get:
 *          description: Get a post by id
 */
router.get('/:id', PostController.get);

/**
 * @swagger
 * /posts:
 *      post:
 *          description: Save a post to db
 */
router.post('/', PostController.create);

/**
 * @swagger
 * /posts/:id:
 *      put:
 *          description: Updating a post by id
 */
router.put('/:id', PostController.update);

/**
 * @swagger
 * /posts/:id:
 *      delete:
 *          description: Removing a post by id
 */
router.delete('/:id', PostController.delete);

module.exports = router;