const { WATERWAY_TYPE_KAFKA, waterway } = require('@1mill/waterway');

const ID = 'contact-river-h';
const TOPICS = ['contact.address'];

const isEnriched = ({ event }) => {
	const { data } = JSON.parse(event.message.value);
	return !!Object.keys(data).includes('enrichment');
};

const main = async () => {
	try {
		waterway({
			id: ID,
			type: WATERWAY_TYPE_KAFKA,
			url: process.env.CORE_RAPIDS_URL,
		}).subscribe({
			onEvent: ({ event }) => {
				if (!isEnriched({ event })) {
					waterway({
						id: ID,
						type: WATERWAY_TYPE_KAFKA,
						url: process.env.CONTACT_RIVER_URL,
					}).publish({ event });
				}
			},
			topics: TOPICS,
		});
	} catch(err) {
		console.error(err);
	}
};

main();
