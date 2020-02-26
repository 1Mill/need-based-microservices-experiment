const server = require('http').createServer();
const { Kafka } = require('kafkajs');
const ioMiddlewareWildcard = require('socketio-wildcard')();
const ioRedisAdapter = require('socket.io-redis');

const io = require('socket.io')(server);
io.adapter(ioRedisAdapter({ host: 'client-pool', port: 6379 }));
io.use(ioMiddlewareWildcard);

const KAFKA = new Kafka({
	brokers: ['core_rapids:29092'],
	clientId: 'client-pub',
});
const PRODUCER = KAFKA.producer();

io.on('connect', (socket) => {
	socket.on('*', async (packet) => {
		try {
			const [ topic ] = packet.data;
			await PRODUCER.connect();
			await PRODUCER.send({
				messages: [{ value: 'something' }],
				topic,
			});
			await PRODUCER.disconnect();
		} catch (err) {
			console.error(err);
		}
	});
});

server.listen(process.env.PORT, () => {
	console.log(`listening on *:${process.env.PORT}`);
})
