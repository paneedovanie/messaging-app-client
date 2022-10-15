import { useQuery, UseQueryOptions } from 'react-query';
import { Socket } from 'socket.io-client';
import { useSocketContext } from '../../../components';
import { SocketEvent } from '../../user/types/enums';
import { Channel } from '../entities';

export const getChannelMessages = (
	socket: Socket,
	id: string
): Promise<Channel> => {
	return new Promise((res) => {
		socket.emit(SocketEvent.GetChannelMessages, id, res);
	});
};

export const useGetChannelMessages = (
	id: string,
	options?: UseQueryOptions<Channel>
) => {
	const { socket } = useSocketContext();
	return useQuery<Channel>(
		[SocketEvent.GetChannelMessages, id],
		() => getChannelMessages(socket, id),
		options
	);
};
