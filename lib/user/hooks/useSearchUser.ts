import { useQuery, UseQueryOptions } from 'react-query';
import { useSocketContext } from '../../../components';
import { User } from '../types';
import { SocketEvent } from '../types/enums';

export const searchUser = async (socket, username: string): Promise<User> =>
	new Promise((res) => {
		socket.emit(SocketEvent.SearchUser, username, res);
	});

export const useSearchUser = (
	username: string,
	options?: UseQueryOptions<User>
) => {
	const { socket } = useSocketContext();
	return useQuery<User>(
		[SocketEvent.SearchUser, username],
		() => searchUser(socket, username),
		{
			enabled: !!username,
			...options,
		}
	);
};
