const { Kafka } = require('kafkajs')

const kafka = new Kafka({
	brokers: [ process.env.CORE_RAPIDS_URL ],
	clientId: 'info-hydrator',
});

module.exports = { kafka };
