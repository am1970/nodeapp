const express = require("express");
let postRoute = require('./src/routes/post');
let swaggerDoc = require('./src/swaggerDoc');
let bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use((err, req, res, next) => {
    if(err) {
        console.log('There was an error', err)
    } else {
        console.log(`URL: ${req.originalUrl} \n BODY: ${req.body}`)
    }
});
app.use(postRoute);
app.use(swaggerDoc);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));