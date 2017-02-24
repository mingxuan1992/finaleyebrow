exports.getlevel3page = function(req, res) {
	console.log(req.params.thisid);
	res.render('level3page', {thisid:req.params.thisid});
};