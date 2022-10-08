import {
	createContext,
	Dispatch,
	ReactNode,
	useContext,
	useState,
	SetStateAction,
	useEffect,
	useRef,
} from 'react';
import { User } from '../lib/user/types';
import * as SecureStore from 'expo-secure-store';
import * as Device from 'expo-device';
import { Text } from './Text';
import { useGetProfile } from '../lib/user/hooks';
import { useSocketContext } from './SocketContext';
import { Platform } from 'react-native';
import { Loading } from './Loading';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import { usePushToken } from '../lib/user/hooks/usePushToken';
import * as TaskManager from 'expo-task-manager';
import * as Updates from 'expo-updates';

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

TaskManager.defineTask(
	BACKGROUND_NOTIFICATION_TASK,
	({ data, error, executionInfo }) => {
		console.log('Received a notification in the background!');
		// Do something with the notification data
	}
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export const UserContext = createContext<{
	user?: User;
	setUser: Dispatch<SetStateAction<User>>;
	setAccessToken: (token: string) => void;
	clear: () => void;
}>({
	setUser: () => {},
	setAccessToken: () => {},
	clear: () => {},
});

async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	// if (Device.isDevice) {
	const { status: existingStatus } = await Notifications.getPermissionsAsync();
	let finalStatus = existingStatus;
	if (existingStatus !== 'granted') {
		const { status } = await Notifications.requestPermissionsAsync();
		finalStatus = status;
	}
	if (finalStatus !== 'granted') {
		alert('Failed to get push token for push notification!');
		return;
	}
	token = (
		await Notifications.getExpoPushTokenAsync({
			experienceId: '@paneedovanie/mobile-app',
		})
	).data;
	// console.log(token);
	// } else {
	// 	alert('Must use physical device for Push Notifications');
	// }
	return token;
}

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
	const isWeb = Platform.OS === 'web';
	const [user, setUser] = useState<User>();
	const [token, setToken] = useState<string>();
	const { mutate } = usePushToken();

	const { isFetching } = useGetProfile({
		onSuccess: (user) => {
			setUser(user);
		},
		enabled: !!token,
	});

	const setAccessToken = async (token: string) => {
		if (isWeb) localStorage.setItem('accessToken', token);
		await SecureStore.setItemAsync('accessToken', token);
	};

	const storePushToken = async (token: string) => {
		if (isWeb) return;
		await SecureStore.setItemAsync('pushToken', token);
	};

	const clear = async () => {
		setUser(undefined);
		if (isWeb) localStorage.removeItem('accessToken');
		await SecureStore.deleteItemAsync('pushToken');
		await SecureStore.deleteItemAsync('accessToken');
	};

	const getToken = async () => {
		const accessToken = isWeb
			? localStorage.getItem('accessToken')
			: await SecureStore.getItemAsync('accessToken');
		if (!accessToken) return;
		setToken(accessToken);
	};

	const getPushToken = async () => {
		if (isWeb) return;
		let token = await SecureStore.getItemAsync('pushToken');
		if (!token) {
			token = await registerForPushNotificationsAsync();
			storePushToken(token);
			await Updates.reloadAsync();
		}
		mutate({ token });
		alert(token);
	};

	useEffect(() => {
		getToken();
	});

	useEffect(() => {
		if (!user) return;

		getPushToken();
	}, [user]);

	if (isFetching) return <></>;

	return (
		<UserContext.Provider value={{ user, setUser, setAccessToken, clear }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
