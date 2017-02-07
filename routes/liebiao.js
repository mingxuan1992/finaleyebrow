/**
 * New node file
 */
var mongoURL = "mongodb://localhost:27017/eyebrow";
var mongo = require("./mongo");
var ObjectId = require('mongodb').ObjectId;
exports.postliebiao = function(req, res) {
	console.log(req.body);
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('liebiao');
		var json_responses;
		coll.save({
			oneitem : req.body
		}, function(err, status) {
			if (status) {
				console.log("save oneitem success");
				json_responses = {
					"status" : "success"
				};
				res.send(json_responses);
			} else {
				console.log("save oneitem returned false");
				json_responses = {
					"status" : "failed"
				};
				res.send(json_responses);
			}
		});
	});
};

exports.getallliebiaobycategory = function(req, res) {
	console.log(req.body);
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('liebiao');
		var json_responses;
		coll.find({
			'oneitem.category' : req.body.category
		}).toArray(function(err, doc) {
			if (doc) {
				console.log(doc);
				console.log("find liebiaobycategory success!");
				res.send({
					liebiao : doc
				});

			} else {
				console.log("find returned false");

			}
		});
	});
};

exports.deleteliebiaobyid = function(req, res) {
	console.log(req.body.oneitemid);
	var oneitem = req.body.oneitemid;
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('liebiao');
		var json_responses;
		coll.findOne({
			_id : new ObjectId(oneitem)
		}, function(err, doc) {
			console.log(doc);
			if (doc) {
				coll.remove({
					_id : new ObjectId(oneitem)
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

exports.updateliebiaobyid = function(req, res) {
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('liebiao');
		coll.update({
			_id : new ObjectId(req.body.oneitemid)
		}, {
			$set : {
				'oneitem.weight' : req.body.weight,
				'oneitem.title' : req.body.title,
				'oneitem.description' : req.body.description,
				'oneitem.imageid' : req.body.imageid
			}
		}, function(err, doc) {
	
			if (doc) {
				console.log("update succes");
				res.send({
					status : "update success"
				});
			} else {
				console.log("update failed");
				res.send({
					status : "update failed"
				});
			}

		});
	});
};