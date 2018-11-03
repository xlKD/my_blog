var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var conn = MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });

/* GET home page. */
router.get('/', function(req, res, next) {
	conn.then(client => client.db('blog').collection('blogs').find().toArray(function(err, results) {
        res.render('index', {
            blogs: results
        })
	}));
});

module.exports = router;
