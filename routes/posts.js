var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
const cors = require('cors');

var conn = MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true })

router.get('/', function(req, res, next) {
	conn.then(client => client.db('blog').collection('blogs').find().toArray(function(err, results) {
        res.render('post/index', {
            blogs: results
        })
	}))
})

router.get('/api', cors(), function(req, res, next) {
	conn.then(client => client.db('blog').collection('blogs').find().toArray(function(err, results) {
        res.send(results)
	}))
})

router.get('/api/:postId', cors(), function(req, res, next) {
    const postId = req.params.postId.toString()
	conn.then(client => client.db('blog').collection('blogs').find({_id: new ObjectID(postId)}).limit(1).next(function(err, post) {
        if (err) return console.log(err)

        res.send(post)
    }))
});

router.get('/add', function(req, res, next) {
    res.render('post/add', {
	})
});

router.get('/:post_id', function(req, res, next) {
    const post_id = req.params.post_id.toString()
	conn.then(client => client.db('blog').collection('blogs').find({_id: new ObjectID(post_id)}).limit(1).next(function(err, post) {
        if (err) return console.log(err)

        res.render('post/detail', {
	        post: post
        })
    }))
});

router.post('/add', function(req, res, next) {
    conn.then(client => client.db('blog').collection('blogs').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        res.redirect('/posts')
    }))
});

module.exports = router;
