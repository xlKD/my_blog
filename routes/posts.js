var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
const cors = require('cors');

var conn = MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true })

// API
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

// Web
router.get('/', function(req, res, next) {
	conn.then(client => client.db('blog').collection('blogs').find().toArray(function(err, results) {
        res.render('post/index', {
            blogs: results
        })
	}))
})

router.get('/add', function(req, res, next) {
	conn.then(client => {
        client.db('blog').collection('categories').find().toArray(function(err, categories) {
            if (err) return console.log(err)

            client.db('blog').collection('tags').find().toArray(function(err, tags) {
                res.render('post/add', {
                    tags: tags,
                    categories: categories
                })
            })
	    })
    })
});

router.get('/:post_id', function(req, res, next) {
    const post_id = req.params.post_id.toString()
	conn.then(
        client => {
            client.db('blog').collection('blogs').find({_id: new ObjectID(post_id)}).limit(1).next(function(err, post) {
                if (err) return console.log(err)

                res.render('post/detail', {
	                post: post
                })
            })
        }
    )
});

router.get('/:post_id/edit', function(req, res, next) {
    const post_id = req.params.post_id.toString()
	conn.then(
        client => {
            client.db('blog').collection('blogs').find({_id: new ObjectID(post_id)}).limit(1).next(function(err, post) {
                if (err) return console.log(err)

                client.db('blog').collection('categories').find().toArray(function(err, categories) {
                if (err) return console.log(err)

                    client.db('blog').collection('tags').find().toArray(function(err, tags) {
                        res.render('post/edit', {
                            post: post,
                            categories: categories,
                            tags: tags
                        })
                    })
                })
            })
        }
    )
});

router.post('/add', function(req, res, next) {
    // Exclude summernote's files input
    delete req.body['files'];

    conn.then(client => client.db('blog').collection('blogs').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        res.redirect('/posts')
    }))
});

router.post('/edit', function(req, res, next) {
    // Exclude summernote's files input
    delete req.body['files'];

    const postId = req.body['_id'];
    delete req.body['_id'];
    conn.then(client => client.db('blog').collection('blogs').replaceOne({_id: ObjectID(postId)}, req.body, (err, result) => {
        if (err) return console.log(err)

        res.redirect('/posts/' + postId)
    }))
});

module.exports = router;
