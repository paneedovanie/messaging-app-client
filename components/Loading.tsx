import { View } from 'react-native';
import { Text, TextVariant } from './Text';

export const Loading = () => (
	<View
		style={{
			height: '100%',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
		}}
	>
		<Text variant={TextVariant.H4}>Loading...</Text>
	</View>
);
