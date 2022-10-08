import { Online } from './Online';

export type User = {
	id: string;
	name: string;
	username: string;
	color?: string;
	online?: Online;
};
