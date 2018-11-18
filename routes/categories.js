var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
const cors = require('cors');

var conn = MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true })

router.get('/', cors(), function(req, res, next) {
	conn.then(client => client.db('blog').collection('categories').find().toArray(function(err, results) {
        res.send(results)
	}))
});

module.exports = router;
