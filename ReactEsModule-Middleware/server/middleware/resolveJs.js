const fs = require('fs');

module.exports = function (req) {
	return fs.readFileSync(`.${req.url}`).toString();
}