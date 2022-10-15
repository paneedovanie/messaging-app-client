import {
	createContext,
	Dispatch,
	ReactNode,
	useContext,
	useState,
	SetStateAction,
	useEffect,
} from 'react';
import { User } from '../lib/user/types';
import * as SecureStore from 'expo-secure-store';
import { useGetProfile } from '../lib/user/hooks';
import { Platform } from 'react-native';

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

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
	const isWeb = Platform.OS === 'web';
	const [user, setUser] = useState<User>();
	const [token, setToken] = useState<string>();

	const { isFetching } = useGetProfile({
		onSuccess: (user) => {
			setUser(user);
		},
		enabled: !!token,
	});

	const setAccessToken = async (token: string) => {
		if (isWeb) localStorage.setItem('accessToken', token);
		else await SecureStore.setItemAsync('accessToken', token);
	};

	const clear = async () => {
		setUser(undefined);
		if (isWeb) localStorage.removeItem('accessToken');
		else {
			await SecureStore.deleteItemAsync('accessToken');
			await SecureStore.deleteItemAsync('pushToken');
		}
	};

	const getToken = async () => {
		const accessToken = isWeb
			? localStorage.getItem('accessToken')
			: await SecureStore.getItemAsync('accessToken');
		if (!accessToken) return;
		setToken(accessToken);
	};

	useEffect(() => {
		getToken();
	});

	if (isFetching) return <></>;

	return (
		<UserContext.Provider value={{ user, setUser, setAccessToken, clear }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
