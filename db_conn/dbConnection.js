const dbConfig = require('./dbConfig');
const MongoClient = require('mongodb').MongoClient

const dbConnection = MongoClient.connect(
    'mongodb://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.host + '/' + dbConfig.database,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

module.exports = dbConnection;
