import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
	ChangePasswordScreen,
	ChannelScreen,
	LoginScreen,
	MessagesScreen,
	PublicScreen,
	RegisterScreen,
	SearchScreen,
	SettingsScreen,
} from '../screens';
import { Loading } from './Loading';
import { SocketContextProvider } from './SocketContext';
import { useUserContext } from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faMagnifyingGlass,
	faMessage,
	faGear,
} from '@fortawesome/free-solid-svg-icons';
import { Color } from '../constants';
import { Avatar } from './Avatar';
import { View } from 'react-native';
import { Text } from './Text';
import { Badge } from './Badge';
import { UpdateUserScreen } from '../screens/UpdateUserScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = () => (
	<Tab.Navigator
		screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color, size }) => {
				let icon;

				if (route.name === 'Messages') {
					icon = faMessage;
				} else if (route.name === 'Search') {
					icon = faMagnifyingGlass;
				} else if (route.name === 'Settings') {
					icon = faGear;
				}

				// You can return any component that you like here!
				return (
					<FontAwesomeIcon
						icon={icon}
						style={{ color: focused ? Color.Primary : Color.Grey }}
					/>
				);
			},
			tabBarActiveTintColor: Color.Primary,
			tabBarInactiveTintColor: Color.Grey,
		})}
	>
		<Tab.Screen name='Messages' component={MessagesScreen} />
		<Tab.Screen name='Search' component={SearchScreen} />
		<Tab.Screen name='Settings' component={SettingsScreen} />
	</Tab.Navigator>
);

export const AppLayout = () => {
	const { user } = useUserContext();
	const [updating, setUpdating] = useState(false);
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		setUpdating(true);
		setTimeout(() => {
			setIsAuth(!!user);
			setUpdating(false);
		}, 500);
	}, [user]);

	if (updating) return <Loading />;

	if (isAuth && user) {
		return (
			<SocketContextProvider userId={user.id || ''}>
				<Stack.Navigator>
					<Stack.Screen
						name='Home'
						component={HomeTab}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='Channel'
						component={ChannelScreen}
						options={({ route: { params } }: { route: any }) => ({
							headerTitle: () => (
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View style={{ marginRight: 8 }}>
										<Badge
											size={9}
											borderWidth={1}
											color={params.active ? Color.Green : undefined}
										>
											<Avatar title={params.title.charAt(0)} size={32} />
										</Badge>
									</View>
									<Text>{params.title}</Text>
								</View>
							),
						})}
					/>
					<Stack.Screen name='UpdateUser' component={UpdateUserScreen} />
					<Stack.Screen
						name='ChangePassword'
						component={ChangePasswordScreen}
					/>
				</Stack.Navigator>
			</SocketContextProvider>
		);
	}

	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Public'
				component={PublicScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='Register' component={RegisterScreen} />
			<Stack.Screen
				name='Home'
				component={HomeTab}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};
