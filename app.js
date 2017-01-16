
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


var index= require('./routes/index');
app.get('/', index.index);

var link= require('./routes/link');
app.get('/link1',link.link1);

var xiangmu= require('./routes/xiangmu');
app.get('/xiangmupage', xiangmu.getxiangmupage);

var about= require('./routes/about');
app.get('/aboutpage', about.getaboutpage);

var houtai= require('./routes/houtai');
app.get('/ygbhyrcdzgurl', houtai.gethoutaipage);

var image =require('./routes/image');
app.post('/uploadimage',image.uploadimage);
app.post('/getimagebyid',image.getimagebyid);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
