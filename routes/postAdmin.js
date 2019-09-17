const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const dbConnection = require('../db_conn/dbConnection');

router.get('/', function(req, res, next) {
	dbConnection.then(client => client.db('blog').collection('posts').find().toArray(function(err, results) {
        res.render('post/index', {
            blogs: results
        })
	}))
})

router.get('/add', function(req, res, next) {
	dbConnection.then(client => {
        const categoryFind = client.db('blog').collection('categories').find().toArray();
        const tagFind = client.db('blog').collection('tags').find().toArray();

        Promise.all([categoryFind, tagFind]).then(values => {
            res.render('post/add', {
                categories: values[0],
                tags: values[1],
            })
        }).catch((error) => {
            console.log(error);
        });
    })
});

router.get('/:post_id', function(req, res, next) {
    const post_id = req.params.post_id.toString()
	dbConnection.then(
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
	dbConnection.then(
        client => {
            const postFind = client.db('blog').collection('posts').find({_id: new ObjectID(post_id)}).limit(1).next();
            const categoryFind = client.db('blog').collection('categories').find().toArray();
            const tagFind = client.db('blog').collection('tags').find().toArray();

            Promise.all([postFind, categoryFind, tagFind]).then(values => {
                res.render('post/edit', {
                    post: values[0],
                    categories: values[1],
                    tags: values[2],
                })
            }).catch((error) => {
                console.log(error);
            });
        }
    )
});

router.post('/add', function(req, res, next) {
    // Exclude summernote's files input
    delete req.body['files'];

    dbConnection.then(client => client.db('blog').collection('posts').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        res.redirect('/posts')
    }))
});

router.post('/edit', function(req, res, next) {
    // Exclude summernote's files input
    delete req.body['files'];

    const postId = req.body['_id'];
    delete req.body['_id'];
    dbConnection.then(client => client.db('blog').collection('posts').replaceOne({_id: ObjectID(postId)}, req.body, (err, result) => {
        if (err) return console.log(err)

        res.redirect('/posts/' + postId)
    }))
});

module.exports = router;
