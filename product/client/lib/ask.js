import io from 'socket.io-client';
import { answer } from '@/lib/answer';

const SOCKET = io(process.env.PRODUCT_ASK_URL);

export const ask = async (event) => {
	try {
		await SOCKET.emit(event);

		const res = await answer(event);
		return res;
	} catch (err) {
		console.error(err);
	}
};
