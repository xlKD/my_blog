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
	conn.then(client => client.db('blog').collection('posts').find().toArray(function(err, results) {
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
