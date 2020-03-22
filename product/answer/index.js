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

const ID = 'product-answer';
const TOPICS = ['contact.address'];

try {
	waterway({
		id: ID,
		type: WATERWAY_TYPE_KAFKA,
		url: process.env.PRODUCT_RIVER_URL,
	}).subscribe({
		onEvent: ({ event }) => {
			console.log('event with results found');
		},
		topics: TOPICS,
	});
} catch(err) {
	console.error(err);
}

server.listen(process.env.PORT, () => {
	console.log(`listening on *:${process.env.PORT}`);
});
