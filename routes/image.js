/**
 * New node file
 */
var fs = require('fs');
var mongoURL = "mongodb://mingxuanhan:liumiaomiao@localhost:27017/eyebrow";
var mongo = require("./mongo");
var ObjectId = require('mongodb').ObjectId;
var ejs = require("ejs");
function savebufferimagetomongo(image, req, res) {

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('image');
		var json_responses;
		coll.save({
			image : image
		}, function(err, user) {
			if (user) {
				console.log(user.ops[0]._id);
				console.log("save image success!");
				json_responses = {
					"statusCode" : 200,
					"imageid" : user.ops[0]._id
				};
				res.send(json_responses);
			} else {
				console.log("save location returned false");
				json_responses = {
					"statusCode" : 401
				};
				res.send(json_responses);
			}
		});
	});
}

exports.uploadimage = function(req, res) {
	console.log("11");
	var temppath = req.files.myimage.path;
	console.log(temppath);
	var image = {};
	image.data = fs.readFileSync(temppath);
	image.contentType = 'image/png';
	console.log(image);
	savebufferimagetomongo(image, req, res);

};

exports.getimagebyid = function(req, res) {
	var imageid = req.body.imageid;
	if (ObjectId.isValid(imageid)) {
		mongo.connect(mongoURL, function() {
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('image');
			var json_responses;
			coll.findOne({
				_id : new ObjectId(imageid)
			}, function(err, doc) {
				if (doc) {
					console.log(doc._id);
					console.log("find image success!");
					json_responses = {
						image : doc.image.data
					};
					res.send(json_responses);
				} else {
					console.log("find returned false");
					json_responses = {
						"statusCode" : 401
					};
					res.send(json_responses);
				}
			});
		});
	} else {
		res.send({
			"statusCode" : 401
		});
	}

};

exports.deleteimagebyid = function(req, res) {
	var imageid = req.body.imageid;
	console.log(req.body.imageid);

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('image');
		var json_responses;
		coll.findOne({
			_id : new ObjectId(imageid)
		}, function(err, doc) {
			if (doc) {
				coll.remove({
					_id : new ObjectId(imageid)
				});
				res.send({
					status : "delete success"
				});
			} else {
				res.send({
					status : "delete failed"
				});
			}

		});
	});

};

exports.getallimage = function(req, res) {
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('image');
		var json_responses;
		coll.find({}).toArray(function(err, doc) {
			if (doc) {
				console.log(doc);
				console.log("find image success!");
				res.send({
					images : doc
				});

			} else {
				console.log("find returned false");

			}
		});
	});

};