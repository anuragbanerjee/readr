var express = require('express');
var router = express.Router();

var database = require('../config/firebase').database();
var moment = require('moment');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET all docs
router.get('/docs', function(req, res, next) {
  var docs = database.ref("docs");
  docs.once('value', function(snapshot){
		res.status(200);
		res.json(snapshot.val());
	});
});

// POST a new document
router.post('/docs/new', function(req, res, next) {
  var docs = database.ref("docs");
  var new_docs = {
    "title": req.body.title || "Untitled",
    "deadline": req.body.deadline || null,
    "category": req.body.category || null,
    "timestamp": moment().unix(),
    "content": req.body.content,
    "length": req.body.content.length,
    "author": req.body.author || '',
    "comments": []
  };
  // TODO: add author/user
  docs.push(new_docs);
  res.status(200);
  res.send("");
});

// GET all comments for a particular doc
router.get('/docs/:id/comments', function(req, res, next) {
  var docs = database.ref("docs/" + req.params.id);
  docs.orderByChild("comments").once('value', function(snapshot){
		res.status(200);
		res.json(snapshot.child("comments").val());
	});
});

// POST a comment to a particular document
router.post('/docs/:id/comments', function(req, res, next) {
  var doc_comments = database.ref("docs/" + req.params.id + "/comments");
  var new_comment = {};
  new_comment.content = req.body.content;
  new_comment.start_index = req.body.start;
  new_comment.end_index = req.body.end;
  doc_comments.push(comment);
});

/* GET upload page. */
router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Express' });
});

module.exports = router;
