var express = require('express');
var router = express.Router();

var database = require('../config/firebase').database();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/docs', function(req, res, next) {
  var docs = database.ref("docs");
  docs.once('value', function(snapshot){
		res.status(200);
		res.json(snapshot.val());
	});
});

router.get('/comments', function(req, res, next) {
  var comments = database.ref("comments");
  comments.once('value', function(snapshot){
		res.status(200);
		res.json(snapshot.val());
	});
});

module.exports = router;
