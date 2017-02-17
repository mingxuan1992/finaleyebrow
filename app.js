/**
 * Module dependencies.
 */

var express = require('express'), http = require('http'), path = require('path');

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

var index = require('./routes/index');
app.get('/', index.index);

var level2page = require('./routes/level2page');
app.get('/level2page/:category', level2page.getlevel2page);

var mapping = require('./routes/mapping');
app.get('/aboutpage', mapping.getaboutpage);
app.get('/resumepage', mapping.getresumepage);
app.get('/contactpage', mapping.getcontactpage);

var houtai = require('./routes/houtai');
app.get('/ygbhyrcdzgurl', houtai.gethoutaipage);
app.get('/ygbhyrcdzgurluploadimage', houtai.gethoutaiuploadimagepage);
app.get('/ygbhyrcdzgurlcheckimage', houtai.gethoutaicheckimagepage);
app.get('/ygbhyrcdzgurluploadxiangmu', houtai.gethoutaiuploadxiangmupage);
app.get('/ygbhyrcdzgurlcheckliebiao', houtai.gethoutaicheckliebiao);

var image = require('./routes/image');
app.post('/uploadimage', image.uploadimage);
app.post('/getimagebyid', image.getimagebyid);
app.post('/deleteimagebyid', image.deleteimagebyid);
app.post('/getallimage', image.getallimage);

var liebiao = require('./routes/liebiao');
app.post('/postliebiao', liebiao.postliebiao);
app.post('/getallliebiaobycategory', liebiao.getallliebiaobycategory);
app.post('/deleteliebiaobyid', liebiao.deleteliebiaobyid);
app.post('/updateliebiaobyid', liebiao.updateliebiaobyid);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
