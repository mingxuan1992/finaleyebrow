/**
 * New node file
 */

exports.getaboutpage = function(req, res) {
	res.render('about', {});
};
exports.getresumepage = function(req, res) {
	res.render('resume', {});
};