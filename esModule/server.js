const http = require('http');
const fs = require('fs');

const app = function (req, res) {
	console.log(req.url);

	// if .js
	if (req.url.endsWith('.js')) {
		const s = fs.readFileSync(`.${req.url}`).toString();
		res.writeHead(200, { "Content-Type": "application/javascript" });
		res.write(s);
	} else {
		res.writeHead(200, { "Content-Type": "text/html" });
		const buffer = fs.readFileSync("./index.html");
		res.write(buffer);
	}
	
	res.end();
}

http.createServer(app).listen(5555, () => {
	console.log("server is running on port 5555");
	console.log(``);
	console.log("http://127.0.0.1:5555");
});