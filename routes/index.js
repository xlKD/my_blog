var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const dbConfig = require('../dbConfig');

var conn = MongoClient.connect(
  'mongodb://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.host + '/' + dbConfig.database,
  { useNewUrlParser: true }
)

/* GET home page. */
router.get('/', function(req, res, next) {
	conn.then(client => client.db('blog').collection('blogs').find().toArray(function(err, results) {
        res.render('index', {
            blogs: results
        })
	}));
});

module.exports = router;
