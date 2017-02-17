/**
 * New node file
 */

exports.getaboutpage = function(req, res) {
	res.render('about', {});
};
exports.getresumepage = function(req, res) {
	res.render('resume', {});
};
exports.getcontactpage = function(req, res) {
	res.render('contact', {});
};