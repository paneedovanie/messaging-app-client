import { post } from '../../../plugin/axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { ChangePasswordDto, User } from '../types';
import { AxiosError } from 'axios';

const path = '/users/change-password';

export const changePassword = async (params: ChangePasswordDto) =>
	post(path, params);

export const useChangePassword = (
	options?: UseMutationOptions<User, AxiosError, ChangePasswordDto>
) => useMutation<User, AxiosError, ChangePasswordDto>(changePassword, options);
