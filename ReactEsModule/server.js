const fs = require('fs');
const { transformSync } = require('esbuild');
const path = require('path');
const { modulePathRewrite } = require('./utils');

process.env.NODE_ENV = 'development'

const Koa = require('koa');
const app = new Koa();

const context = path.resolve(__dirname);

app.use(async ctx => {
	const req = ctx.request;
	const res = ctx.response;
	
	// if node_modules
	if (req.url.startsWith('/__module__')) {
		const moduleName = req.url.replace(/\/__module__\//, '');
		const modulePath = `${context}/node_modules/${moduleName}`;
		
		const pkg = fs.readFileSync(`${modulePath}/package.json`).toString();
		const pkgJSON = JSON.parse(pkg);
		const entry = pkgJSON['main'];

		if (entry) {
			const entryPath = path.resolve(modulePath, entry);
			// node_modules 的模块可以加缓存lru处理复用问题
			const js = fs.readFileSync(`${entryPath}`).toString();
			// 按常理来说，node_modules的文件内容是不允许被路径替换的
			// 这里只是为了声明这个样例，因为React还未提供ESM的引用接口
			// 所以暂时用的第三方的ESM支持，引用处有点问题，需要重写路径，只是临时方案
			const content = modulePathRewrite(js);
			res.type = 'js'
			res.body = content;
			res.status = 200;
		} else {
			res.status = 404;
		}
		
		return;
	}
	// if .js
	if (req.url.endsWith('.js')) {
		const js = fs.readFileSync(`.${req.url}`).toString();
		const content = modulePathRewrite(js);
		res.type = 'js'
		res.body = content;
	} else if (req.url.endsWith('jsx')) {
		const jsx = fs.readFileSync(`.${req.url}`).toString();
		const { js } = transformSync(jsx, { loader: 'jsx' })
		const content = modulePathRewrite(js);
		res.type = 'js'
		res.body = content;
	} else {
		res.type = 'html'
		const buffer = fs.readFileSync("./index.html");
		res.body = buffer;
	}
	res.status = 200;
});

app.listen(5555, () => {
	console.log("server is running on port 5555");
	console.log(``);
	console.log("http://127.0.0.1:5555");
});
