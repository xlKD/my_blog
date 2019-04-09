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

router.get('/by_post/:postId', cors(), function(req, res, next) {
    const postId = req.params.postId.toString()
    console.log(postId);
	conn.then(client => client.db('blog').collection('slides').find({postId: postId}).limit(1).next(function(err, slide) {
        if (err) return console.log(err)

        console.log(slide);
        res.send(slide)
    }))
});

module.exports = router;
