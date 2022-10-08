import { Message } from '../../message';
import { User } from '../../user/types/entities/User';

export type Channel = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
	users: User[];
	messages?: Message[];
};
