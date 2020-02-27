const { kafka } = require('../lib/kafka');

export const create = async(stringArray) => {
	try {
		const admin = kafka.admin();
		await admin.connect();
		await admin.createTopics({
			topics: stringArray.map(string => ({ topic: string }))
		});
		await admin.disconnect();
	} catch (err) {
		console.error(err);
	}
};
