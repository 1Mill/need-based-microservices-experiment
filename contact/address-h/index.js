const axios = require('axios');
const {
	WATERWAY_TYPE_KAFKA,
	waterway,
} = require('@1mill/waterway');

const ID = 'contact-address-h';
const TOPICS = ['contact.address'];

const main = async () => {
	try {
		waterway({
			id: ID,
			type: WATERWAY_TYPE_KAFKA,
			url: process.env.CONTACT_RIVER_URL,
		}).subscribe({
			onEvent: ({ event }) => {
				const url = `http://${process.env.CONTACT_ADDRESS_URL}/`;
				axios.get(url).then(res => {
					const enrichedEvent = {
						message: {
							headers: event.message.headers,
							value: JSON.stringify({
								...JSON.parse(event.message.value),
								data: {
									...JSON.parse(event.message.value).data,
									enrichment: res.data,
								},
							}),
						},
						topic: event.topic,
					};
					waterway({
						id: ID,
						type: WATERWAY_TYPE_KAFKA,
						url: process.env.CORE_RAPIDS_URL,
					}).publish({ event: enrichedEvent });
				});
			},
			topics: TOPICS,
		});
	} catch (err) {
		console.error(err);
	}
};

main();
