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
    "deadline": moment(req.body.deadline).unix() || null,
    "category": req.body.category || null,
    "timestamp": moment().unix(),
    "content": req.body.content,
    "length": req.body.content.length,
    "author": req.body.author || ''
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

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// GET detail view
router.get('/docs/show/:id', function(req, res, next) {
  var doc = database.ref("docs/" + req.params.id);
  doc.once('value', function (snapshot) {
    doc = snapshot.val();
    res.render('detailview', { title: doc.title , author: doc.author, content: doc.content.replaceAll('\\n', '<br/><br/>')});
  });
});

module.exports = router;
