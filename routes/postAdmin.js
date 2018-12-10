const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const dbConfig = require('../dbConfig');

const conn = MongoClient.connect(
  'mongodb://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.host + '/' + dbConfig.database,
  { useNewUrlParser: true }
)

router.get('/', function(req, res, next) {
	conn.then(client => client.db('blog').collection('posts').find().toArray(function(err, results) {
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
            client.db('blog').collection('posts').find({_id: new ObjectID(post_id)}).limit(1).next(function(err, post) {
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
            client.db('blog').collection('posts').find({_id: new ObjectID(post_id)}).limit(1).next(function(err, post) {
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

    conn.then(client => client.db('blog').collection('posts').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        res.redirect('/posts')
    }))
});

router.post('/edit', function(req, res, next) {
    // Exclude summernote's files input
    delete req.body['files'];

    const postId = req.body['_id'];
    delete req.body['_id'];
    conn.then(client => client.db('blog').collection('posts').replaceOne({_id: ObjectID(postId)}, req.body, (err, result) => {
        if (err) return console.log(err)

        res.redirect('/posts/' + postId)
    }))
});

module.exports = router;
