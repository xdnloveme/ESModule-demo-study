const fs = require('fs');

module.exports = function () {
	const buffer = fs.readFileSync("../../index.html");
	return buffer;
}