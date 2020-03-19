
const { Kafka } = require('kafkajs');

const CLIENT_ID = GROUP_ID = 'contact-river-h';
const TOPICS = ['contact.address'];

const STREAM_TYPE_KAFKA = 'kafka';
const STREAM_TYPE_RABBITMQ = 'rabbitmq';

const isEnriched = ({ event }) => {
	const { data } = JSON.parse(event.message.value);
	return !!Object.keys(data).includes('enrichment');
};

const stream = ({ id, type, url }) => {
	if (type === STREAM_TYPE_KAFKA) {
		const kafka = new Kafka({ brokers: [url], clientId: id });
		return {
			publish: async ({ event }) => {
				const producer = kafka.producer();
				await producer.connect();
				await producer.send({
					messages: [event.message],
					topic: event.topic,
				});
				producer.disconnect();
			},
			subscribe: async ({ onEvent, topics }) => {
				const consumer = kafka.consumer({ groupId: id });
				await consumer.connect();
				topics.forEach(topic => {
					consumer.subscribe({ fromBeginning: true, topic });
				});
				consumer.run({ eachMessage: (event) => onEvent({ event }) });
			},
		};
	}
	if (type === STREAM_TYPE_RABBITMQ) {
		return '...';
	}
};

const main = async () => {
	try {
		stream({
			id: CLIENT_ID,
			type: STREAM_TYPE_KAFKA,
			url: process.env.CORE_RAPIDS_URL,
		}).subscribe({
			onEvent: ({ event }) => {
				console.log(`${event.topic} is enriched ${isEnriched({ event })}`);
				// stream({
				// 	id: CLIENT_ID,
				// 	type: STREAM_TYPE_KAFKA,
				// 	url: isEnriched({ event }) ? process.env.CORE_RESULTS_URL : process.env.CONTACT_RIVER_URL,
				// }).publish({ event });
			},
			topics: TOPICS,
		});
	} catch(err) {
		console.error(err);
	}
};

main();
