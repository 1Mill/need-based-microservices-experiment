import io from 'socket.io-client';
const SOCKET = io(process.env.CLIENT_EVENTS_ASK_URL);

export const Answer = async (event) => {
	try {
		// TODO: Listen for events and return a payload.
	} catch (err) {
		console.error(err);
	};
};

export const Ask = async (event) => {
	try {
		await SOCKET.emit(event);
	} catch (err) {
		console.error(err);
	}
};

