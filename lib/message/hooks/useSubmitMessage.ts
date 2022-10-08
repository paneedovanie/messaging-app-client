import { useMutation, UseMutationOptions } from 'react-query';
import { Socket } from 'socket.io-client';
import { useSocketContext } from '../../../components';
import { SocketEvent } from '../../user/types/enums';
import { SubmitMessageDto } from '../dtos';
import { Message } from '../entities';

export const submitMessage = (
	socket: Socket,
	data: SubmitMessageDto
): Promise<Message> =>
	new Promise((res) => {
		socket.emit(SocketEvent.SubmitMessage, data, res);
	});

export const useSubmitMessage = (
	options?: UseMutationOptions<Message, undefined, SubmitMessageDto>
) => {
	const { socket } = useSocketContext();
	return useMutation<Message, undefined, SubmitMessageDto>(
		[SocketEvent.SubmitMessage],
		(data: SubmitMessageDto) => submitMessage(socket, data),
		options
	);
};
