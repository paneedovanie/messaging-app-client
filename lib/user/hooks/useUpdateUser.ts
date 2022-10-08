import { patch } from '../../../plugin/axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { UpdateUserDto, User } from '../types';
import { AxiosError } from 'axios';

const path = '/users/update';

export const updateUser = async (params: UpdateUserDto) => patch(path, params);

export const useUpdateUser = (
	options?: UseMutationOptions<User, AxiosError, UpdateUserDto>
) => useMutation<User, AxiosError, UpdateUserDto>(updateUser, options);
