var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const dbConnection = require('../db_conn/dbConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {})
});

module.exports = router;
