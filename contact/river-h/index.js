
const { Kafka } = require('kafkajs');

const CLIENT_ID = 'contract-river-h';

const rapidsKafka = new Kafka({
	brokers: [process.env.CORE_RAPIDS_URL],
	clientId: CLIENT_ID,
});

const riverKafka =  new Kafka({
	brokers: [process.env.RIVER_RIVER_URL],
	clientId: CLIENT_ID,
});
