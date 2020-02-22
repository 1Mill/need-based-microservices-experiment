const http = require('http').createServer();
const io = require('socket.io')(http);

const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'client-pool', port: 6379 }));

const { Kafka } = require('kafkajs');
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
		console.log('Respond: ', res);
	} catch (err) {
		console.error(err);
	}
}

io.on('connect', (socket) => {
	console.log('User connected');

	socket.on('testing', async () => {
		run();
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

http.listen(process.env.PORT, () => {
	console.log(`listening on *:${process.env.PORT}`);
})
