//"use strict";
//global是内置全局变量
global.env = "dev";

if (process.argv.length > 2) {
    global.env = process.argv[2];
}
var utils = require('./common/utils');
console.log("env:" + global.env);
var express = require('express');
var app = express();
var path = require('path');
var mongoose = require("mongoose");

var bodyParser = require('body-parser');
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
var multer = require('multer');
var session = require('express-session');

global.dbHelper = require('./common/dbHelper');

global.db = mongoose.connect("mongodb://127.0.0.1:27017/CartDemo");

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));


// 设定view engine变量，意为网页模板引擎
//app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer());

// 设定静态文件目录，比如本地文件
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
});


require('./routes')(app);

app.get('/', function(req, res) {
    res.render('login');
});

app.listen(3000);
