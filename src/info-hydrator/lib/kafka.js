const { Kafka } = require('kafkajs')

export const kafka = new Kafka({
	brokers: [ process.env.CORE_RAPIDS_URL ],
	clientId: 'info-hydrator',
});
