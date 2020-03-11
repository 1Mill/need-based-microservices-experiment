const { kafka } = require('../lib/kafka');

const subscribe = async (stringArray) => {
	try {
		const consumer = kafka.consumer({ groupId: 'info-hydrator' });
		await consumer.connect();
		stringArray.forEach(async (string) => {
			await consumer.subscribe({ topic: string });
		});
		await consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				const content = `Request for ${topic} from ${message.headers.socketId}`;
				console.log(content);
			},
		});
	} catch (err) {
		console.error(err);
	}
};

module.exports = { subscribe };
