var express = require('express');
var router = express.Router();

router.get('/create', function(req, res, next) {
    res.render('post/index', {});
});

router.post('/create', function(req, res, next) {
    res.render('post/detail', {
        title: req.body.title,
        content: req.body.content
    });
});

module.exports = router;
