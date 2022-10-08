import { ColorValue, View } from 'react-native';
import { Color } from '../constants';
import { Text } from './Text';

export const Avatar = ({
	title,
	size = 50,
	color = Color.White,
	backgroundColor = Color.Grey,
}: {
	title: string;
	size?: number;
	color?: ColorValue;
	backgroundColor?: ColorValue;
}) => {
	return (
		<View
			style={{
				borderRadius: size / 2,
				backgroundColor,
				justifyContent: 'center',
				alignItems: 'center',
				width: size,
				height: size,
			}}
		>
			<Text style={{ color, fontSize: size / 2 }}>{title}</Text>
		</View>
	);
};
