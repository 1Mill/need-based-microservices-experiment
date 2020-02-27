const { create } = require('./create');
const { subscribe } = require('./subscribe');

const TOPICS = [
	'testing',
];

create(TOPICS);
subscribe(TOPICS);
