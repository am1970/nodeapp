let router = require('express').Router();
let LoginController = require('../controllers/auth/LoginController');
let RegisterController = require('../controllers/auth/RegisterController');

router.post('/login', LoginController.login);

router.post('/register', RegisterController.register);

module.exports = router;