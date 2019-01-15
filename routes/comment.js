let CommentController = require('../controllers/CommentController');
let express = require('express');
let router = express.Router();

/**
 * @swagger
 * /posts/:post_id/comments:
 *      get:
 *          description: Get all comments by post_id
 */
router.get('/:post_id/comments', CommentController.getAll);
/**
 * @swagger
 * /posts/:post_id/comments/:comment_id:
 *      get:
 *          description: Get a comment by id
 */
router.get('/:post_id/comments/:comment_id', CommentController.get);

/**
 * @swagger
 * /posts/:post_id/comments:
 *      post:
 *          description: Save a comment to db
 */
router.post('/:post_id/comments', CommentController.create);
/**
 * @swagger
 * /posts/:post_id/comments/:comment_id
 *      put:
 *          description: Updating a comment by id
 */
router.put('/:post_id/comments/:comment_id', CommentController.update);

/**
 * @swagger
 * /posts/:post_id/comments/:comment_id:
 *      delete:
 *          description: Removing a comment by id
 */
router.delete('/:post_id/comments/:comment_id', CommentController.delete);

module.exports = router;