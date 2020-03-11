const http = require('http');

const ADDRESS = '1234 S. 123st St., Seattle WA 98102';

http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.write(res.url);
	res.end();
}).listen(process.env.PORT, () => {
	console.log(`listening on *:${process.env.PORT}`);
});

