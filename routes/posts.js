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

router.get('/', cors(), function(req, res, next) {
    let filters = {};
    if ( req.query.category !== undefined ) {
        filters.category = req.query.category;
    }
    if ( req.query.tag !== undefined ) {
        // TODO: Plural tags should be fixed somehow
        filters.tags = req.query.tag;
    }

    conn.then(client => client.db('blog').collection('posts').find(filters).project({_id:1,title:1,category:1,created_at:1}).sort({created_at: -1}).toArray(function(err, results) {
        if (err) return console.log(err)

        res.send(results)
    }))
})

router.get('/:postId', cors(), function(req, res, next) {
    const postId = req.params.postId.toString()
	conn.then(client => client.db('blog').collection('posts').find({_id: new ObjectID(postId)}).limit(1).next(function(err, post) {
        if (err) return console.log(err)

        res.send(post)
    }))
});

module.exports = router;
