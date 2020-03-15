// const axios = require('axios');
const { Kafka } = require('kafkajs');

const CLIENT_ID = GROUP_ID = 'contact-address-h';
const TOPICS = ['contact.address'];

const kafka = {
	rapids: new Kafka({ brokers: [process.env.CORE_RAPIDS_URL], clientId: CLIENT_ID }),
	river: new Kafka({ brokers: [process.env.CONTACT_RIVER_URL], clientId: CLIENT_ID }),
};

const main = async () => {
	const consumer = kafka.rapids.consumer({ groupId: GROUP_ID });
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
			const content = `${topic} was requested`;
			console.log(content);
		},
	});
};

main();

// const url = `http://${process.env.CONTACT_ADDRESS_URL}/`;
// setInterval(() => {
// 	axios.get(url)
// 	.then(res => console.log(res.data))
// 	.catch(err => console.log(err));
// }, 1000);
