const http = require('http').createServer();
const io = require('socket.io')(http);

const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'client-pool', port: 6379 }));
io().socket.on('testing', () => {
	console.log('TESTING WAS RECIEVED');
});
