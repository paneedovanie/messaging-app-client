import { View } from 'react-native';
import { Button, ButtonVariant, Text, TextVariant } from '../components';
import { styles } from '../constants/theme';
import MessagingImage from '../assets/messaging.svg';
import { SvgImage } from '../components/SvgImage';

export const PublicScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={{ display: 'flex', height: '100%' }}>
				<View style={{ flex: 1 }}>
					<SvgImage
						src={MessagingImage}
						alt='messaging'
						width={'100%'}
						height={320}
					/>
					<Text variant={TextVariant.AppTitle}>EdHi</Text>
					<Text variant={TextVariant.AppDescription}>Messaging App</Text>
				</View>
				<Button
					onPress={() => {
						navigation.navigate('Login');
					}}
					style={{ marginBottom: 8 }}
				>
					Login
				</Button>
				<Button
					variant={ButtonVariant.Secondary}
					onPress={() => {
						navigation.navigate('Register');
					}}
				>
					Register
				</Button>
			</View>
		</View>
	);
};
