const { kafka } = require('../lib/kafka');

const subscribe = async (stringArray) => {
	try {
		const consumer = kafka.consumer({ groupId: 'info-hydrator' });
		await consumer.connect();
		stringArray.forEach(async (string) => {
			await consumer.subscribe({
				fromBeginning: true,
				topic: string,
			});
		});
		await consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				console.log(message);
			},
		});
	} catch (err) {
		console.error(err);
	}
};

module.exports = { subscribe };
