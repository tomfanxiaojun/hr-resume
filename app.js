
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , movie = require('./routes/movie')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs')
  , SessionStore = require("session-mongoose")(express);

var store = new SessionStore({
    url: "mongodb://localhost/session01",
    interval: 120000 // expiration check worker run interval in millisec (default: 60000)
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser()); 
app.use(express.cookieSession({secret : 'blog.fens.me'}));
app.use(express.session({
  	secret : 'blog.fens.me',
    store: store,
    cookie: { maxAge: 900000 } // expire session in 15 min or 900 seconds
}));
app.use(function(req, res, next){
  res.locals.user = req.session.user;
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = '';
  if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
  next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//basic
app.get('/', routes.index);

app.all('/login', notAuthentication);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);

app.get('/logout', authentication);
app.get('/logout', routes.logout);

app.get('/home', authentication);
app.get('/home', routes.home);


//mongo
app.get('/movie/add',movie.movieAdd);
app.post('/movie/add',movie.doMovieAdd);
app.get('/movie/:name',movie.movieAdd);
app.get('/movie/json/:name',movie.movieJSON);



app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


function authentication(req, res, next) {
  if (!req.session.user) {
    req.session.error='请先登陆';
    return res.redirect('/login');
  }
  next();
}

function notAuthentication(req, res, next) {
	if (req.session.user) {
    	req.session.error='已登陆';
    	return res.redirect('/');
  	}
  next();
}


/*var mongoose = require("mongoose");
 mongoose.connect("mongodb://localhost/nodejs");*/
var mongodb = require('./models/mongodb');
    
var Schema = mongodb.mongoose.Schema;
var TestSchema = new Schema({
    name : { type:String },
    age  : { type:Number, default:0 },
    email: { type:String },
    time : { type:Date, default:Date.now }
});
var TestModel = mongodb.mongoose.model("test1", TestSchema );
var TestEntity = new TestModel({
    name : "helloworld",
    age  : 28,
    email: "helloworld@qq.com"
});
// sava 
TestEntity.save(function(error,doc){
  if(error){
     console.log("error :" + error);
  }else{
     console.log("-----------------add data.");
     //console.log(doc);
  }
});
var TestEntity01 = new TestModel({
    name : "helloworld 01",
    age  : 28,
    email: "helldddddoworld@qq.com"
});

TestEntity01.save(function(error,doc){
  if(error){
     console.log("error :" + error);
  }else{
     console.log("-----------------add data.");
     //console.log(doc);
  }
});
// model create a new record by create.
TestModel.create({
    name : "test_create", 
    age  : 26, 
    email: "tom@qq.com"
  },function(error,doc){
    //console.log(doc);
});
// Entity create a new record by save
var Entity = new TestModel({name:"entity_save",age: 27}); 
Entity.save(function(error,doc) {
    if(error) {
        console.log(error);
    } else {
        //console.log(doc);
    }
});
// select
TestModel.find({},function(error,docs){
console.log("-----------------Search data.");
console.log(docs.length);
});
// find by pare
TestModel.find({ "age": 28 }, function (error, docs) {
  if(error){
    console.log("error :" + error);
  }else{
    console.log("-----------------Search by age.record count:"+docs.length);    
    //console.log(docs); //docs: age为28的所有文档
  }
}); 
// update date
var conditions = {_id : '55a8c268a2d286b023000002'}; 
var update = {$set : { age : 16 }};
TestModel.update(conditions, update, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('Update success!');
    }
});
// select by id
TestModel.find(conditions,function(error,docs){
console.log("-----------------Search data.");
console.log(docs);
}); 
 // delete data
TestModel.remove(conditions, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('Delete success!');
    }
});
// select by id
TestModel.find(conditions,function(error,docs){
console.log("-----------------Search data.");
console.log(docs);
}); 
 