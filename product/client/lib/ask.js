import io from 'socket.io-client';

const SOCKET = io(process.env.PRODUCT_ASK_URL);

export const ask = async (event) => {
	try {
		await SOCKET.emit(event);
	} catch (err) {
		console.error(err);
	}
};
