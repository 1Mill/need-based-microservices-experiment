const ioMiddlewareWildcard = require('socketio-wildcard')();
const ioRedisAdapter = require('socket.io-redis');
const server = require('http').createServer();
const { Kafka } = require('kafkajs');

const io = require('socket.io')(server);

io.adapter(ioRedisAdapter({
	host: process.env.PRODUCT_REDIS_HOST,
	port: process.env.PRODUCT_REDIS_PORT,
}));
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
				messages: [
					{
						header: { contentType: 'application/cloudevents+json;charset=UTF-8' },
						value: JSON.stringify({
							data: {},
							datacontenttype: 'application/json',
							id: `${socket.id}`,
							source: '/', // TODO: Get route from client
							specversion: '1.0',
							time: new Date().toISOString(),
							type: `com.product.${topic}`,
						}),
					},
				],
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
