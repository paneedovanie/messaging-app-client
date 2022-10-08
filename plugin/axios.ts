import baseAxios, { AxiosRequestConfig } from 'axios';
import { app } from '../constants/app';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

baseAxios.interceptors.request.use(async (config) => {
	const isWeb = Platform.OS === 'web';
	const accessToken = isWeb
		? localStorage.getItem('accessToken')
		: await SecureStore.getItemAsync('accessToken');
	if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
	config.baseURL = app.apiUrl;
	return config;
});

export const axios = baseAxios;

export const post = async (
	url: string,
	data?: any,
	config?: AxiosRequestConfig<any>
) => {
	try {
		const { data: body } = await axios.post(url, data, config);
		return body;
	} catch ({ response }) {
		throw response?.data;
	}
};

export const patch = async (
	url: string,
	data?: any,
	config?: AxiosRequestConfig<any>
) => {
	try {
		const { data: body } = await axios.patch(url, data, config);
		return body;
	} catch ({ response }) {
		throw response?.data;
	}
};

export const get = async (url: string, config?: AxiosRequestConfig<any>) => {
	try {
		const { data: body } = await axios.get(url, config);
		return body;
	} catch ({ response }) {
		throw response?.data;
	}
};
