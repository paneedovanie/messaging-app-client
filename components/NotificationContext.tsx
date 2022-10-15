import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Platform } from 'react-native';
import { useUserContext } from './UserContext';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import { usePushToken } from '../lib/user/hooks/usePushToken';
import * as TaskManager from 'expo-task-manager';
import * as Updates from 'expo-updates';
import { Subscription } from 'expo-modules-core';
import { useNavigation } from '@react-navigation/native';

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

if (Platform.OS === 'android') {
	TaskManager.defineTask(
		BACKGROUND_NOTIFICATION_TASK,
		({ data, error, executionInfo }) => {
			Notifications.setNotificationHandler({
				handleNotification: async () => ({
					shouldShowAlert: true,
					shouldPlaySound: true,
					shouldSetBadge: true,
				}),
			});
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
}

const registerForPushNotificationsAsync = async () => {
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
};

export const NotificationContext = createContext({});

export const NotificationContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const isWeb = Platform.OS === 'web';
	const { user } = useUserContext();
	const { mutate } = usePushToken();
	const [notification, setNotification] =
		useState<Notifications.Notification>();
	const notificationListener = useRef<Subscription>();
	const responseListener = useRef<Subscription>();
	const navigation = useNavigation();

	const getPushToken = async () => {
		if (isWeb) return;
		let token = await SecureStore.getItemAsync('pushToken');
		if (!token) {
			token = await registerForPushNotificationsAsync();
			if (!isWeb) await SecureStore.setItemAsync('pushToken', token);
			// await Updates.reloadAsync();
		}
		mutate({ token });
	};

	useEffect(() => {
		if (!user) return;

		getPushToken();

		// // This listener is fired whenever a notification is received while the app is foregrounded
		// notificationListener.current =
		// 	Notifications.addNotificationReceivedListener((notification) => {
		// 		setNotification(notification);
		// 	});

		// // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		// responseListener.current =
		// 	Notifications.addNotificationResponseReceivedListener((response) => {
		// 		const {
		// 			notification: {
		// 				request: { content },
		// 			},
		// 		} = response;
		// 		const { screen, channelId, title } = content.data;
		// 		//when the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen
		// 		if (screen) {
		// 			navigation.navigate(
		// 				screen as never,
		// 				{
		// 					channelId: channelId,
		// 					title: title,
		// 				} as never
		// 			);
		// 		}
		// 	});

		// return () => {
		// 	Notifications.removeNotificationSubscription(
		// 		notificationListener.current
		// 	);
		// 	Notifications.removeNotificationSubscription(responseListener.current);
		// };
	}, [user]);

	return (
		<NotificationContext.Provider value={{}}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotificationContext = () => useContext(NotificationContext);
