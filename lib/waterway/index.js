const { Kafka } = require('kafkajs');

const kafkaWaterway = ({ id, url }) => {
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
};


export const STREAM_TYPE_KAFKA = 'kafka';
export const STREAM_TYPE_RABBITMQ = 'rabbitmq';

export const waterway = ({ id, type, url }) => {
	if (type === STREAM_TYPE_KAFKA) { return kafkaWaterway({ id, url }); }
	if (type === STREAM_TYPE_RABBITMQ) { return 'TODO'; }
};
