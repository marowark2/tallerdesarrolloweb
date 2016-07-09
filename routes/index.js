var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', function(err, html){
		res.sendFile('/home/bitnami/projects/ElSitioPosta/public/index.html');
	});
});

module.exports = router;