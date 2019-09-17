var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const dbConnection = require('../db_conn/dbConnection');

router.get('/', cors(), function(req, res, next) {
	dbConnection.then(client => client.db('blog').collection('tags').find().toArray(function(err, results) {
        res.send(results)
	}))
});

module.exports = router;
