let UserController = require('../controllers/UserController');
let express = require('express');
let router = express.Router();

/**
 * @swagger
 * /user:
 *      get:
 *          description: Get user by access token
 */
router.get('/', UserController.get);

module.exports = router;