var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient

var conn = MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true })

router.get('/', function(req, res, next) {
	conn.then(client => client.db('blog').collection('blogs').find().toArray(function(err, results) {
  		console.log(results)

        res.render('post/index', {
            blogs: results
        })
	}))
})

router.get('/add', function(req, res, next) {
    res.render('post/add', {
	})
});

router.post('/create', function(req, res, next) {
    conn.then(client => client.db('blog').collection('blogs').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved')
        res.redirect('/posts')
    }))
});

module.exports = router;
