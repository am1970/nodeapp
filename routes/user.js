let UserController = require('../controllers/UserController');
let express = require('express');
let router = express.Router();

/**
 * @swagger
 * /register:
 *      post:
 *          description: Get all posts
 */
router.post('/register', UserController.register);

/**
 * @swagger
 * /login:
 *      post:
 *          description: Get all posts
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /logout:
 *      post:
 *          description: Get all posts
 */
router.post('/logout', UserController.logout);

module.exports = router;