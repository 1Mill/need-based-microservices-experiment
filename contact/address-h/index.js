const axios = require('axios');
const { Kafka } = require('kafkajs');

const CLIENT_ID = GROUP_ID = 'contact-address-h';
const TOPICS = ['contact.address'];

const kafka = {
	rapids: new Kafka({ brokers: [process.env.CORE_RAPIDS_URL], clientId: CLIENT_ID }),
	river: new Kafka({ brokers: [process.env.CONTACT_RIVER_URL], clientId: CLIENT_ID }),
};

const main = async () => {
	const consumer = kafka.river.consumer({ groupId: GROUP_ID });
	await consumer.connect();
	console.log('connected');

	TOPICS.forEach(async (topic) => {
		await consumer.subscribe({
			fromBeginning: true,
			topic,
		});
	});

	await consumer.run({
		eachMessage: async ({ topic, _partition, message }) => {
			const url = `http://${process.env.CONTACT_ADDRESS_URL}/`;
			axios.get(url)
			.then(async (res) => {
				const producer = kafka.rapids.producer();
				await producer.connect();
				await producer.send({
					messages: [
						{
							headers: message.headers,
							value: message.value,
						},
					],
					topic,
				});
				await producer.disconnect();

				console.log(message);
				console.log(res.data);
			})
			.catch(err => console.error(err));
		},
	});
};

main();
