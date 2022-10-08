import { Platform } from 'react-native';

const isDevelopment = process.env.NODE_ENV || 'development';

const domain = isDevelopment
	? Platform.OS === 'web'
		? 'http://localhost:3000'
		: 'http://10.0.2.2:3000'
	: 'https://edhi-messaging-app.herokuapp.com';

export const app = {
	apiUrl: `${domain}/api`,
	socketUrl: domain,
};
