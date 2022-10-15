import { useQuery, UseQueryOptions } from 'react-query';
import { Socket } from 'socket.io-client';
import { useSocketContext } from '../../../components';
import { SocketEvent } from '../../user/types/enums';
import { Message } from '../entities';

export const getLatestMessages = (socket: Socket): Promise<Message[]> =>
	new Promise((res) => {
		socket.emit(SocketEvent.GetLatestMessages, res);
	});

export const useGetLatestMessages = (options?: UseQueryOptions<Message[]>) => {
	const { socket } = useSocketContext();
	return useQuery<Message[]>(
		[SocketEvent.GetLatestMessages],
		() => getLatestMessages(socket),
		options
	);
};
