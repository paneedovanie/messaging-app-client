import { post } from '../../../plugin/axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';
import { PushTokenDto } from '../types/dtos/push-token.dto';

const path = '/users/push-token';

export const pushToken = async (params: PushTokenDto) => post(path, params);

export const usePushToken = (
	options?: UseMutationOptions<void, AxiosError, PushTokenDto>
) => useMutation<void, AxiosError, PushTokenDto>(pushToken, options);
