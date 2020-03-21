const axios = require('axios');
const {
	WATERWAY_TYPE_KAFKA,
	waterway,
} = require('@1mill/waterway');

const CLIENT_ID = GROUP_ID = 'contact-address-h';
const TOPICS = ['contact.address'];

const main = async () => {
	try {
		waterway({
			id: CLIENT_ID,
			type: WATERWAY_TYPE_KAFKA,
			url: process.env.CONTACT_RIVER_URL,
		}).subscribe({
			onEvent: ({ event }) => {
				const url = `http://${process.env.CONTACT_ADDRESS_URL}/`;
				axios.get(url).then(async res => console.log(res.data));
			},
			topics: TOPICS,
		});
	} catch (err) {
		console.error(err);
	}

	// const consumer = kafka.river.consumer({ groupId: GROUP_ID });
	// await consumer.connect();
	// console.log('connected');

	// TOPICS.forEach(async (topic) => {
	// 	await consumer.subscribe({
	// 		fromBeginning: true,
	// 		topic,
	// 	});
	// });

	// await consumer.run({
	// 	eachMessage: async ({ topic, _partition, message }) => {
	// 		const url = `http://${process.env.CONTACT_ADDRESS_URL}/`;
	// 		axios.get(url)
	// 		.then(async (res) => {
	// 			const producer = kafka.rapids.producer();
	// 			await producer.connect();
	// 			await producer.send({
	// 				messages: [
	// 					{
	// 						headers: message.headers,
	// 						value: JSON.stringify({
	// 							...JSON.parse(message.value),
	// 							data: {
	// 								...JSON.parse(message.value).data,
	// 								enrichment: 'my-enrichment-response',
	// 							},
	// 						}),
	// 					},
	// 				],
	// 				topic,
	// 			});
	// 			await producer.disconnect();

	// 			console.log(message);
	// 			console.log(res.data);
	// 		})
	// 		.catch(err => console.error(err));
	// 	},
	// });
};

main();
