
const { Kafka } = require('kafkajs');

const CLIENT_ID = 'contact-river-h';

const rapidsKafka = new Kafka({
	brokers: [process.env.CORE_RAPIDS_URL],
	clientId: CLIENT_ID,
});

const riverKafka =  new Kafka({
	brokers: [process.env.CONTACT_RIVER_URL],
	clientId: CLIENT_ID,
});

const resultsKafka = new Kafka({
	brokers: [process.env.CORE_RESULTS_URL],
	clientId: CLIENT_ID,
});
