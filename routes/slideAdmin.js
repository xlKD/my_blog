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
	conn.then(client => client.db('blog').collection('slides').find().toArray(function(err, results) {
        res.render('slide/index', {
            slides: results
        })
	}))
})

router.get('/add', function(req, res, next) {
    console.log('mongodb://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.host + '/' + dbConfig.database);
	conn.then(client => client.db('blog').collection('posts').find({}, { title:1 }).toArray(function(err, results) {
        res.render('slide/add', {
            posts: results
        })
    }))
});

router.get('/:slideId/edit', function(req, res, next) {
    const slideId = req.params.slideId.toString()

	conn.then(
        client => {
            client.db('blog').collection('slides').find({_id: new ObjectID(slideId)}).limit(1).next(function(err, slide) {
                console.log(slideId);
                if (err) return console.log(err)

                client.db('blog').collection('posts').find({}, { title:1 }).toArray(function(err, posts) {
                    console.log(slide);
                    res.render('slide/edit', {
                        posts: posts,
                        slide: slide
                    })
                })
            })
        }
    )
});

router.post('/add', function(req, res, next) {
    for ( let key in req.body['imgUrls'] ) {
        if ( req.body['imgUrls'][key] === '' ) {
            req.body['imgUrls'].splice(key, 1);
            req.body['imgCaptions'].splice(key, 1);
        }
    }


    conn.then(client => client.db('blog').collection('slides').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        res.redirect('/slides')
    }))
});

router.post('/edit', function(req, res, next) {
    const slideId = req.body['_id'];
    delete req.body['_id'];

    for ( let key in req.body['imgUrls'] ) {
        if ( req.body['imgUrls'][key] === '' ) {
            req.body['imgUrls'].splice(key, 1);
            req.body['imgCaptions'].splice(key, 1);
        }
    }

    conn.then(client => client.db('blog').collection('slides').replaceOne({_id: ObjectID(slideId)}, req.body, (err, result) => {
        if (err) return console.log(err)

        res.redirect('/slides/' + slideId + '/edit')
    }))
});

module.exports = router;
