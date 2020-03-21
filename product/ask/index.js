const ioMiddlewareWildcard = require('socketio-wildcard')();
const ioRedisAdapter = require('socket.io-redis');
const server = require('http').createServer();
const { WATERWAY_TYPE_KAFKA, waterway } = require('@1mill/waterway');

const io = require('socket.io')(server);
io.adapter(ioRedisAdapter({
	host: process.env.PRODUCT_REDIS_HOST,
	port: process.env.PRODUCT_REDIS_PORT,
}));
io.use(ioMiddlewareWildcard);

const ID = 'product-ask';

io.on('connect', (socket) => {
	socket.on('*', async (packet) => {
		try {
			const [ topic ] = packet.data;
			const event = {
				message: {
					headers: { contentType: 'application/cloudevents+json;charset=UTF-8' },
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
				topic,
			};
			waterway({
				id: ID,
				type: WATERWAY_TYPE_KAFKA,
				url: process.env.CORE_RAPIDS_URL,
			}).publish({ event });
		} catch (err) {
			console.error(err);
		}
	});
});

server.listen(process.env.PORT, () => {
	console.log(`listening on *:${process.env.PORT}`);
})
