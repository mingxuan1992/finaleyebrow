exports.gethoutaipage = function(req, res) {
	res.render('houtai', {});
};
exports.gethoutaiuploadimagepage = function(req, res) {
	res.render('houtaiuploadimage', {});
};
exports.gethoutaicheckimagepage = function(req, res) {
	res.render('houtaicheckimage', {});
};
exports.gethoutaiuploadxiangmupage = function(req, res) {
	res.render('houtaiuploadxiangmu', {});
};
exports.gethoutaicheckliebiao = function(req, res) {
	res.render('houtaicheckliebiao', {});
};

var mongoURL = "mongodb://mingxuanhan:liumiaomiao@128.199.200.212:27017/eyebrow";
var mongo = require("./mongo");
var ObjectId = require('mongodb').ObjectId;

exports.renewindexpage = function(req, res) {

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		mongo.collection('liebiao').find({
			'oneitem.category' : "zhuye"
		}).toArray(function(err, doc) {
			if (doc) {
				console.log("find liebiaobycategory success!");
				console.log(doc.length);
				if (doc.length === 8) {
					mongo.collection('index').update({
						_id : new ObjectId("58b13f4452fc745d87a614ca")
					}, {
						$set : {
							"zhuye" : doc
						}
					}, function(doc) {
					});
				}
			} else {
				console.log("find returned false");
			}
		});

		mongo.collection('liebiao').find({
			'oneitem.category' : "xiangmu"
		}).toArray(function(err, doc) {
			if (doc) {
				console.log("find liebiaobycategory success!");
				console.log(doc.length);
				if (doc.length > 2) {
					mongo.collection('index').update({
						_id : new ObjectId("58b13f4452fc745d87a614ca")
					}, {
						$set : {
							"xiangmu" : doc.slice(0, 3)
						}
					}, function(doc) {
					});
				}
			} else {
				console.log("find returned false");
			}
		});

		mongo.collection('liebiao').find({
			'oneitem.category' : "kecheng"
		}).toArray(function(err, doc) {
			if (doc) {
				console.log("find liebiaobycategory success!");
				console.log(doc.length);
				if (doc.length > 2) {
					mongo.collection('index').update({
						_id : new ObjectId("58b13f4452fc745d87a614ca")
					}, {
						$set : {
							"kecheng" : doc.slice(0, 3)
						}
					}, function(doc) {
					});
				}
			} else {
				console.log("find returned false");
			}
		});

		mongo.collection('liebiao').find({
			'oneitem.category' : "zuopin"
		}).toArray(function(err, doc) {
			if (doc) {
				console.log("find liebiaobycategory success!");
				console.log(doc.length);
				if (doc.length > 2) {
					mongo.collection('index').update({
						_id : new ObjectId("58b13f4452fc745d87a614ca")
					}, {
						$set : {
							"zuopin" : doc.slice(0, 3)
						}
					}, function(doc) {
					});
				}
			} else {
				console.log("find returned false");
			}
		});
	});

	res.send({
		status : "finished"
	});
};

exports.getindexpageitems = function(req, res) {
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('index');
		coll.find({}).toArray(function(err, doc) {
			if (doc) {
				console.log(doc);
				console.log("find indexpageitems success!");
				res.send({
					items : doc[0]
				});
			} else {
				console.log("find returned false");
			}
		});
	});
};