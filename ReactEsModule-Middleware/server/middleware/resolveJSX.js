const fs = require('fs');
const { transformSync } = require('esbuild');

module.exports = function (req) {
	const jsx = fs.readFileSync(`.${req.url}`).toString();
	const { js } = transformSync(jsx, { loader: 'jsx' });

	return js;
}