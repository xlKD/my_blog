var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express',
		data: {
			id: 1
		}
	});
});

module.exports = router;
