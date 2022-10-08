import { ReactNode } from 'react';
import {
	Pressable,
	PressableProps,
	StyleProp,
	Text,
	TextProps,
	TextStyle,
	ViewStyle,
} from 'react-native';
import { Color, Font } from '../constants/theme';

export enum ButtonVariant {
	Default = 'default',
	Secondary = 'secondary',
	Icon = 'icon',
	Logout = 'logout',
	Outlined = 'outlined',
}

type Variant = { container: StyleProp<ViewStyle>; text: StyleProp<TextStyle> };

const baseVariant: Variant = {
	container: {
		backgroundColor: Color.Primary,
		paddingHorizontal: 16,
		borderRadius: 4,
		height: 36,
		justifyContent: 'center',
	},
	text: {
		color: Color.White,
		fontSize: Font.Size.Small,
		textAlign: 'center',
	},
};

const VariantStyle: Record<ButtonVariant, Variant> = {
	[ButtonVariant.Default]: baseVariant,
	[ButtonVariant.Secondary]: {
		container: [baseVariant.container, { backgroundColor: Color.White }],
		text: [baseVariant.text, { color: Color.Primary }],
	},
	[ButtonVariant.Logout]: {
		container: [
			baseVariant.container,
			{
				backgroundColor: 'unset',
				borderColor: Color.Red,
				borderWidth: 1,
			},
		],
		text: [baseVariant.text, { color: Color.Red }],
	},
	[ButtonVariant.Outlined]: {
		container: [
			baseVariant.container,
			{
				backgroundColor: Color.White,
				borderColor: Color.Primary,
				borderWidth: 1,
			},
		],
		text: [baseVariant.text, { color: Color.Primary }],
	},
	[ButtonVariant.Icon]: {
		container: [baseVariant.container, { backgroundColor: 'unset' }],
		text: [baseVariant.text, { color: Color.Primary }],
	},
};

export type ButtonProps = PressableProps & {
	children: ReactNode;
	variant?: ButtonVariant;
	text?: TextProps;
};

export const Button = ({
	children,
	variant = ButtonVariant.Default,
	text,
	style,
	...container
}: ButtonProps) => {
	const styles = VariantStyle[variant];
	return (
		<Pressable
			{...container}
			style={[styles.container, style as StyleProp<ViewStyle>]}
		>
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	);
};
