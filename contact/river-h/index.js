
const { Kafka } = require('kafkajs');

const CLIENT_ID = GROUP_ID = 'contact-river-h';
const TOPICS = ['contact.address'];

const TO_CORE_RAPIDS = 'core.rapids';
const TO_CORE_RESULTS = 'core.results';
const TO_RIVER = 'river';

const CORE_RAPIDS_KAFKA = new Kafka({ brokers: [process.env.CORE_RAPIDS_URL], clientId: CLIENT_ID });
const CORE_RESULTS_KAFKA = new Kafka({ brokers: [process.env.CORE_RESULTS_URL], clientId: CLIENT_ID });
const RIVER_KAFKA = new Kafka({ brokers: [process.env.CONTACT_RIVER_URL], clientId: CLIENT_ID });

const isEnriched = ({ event }) => {
	const { data } = JSON.parse(event.message.value);
	return !!Object.keys(data).includes('enrichment');
};

const kafka = ({ to }) => {
	if (to === TO_CORE_RAPIDS) { return CORE_RAPIDS_KAFKA; }
	if (to === TO_CORE_RESULTS) { return CORE_RESULTS_KAFKA; }
	if (to === TO_RIVER) { return RIVER_KAFKA; }
};

const publish = async ({ event, to }) => {
	try {
		const producer = kafka({ to }).producer();
		await producer.connect();
		await producer.send({
			messages: [event.message],
			topic: event.topic,
		});
		producer.disconnect();
	} catch (err) {
		console.error(err);
	}
};

const subscribe = async ({ onEvent, to, topics }) => {
	const consumer = kafka({ to }).consumer({ groupId: GROUP_ID });
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
				console.log(`${event.topic} is enriched ${isEnriched({ event })}`);
				publish({
					event,
					to: isEnriched({ event }) ? TO_CORE_RESULTS : TO_RIVER,
				});
			},
			to: TO_CORE_RAPIDS,
			topics: TOPICS,
		});
	} catch(err) {
		console.error(err);
	}
};

main();
