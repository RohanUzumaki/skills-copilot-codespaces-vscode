// Create web server

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Comment = require('./model/comments');
var db = 'mongodb://localhost/comments';
var port = 8080;

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendfile(path.join(__dirname + '/index.html'));
});

app.get('/comments', function(req, res){
    Comment.find({}, function(err, docs){
        if(err) res.json(err);
        else res.send(docs);
    });
});

app.post('/comments', function(req, res){
    var newComment = new Comment();
    newComment.username = req.body.username;
    newComment.comment = req.body.comment;
    newComment.save(function(err){
        if(err) res.json(err);
        else res.send('Successfully inserted comment!');
    });
});

app.delete('/comments/:id', function(req, res){
    Comment.findByIdAndRemove(req.params.id, function(err){
        if(err) res.json(err);
        else res.send('Successfully removed comment!');
    });
});

app.listen(port, function(){
    console.log('app listening on port ' + port);
}); 


