const express = require("express");
let postRoute = require('./src/routes/post');
let swaggerDoc = require('./src/swaggerDoc');

const app = express();


app.use((err, req, res, next) => console.log('There was an error', err));
app.use(postRoute);
app.use(swaggerDoc);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));