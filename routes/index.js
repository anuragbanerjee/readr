var express = require('express');
var router = express.Router();

var database = require('../config/firebase').database();
var moment = require('moment');

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

router.post('/docs/new', function(req, res, next) {
  var docs = database.ref("docs");
  var new_docs = {
    "title": req.body.title || "Untitled",
    "deadline": req.body.deadline || null,
    "category": req.body.category || null,
    "timestamp": moment().unix(),
    "content": req.body.content,
    "length": req.body.content.length,
    "comments": []
  };
  // TODO: add author/user
  docs.push(new_docs);
  res.status(200);
  res.send("");
});

router.get('/docs/:id/comments', function(req, res, next) {
  var docs = database.ref("docs/" + req.params.id);
  docs.orderByChild("comments").once('value', function(snapshot){
		res.status(200);
		res.json(snapshot.child("comments").val());
	});
});

router.post('/docs/:id/comments', function(req, res, next) {
  var doc_comments = database.ref("docs/" + req.params.id + "/comments");
  var new_comment = {};
  new_comment.content = req.body.content;
  new_comment.start_index = req.body.start;
  new_comment.end_index = req.body.end;
  doc_comments.push(comment);
});

// router.get('/comments', function(req, res, next) {
//   var comments = database.ref("comments");
//   comments.once('value', function(snapshot){
// 		res.status(200);
// 		res.json(snapshot.val());
// 	});
// });

module.exports = router;
