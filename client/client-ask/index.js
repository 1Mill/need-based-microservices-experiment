const ioMiddlewareWildcard = require('socketio-wildcard')();
const ioRedisAdapter = require('socket.io-redis');
const server = require('http').createServer();
const { Kafka } = require('kafkajs');

const io = require('socket.io')(server);

io.adapter(ioRedisAdapter({ host: 'client-pool', port: 6379 }));
io.use(ioMiddlewareWildcard);

const kafka = new Kafka({
	brokers: [process.env.CORE_RAPIDS_URL],
	clientId: 'client-ask',
});
const producer = kafka.producer();

io.on('connect', (socket) => {
	socket.on('*', async (packet) => {
		try {
			const [ topic ] = packet.data;
			await producer.connect();
			await producer.send({
				messages: [{ headers: { socketId: socket.id }, value: null }],
				topic,
			});
			await producer.disconnect();
		} catch (err) {
			console.error(err);
		}
	});
});

server.listen(process.env.PORT, () => {
	console.log(`listening on *:${process.env.PORT}`);
})
