const { Kafka } = require('kafkajs');

const CLIENT_ID = 'results-h';

const rapidsKafka = new Kafka({
	brokers: [process.env.CORE_RAPIDS_URL],
	clientId: CLIENT_ID,
});

const resultsKafka =  new Kafka({
	brokers: [process.env.CORE_RESULTS_URL],
	clientId: CLIENT_ID,
});
