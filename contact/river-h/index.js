
const { Kafka } = require('kafkajs');

const CLIENT_ID = GROUP_ID = 'contact-river-h';
const TOPICS = ['contact.address'];

const kafka = {
	rapids:  new Kafka({ brokers: [process.env.CORE_RAPIDS_URL],   clientId: CLIENT_ID }),
	results: new Kafka({ brokers: [process.env.CORE_RESULTS_URL],  clientId: CLIENT_ID }),
	river:   new Kafka({ brokers: [process.env.CONTACT_RIVER_URL], clientId: CLIENT_ID }),
};

const main = async () => {
	try {
		// const consumer = kafka.rapids.consumer({ groupId: GROUP_ID });
		// await consumer.connect();
		// TOPICS.forEach(async (topic) => {
		// 	await consumer.subscribe({
		// 		fromBeginning: true,
		// 		topic,
		// 	});
		// });
		// await consumer.run({
		// 	eachMessage: async ({ topic, _partition, _message}) => {
		// 		const content = `${topic} was requested`;
		// 		console.log(content);
		// 	},
		// });

		const producer = kafka.river.producer();
		await producer.connect();
		console.log('connected');
		producer.disconnect();

		// await Object.keys(kafka).forEach(async key => {
		// 	console.log(key);
		// 	const p = kafka[key].producer();
		// 	await p.connect();
		// 	console.log('connected');
		// 	await p.disconnect();
		// });

	} catch(err) {
		console.error(err);
	}
};

main();
