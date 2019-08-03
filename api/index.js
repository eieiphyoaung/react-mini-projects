var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('todo',['tasks','users']);
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var cors = require('cors');
app.use(cors());

var {check,validationResult} = require('express-validator/check');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var sign_key = require('./config').sign_key;

var passport = require('passport');
var auth = require('./auth');
passport.use(auth);

// curl -X POST localhost:8000/tasks -d "subject=Apple"
app.post('/tasks',[
	check('subject').exists()
],function(req,res){
	var errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(422).json({ errors : errors.array()});
	}
	var subject = req.body.subject;
	db.tasks.insert({subject,'status':0},function(err,data){
		res.json(data);
	});
});

// app.get('/tasks',function(req,res){
// 	db.tasks.find(function(err,data){
// 		res.json(data);
// 	});
// });

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

app.patch('/tasks/:id',function(req,res){
	var id = req.params.id;
	var status = parseInt(req.body.status);
	db.tasks.update(
		{'_id':mongojs.ObjectId(id)},
		{$set: { status : status}},
		{multi:true},
		function(err,data){
			res.json(data);
		}

		);
});

app.get('/tasks',passport.authenticate('jwt',{session:false}),function(req,res){
	db.tasks.find(function(err,data){
		res.json(data);
	});
});

app.post('/login',function(req,res){
	var name = req.body.name;
	var password = req.body.password;
	db.users.find({name,password},function(err,data){
		if(data.length){
			var token = jwt.sign(data[0],sign_key);
			res.json(token);
		}else{
			res.status(403).json({ 'msg':'Login Failed' });
		}
	});
});

app.listen('8000',function(){
	console.log('todo api started at port 8000');
});