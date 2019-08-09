const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const joi = require('@hapi/joi');
const dbConfig = require('../dbConfig');

const conn = MongoClient.connect(
  'mongodb://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.host + '/' + dbConfig.database,
  { useNewUrlParser: true }
)

router.get('/', cors(), function(req, res, next) {
    const schema = joi.object().keys({
        category: joi.string(),
        tag: joi.string(),
        keyword: joi.string(),
    })
    const validation = schema.validate({
        category: req.query.category,
        tag: req.query.tag,
        keyword: req.query.keyword
    })
    
    if ( validation.error !== null ) {
        res.send({error: 'Invalid request!'})
    } else {
        let filters = {};
        if ( req.query.category !== undefined ) {
            filters.category = req.query.category;
        }
        if ( req.query.tag !== undefined ) {
            // TODO: Plural tags should be fixed somehow
            filters.tags = req.query.tag;
        }
        if ( req.query.keyword !== undefined ) {
            filters.$or = [
                {title: new RegExp(req.query.keyword)},
                {content: new RegExp(req.query.keyword)}
            ]
        }
        let offset = 0;
        if ( req.query.offset !== undefined ) {
            offset = parseInt(req.query.offset);
        }

        conn.then(client => client.db('blog').collection('posts').find(filters).project({_id:1,title:1,category:1,created_at:1}).sort({created_at: -1})
            .skip(offset).limit(5).toArray(function(err, results) {
            if (err) return console.log(err)

            res.send({
                posts: results,
                offset: offset + results.length,
                isOver: results.length !== 5,
            })
        }))
    }
})

router.get('/:postId', cors(), function(req, res, next) {
    const postId = req.params.postId.toString()
    const schema = joi.object().keys({
        postId: joi.string().alphanum().required(),
    })
    const validation = schema.validate({ postId: postId})

    if ( validation.error === null ) {
        conn.then(client => client.db('blog').collection('posts').find({_id: new ObjectID(postId)}).limit(1).next(function(err, post) {
            if (err) return console.log(err)

            res.send(post)
        }))
    } else {
        res.send({error: 'Invalid request!'})
    }
});

module.exports = router;
