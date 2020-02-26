const server = require('http').createServer();
const { Kafka } = require('kafkajs');
const ioMiddlewareWildcard = require('socketio-wildcard')();
const ioRedisAdapter = require('socket.io-redis');

const io = require('socket.io')(server);
io.adapter(ioRedisAdapter({ host: 'client-pool', port: 6379 }));
io.use(ioMiddlewareWildcard);

const run = async () => {
	try {
		const kafka = new Kafka({
			brokers: [ 'core_rapids:29092' ],
			clientId: 'client-pub',
		});
		const producer = kafka.producer();
		await producer.connect();
		const res = await producer.send({
			topic: 'db.todo.created',
			messages: [ { value: 'something' } ],
		});
	} catch (err) {
		console.error(err);
	}
}

io.on('connect', (socket) => {
	socket.on('*', async () => {
		console.log('ANY EVENT');
	});

	socket.on('testing', async () => {
		run();
	});
});

server.listen(process.env.PORT, () => {
	console.log(`listening on *:${process.env.PORT}`);
})
