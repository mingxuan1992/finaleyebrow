/**
 * New node file
 */
var fs = require('fs');
var mongoURL = "mongodb://localhost:27017/eyebrow";
var mongo = require("./mongo");
var ObjectId = require('mongodb').ObjectId;


function savebufferimagetomongo(image,req,res){
	
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

	var temppath = req.files.myimage.path;
	var image = {};
	image.data = fs.readFileSync(temppath);
	image.contentType = 'image/png';
	console.log(image);
	//savebufferimagetomongo(image,req,res);


};