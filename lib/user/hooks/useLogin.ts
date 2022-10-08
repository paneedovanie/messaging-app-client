import { post } from '../../../plugin/axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { Auth, LoginDto } from '../types';
import { AxiosError } from 'axios';

const path = '/users/login';

export const login = async (params: LoginDto) => post(path, params);

export const useLogin = (
	options?: UseMutationOptions<Auth, AxiosError, LoginDto>
) => useMutation<Auth, AxiosError, LoginDto>(login, options);
