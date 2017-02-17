/**
 * New node file
 */

exports.getlevel2page = function(req, res) {
	console.log(req.params.category);
	res.render('level2page', {category:req.params.category});
};