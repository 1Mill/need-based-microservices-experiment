
const { Kafka } = require('kafkajs');

const CLIENT_ID = GROUP_ID = 'contact-river-h';
const TOPICS = ['contact.address'];

const generateKafka = ({ url }) => {
	return new Kafka({ brokers: [url], clientId: CLIENT_ID });
}

const isEnriched = ({ message }) => {
	const { data } = JSON.parse(message.value);
	return !!Object.keys(data).includes('enrichment');
};

const publish = async ({ event }) => {
	try {
		const url = isEnriched({ message: event.message }) ? process.env.CORE_RESULTS_URL : process.env.CONTACT_RIVER_URL;
		const producer = generateKafka({ url }).producer();
		await producer.connect();
		await producer.send({
			messages: [event.message],
			topic: event.topic,
		});
		producer.disconnect();
	} catch (err) {
		console.error(err);
	}
}

const subscribe = async ({ onEvent, topics, url }) => {
	const consumer = generateKafka({ url }).consumer({ groupId: GROUP_ID });
	await consumer.connect();
	topics.forEach(topic => {
		consumer.subscribe({ fromBeginning: true, topic });
	});
	consumer.run({ eachMessage: (event) => onEvent({ event }) });
};

const main = async () => {
	try {
		subscribe({
			onEvent: ({ event }) => {
				console.log(`${event.topic} is enriched ${isEnriched({ message: event.message })}`);
				publish({ event });
			},
			topics: TOPICS,
			url: process.env.CORE_RAPIDS_URL,
		});
	} catch(err) {
		console.error(err);
	}
};

main();
