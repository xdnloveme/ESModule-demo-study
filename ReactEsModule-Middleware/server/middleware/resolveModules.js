const fs = require('fs');
const { context } = require('../app');
const path = require('path');

module.exports = function (req) {
	const moduleName = req.url.replace(/\/__module__\//, '');
	const modulePath = `${context}/node_modules/${moduleName}`;
	
	const pkg = fs.readFileSync(`${modulePath}/package.json`).toString();
	const pkgJSON = JSON.parse(pkg);
	const entry = pkgJSON['main'];

	if (entry) {
		const entryPath = path.resolve(modulePath, entry);
		const content = fs.readFileSync(`${entryPath}`).toString();
		return content;
	}

	return false;
}