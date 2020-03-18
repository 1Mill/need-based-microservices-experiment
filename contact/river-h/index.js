
const { Kafka } = require('kafkajs');

const CLIENT_ID = GROUP_ID = 'contact-river-h';
const TOPICS = ['contact.address'];

const kafka = {
	rapids:  new Kafka({ brokers: [process.env.CORE_RAPIDS_URL],   clientId: CLIENT_ID }),
	results: new Kafka({ brokers: [process.env.CORE_RESULTS_URL],  clientId: CLIENT_ID }),
	river:   new Kafka({ brokers: [process.env.CONTACT_RIVER_URL], clientId: CLIENT_ID }),
};

const isEnriched = ({ message }) => {
	const { data } = JSON.parse(message.value);
	return !!Object.keys(data).includes('enrichment');
};

const publish = async ({ kafka, message, topic }) => {
	try {
		const producer = kafka.producer();
		await producer.connect();
		await producer.send({
			messages: [message],
			topic,
		});
		await producer.disconnect();
	} catch (err) {
		console.error(err);
	}
}

const main = async () => {
	try {
		const consumer = kafka.rapids.consumer({ groupId: GROUP_ID });
		await consumer.connect();
		console.log('connected');

		TOPICS.forEach(async (topic) => {
			await consumer.subscribe({
				fromBeginning: true,
				topic,
			});
		});

		await consumer.run({
			eachMessage: ({ topic, _partition, message }) => {
				console.log(`${topic}, enriched ${isEnriched({ message })}`);
				publish({
					kafka: isEnriched({ message }) ? kafka.results : kafka.river,
					message,
					topic,
				});
			},
		});
	} catch(err) {
		console.error(err);
	}
};

main();
