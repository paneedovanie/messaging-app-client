import { useMutation, UseMutationOptions } from 'react-query';
import { Socket } from 'socket.io-client';
import { useSocketContext } from '../../../components';
import { SocketEvent } from '../../user/types/enums';
import { Channel } from '../entities';

export const createChannel = (
	socket: Socket,
	userIds: string[]
): Promise<Channel> =>
	new Promise((res) => {
		socket.emit(SocketEvent.CreateChannel, userIds, res);
	});

export const useCreateChannel = (
	options?: UseMutationOptions<Channel, undefined, string[]>
) => {
	const { socket } = useSocketContext();
	return useMutation<Channel, undefined, string[]>(
		[SocketEvent.CreateChannel],
		(userIds: string[]) => createChannel(socket, userIds),
		options
	);
};
