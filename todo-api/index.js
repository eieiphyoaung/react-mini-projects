var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('todo',['tasks','users']);

var cors = require('cors');

app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/tasks',function(req,res){
	db.tasks.find(function(err,data){
		res.json(data);
	});
});

app.get('/tasks/:id',function(req,res){
	var id = req.params.id;
	db.task.find({'_id':mongojs.ObjectId(id)},function(err,data){
		res.json(data);
	});
});

app.delete('/tasks/:id',function(req,res){
	var id = req.params.id;
	db.tasks.remove({'_id':mongojs.ObjectId(id)},function(err,data){
		res.json(data);
	});
});

app.delete('/tasks',function(req,res){
	db.tasks.remove({'status':1},function(err,data){
		res.json(data);
	});
});


app.listen('8000',function(){
	console.log('todo api started at port 8000');
});