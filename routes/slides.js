const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const dbConnection = require('../db_conn/dbConnection');

router.get('/by_post/:postId', cors(), function(req, res, next) {
    const postId = req.params.postId.toString()
	dbConnection.then(client => client.db('blog').collection('slides').find({postId: postId}).limit(1).next(function(err, slide) {
        if (err) return console.log(err)

        console.log(slide);
        res.send(slide)
    }))
});

module.exports = router;
