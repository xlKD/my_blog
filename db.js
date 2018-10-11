// DB connection
var db
var MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true },function (err, client) {
    if (err) throw err

    db = client
})

module.exports = db
