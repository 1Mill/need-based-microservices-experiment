const { create } = require('./create');
const { subscribe } = require('./subscribe');

const TOPICS = [
	'info.address',
	'info.phone-number',
];

create(TOPICS);
subscribe(TOPICS);
