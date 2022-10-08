import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { get } from '../../../plugin/axios';
import { User } from '../types';

const path = '/users/profile';

export const getProfile = async () => get(path);

export const useGetProfile = (options?: UseQueryOptions<User, AxiosError>) =>
	useQuery<User>([path], getProfile, { staleTime: Infinity, ...options });
