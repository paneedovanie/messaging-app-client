import {
	StyleProp,
	TextInput as BaseTextInput,
	TextInputProps as BaseTextInputProps,
	TextStyle,
	View,
	ViewProps,
	ViewStyle,
} from 'react-native';
import { Color, Font } from '../constants/theme';
import { Text, TextVariant } from './Text';

export enum TextInputVariant {
	Default = 'default',
}

type Variant = {
	container?: StyleProp<ViewStyle>;
	input?: StyleProp<TextStyle>;
};

const baseVariant: Variant = {
	input: {
		backgroundColor: Color.White,
		paddingHorizontal: 8,
		paddingVertical: 8,
		fontSize: Font.Size.Small,
		borderRadius: 4,
		height: 36,
	},
};

const VariantStyle: Record<TextInputVariant, Variant> = {
	[TextInputVariant.Default]: baseVariant,
};

export type TextInputProps = BaseTextInputProps & {
	container?: ViewProps;
	variant?: TextInputVariant;
	error?: string | string[];
};

export const TextInput = ({
	variant = TextInputVariant.Default,
	container,
	error,
	...rest
}: TextInputProps) => {
	const styles = VariantStyle[variant];
	return (
		<View style={[styles.container, container?.style]}>
			<BaseTextInput {...rest} style={[styles.input, rest.style]} />
			{error && <Text variant={TextVariant.Error}>{error}</Text>}
		</View>
	);
};
