import { ReactNode } from 'react';
import { ColorValue, View } from 'react-native';
import { Color } from '../constants';

export const Badge = ({
	color = Color.Grey,
	borderWidth = 1,
	size = 8,
	children,
}: {
	color?: ColorValue;
	borderWidth?: number;
	size?: number;
	children: ReactNode;
}) => {
	return (
		<View style={{ position: 'relative' }}>
			{children}
			<View
				style={{
					position: 'absolute',
					bottom: 0,
					right: 0,
					height: size,
					width: size,
					borderRadius: size / 2,
					backgroundColor: color,
					borderWidth,
					borderColor: Color.White,
				}}
			></View>
		</View>
	);
};
