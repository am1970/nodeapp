const express = require("express");
let postRoutes = require('./routes/post');
let userRoutes = require('./routes/user');
let swaggerDoc = require('./swaggerDoc');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let databaseConf = require('./config/database');
const app = express();

const MONGO_SERVER = databaseConf.mongo_serve;
const DATABASE = databaseConf.database;
const PORT = databaseConf.port;

//Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    console.log(`URL: ${req.originalUrl} BODY: ${req.body}`);
    next();
});

//Import routes
app.use('/', userRoutes);
app.use('/posts', postRoutes);
app.use(swaggerDoc);

//Set connection for db
mongoose.connect(`mongodb://${MONGO_SERVER}/${DATABASE}`, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));