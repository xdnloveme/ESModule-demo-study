const resolveJs = require('./resolveJs')
const resolveJSX = require('./resolveJSX');
const resolveModules = require('./resolveModules');
const fs = require('fs');
const path = require('path');
const { context } = require('../app');

function Payload (statusCode, content = '', type = 'js') {
	this.statusCode = statusCode;
	this.content = content;
	this.type = type;
}

module.exports = function () {
	return async (ctx, next) => {
		const req = ctx.request;
		const res = ctx.response;

		if (req.url.startsWith('/__module__')) {
			const content = resolveModules(req);

			if (content === false) {
				ctx.state.payload = new Payload(404);
			} else {
				ctx.state.payload = new Payload(200, content);
			}

			return await next(2);
		}

		if (req.url.endsWith('.js')) {
			const content = resolveJs(req);
			ctx.state.payload = new Payload(200, content);

			return await next();
		}

		if (req.url.endsWith('.jsx')) {
			const content = resolveJSX(req);
			ctx.state.payload = new Payload(200, content);

			return await next();
		}

		const buffer = fs.readFileSync(path.resolve(context, './index.html'));
		ctx.state.payload = new Payload(200, buffer, 'html');

		await next();
	}
}