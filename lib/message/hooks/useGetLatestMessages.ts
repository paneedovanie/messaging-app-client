import { useQuery, UseQueryOptions } from 'react-query';
import { Socket } from 'socket.io-client';
import { useSocketContext } from '../../../components';
import { SocketEvent } from '../../user/types/enums';
import { Message } from '../entities';

export const getLatestMessages = (
	socket: Socket,
	id: string
): Promise<Message[]> =>
	new Promise((res) => {
		socket.emit(SocketEvent.GetLatestMessages, id, res);
	});

export const useGetLatestMessages = (
	id: string,
	options?: UseQueryOptions<Message[]>
) => {
	const { socket } = useSocketContext();
	return useQuery<Message[]>(
		[SocketEvent.GetLatestMessages, id],
		() => getLatestMessages(socket, id),
		options
	);
};
