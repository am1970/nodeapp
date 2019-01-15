module.exports = {
    mongo_serve: process.env.MONGO_SERVER || 'localhost:27017',
    database: process.env.DATABASE || 'nodeapp',
    port: process.env.PORT || 3000,
};