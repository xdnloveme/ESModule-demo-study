const path = require('path');
const { modulePathRewrite } = require('./utils');

// export
exports.context = path.resolve(__dirname, '../');

const middleware = require('./middleware');

process.env.NODE_ENV = 'development'

const Koa = require('koa');
const app = new Koa();

app.use(middleware())

app.use(async(ctx) => {
	const res = ctx.response;

	const payload = ctx.state.payload;

	let content = payload.content;
	if (payload.type === 'js') {
		// 重写路径
		content = modulePathRewrite(content);
	}

	res.status = payload.statusCode;
	res.body = content;
	res.type = payload.type;
})

app.listen(5555, () => {
	console.log("server is running on port 5555");
	console.log(``);
	console.log("http://127.0.0.1:5555");
});

// export
exports.app = app;