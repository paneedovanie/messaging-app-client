import { post } from '../../../plugin/axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { Auth, RegisterDto } from '../types';
import { AxiosError } from 'axios';

const path = '/users/register';

export const register = async (params: RegisterDto) => post(path, params);

export const useRegister = (
	options?: UseMutationOptions<Auth, AxiosError, RegisterDto>
) => useMutation<Auth, AxiosError, RegisterDto>(register, options);
