import { User } from '../user/types';

export const getMessageTitle = (user: User, users: User[]) => {
	if (users.length === 2) {
		return users.find(({ id }) => id !== user?.id)?.name || 'Unknown';
	}
};

export const getChannelAvatarColor = (user: User, users: User[]) => {
	if (users.length === 2) {
		return users.find(({ id }) => id !== user?.id)?.color;
	}
};
