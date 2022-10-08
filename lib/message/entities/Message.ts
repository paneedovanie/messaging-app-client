import { Channel } from '../../channel/entities/Channel';
import { User } from '../../user/types/entities/User';

export type Message = {
	id: string;
	createdAt: Date;
	channel: Channel;
	user: User;
	content: string;
	unread?: number;
};
