import { Color, styles } from '../constants/theme';
import {
	Avatar,
	Button,
	Text,
	TextVariant,
	useSocketContext,
	ButtonVariant,
} from '../components';
import { useUserContext } from '../components/UserContext';
import { View } from 'react-native';

export const SettingsScreen = ({ navigation }) => {
	const { user, clear } = useUserContext();
	const { socket } = useSocketContext();

	return (
		<View style={styles.container}>
			<View
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
				}}
			>
				<View
					style={{
						flex: 1,
					}}
				>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: Color.White,
							padding: 16,
							borderRadius: 8,
						}}
					>
						<View
							style={{
								alignItems: 'center',
							}}
						>
							<Avatar
								title={user?.name.charAt(0) || 'U'}
								backgroundColor={user?.color}
								size={128}
							/>
						</View>
						<Text variant={TextVariant.H1}>{user?.name}</Text>
						<Text variant={TextVariant.Description}>@{user?.username}</Text>
						<View
							style={{
								width: '100%',
								flexDirection: 'row',
								marginTop: 32,
							}}
						>
							<Button
								variant={ButtonVariant.Outlined}
								style={{ flex: 1, margin: 4 }}
								onPress={() => {
									navigation.navigate('UpdateUser');
								}}
							>
								Update
							</Button>
							<Button
								variant={ButtonVariant.Outlined}
								style={{ flex: 1, margin: 4 }}
								onPress={() => {
									navigation.navigate('ChangePassword');
								}}
							>
								Change password
							</Button>
						</View>
					</View>
				</View>
				<Button
					variant={ButtonVariant.Logout}
					onPress={() => {
						socket.close();
						clear();
					}}
				>
					Logout
				</Button>
			</View>
		</View>
	);
};
