const axios = require('axios');
// const { Kafka } = require('kafkajs');

// const CLIENT_ID = 'contract-river-h';

// const rapidsKafka = new Kafka({
// 	brokers: [process.env.CORE_RAPIDS_URL],
// 	clientId: CLIENT_ID,
// });

// const riverKafka =  new Kafka({
// 	brokers: [process.env.CONTACT_RIVER_URL],
// 	clientId: CLIENT_ID,
// });

const url = `http://${process.env.CONTACT_ADDRESS_URL}/`;
setInterval(() => {
	axios.get(url)
	.then(res => console.log(res.data))
	.catch(err => console.log(err));
}, 1000);
