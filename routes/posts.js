var express = require('express');
var router = express.Router();
var db = require('./db');

router.get('/', function(req, res, next) {
	db.collection('blogs').find().toArray(function(err, results) {
  		console.log(results)

        res.render('post/index', {
            blogs: results
        })
	})
});

router.get('/add', function(req, res, next) {
    res.render('post/add', {
        blogs: results
	})
});

router.post('/create', function(req, res, next) {
    db.collection('blogs').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved')
        res.redirect('/')
    })
});

module.exports = router;
