const express = require("express");
let postRoutes = require('./routes/post');
let authRoutes = require('./routes/auth');
let userRoutes = require('./routes/user');
let commentRoutes = require('./routes/comment');
let swaggerDoc = require('./swaggerDoc');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let config = require('./config');
let passport = require('passport');

require('./config/passport');

const app = express();

const MONGO_SERVER = config.database.mongo_serve;
const DATABASE = config.database.database;
const PORT = config.database.port;

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use((req, res, next) => {
    console.log(`URL: ${req.originalUrl} BODY: ${JSON.stringify(req.body)}`);
    next();
});

app.use(passport.initialize());

//Import routes
app.use('/api/', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/posts', commentRoutes);
app.use('/api/posts', postRoutes);

app.use(swaggerDoc);

//Set connection for db
mongoose.connect(`mongodb://${MONGO_SERVER}/${DATABASE}`, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));