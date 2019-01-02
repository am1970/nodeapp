let swaggerUi = require('swagger-ui-express');
let swaggerJsDoc = require('swagger-jsdoc');
let express = require('express');
let router = express.Router();

let options = {
    swaggerDefinition: {
        info: {
            title: "Test API",
            version: '1.0.0',
            description: 'Test Express API',
        },
        basePath: 'posts',
    },
    apis: ['./src/routes/post.js'],
};

let specs = swaggerJsDoc(options);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;