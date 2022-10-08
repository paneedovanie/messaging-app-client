import {
	StyleProp,
	Text as BaseText,
	TextProps as BaseTextProps,
	TextStyle,
} from 'react-native';
import { Color, Font } from '../constants/theme';

export enum TextVariant {
	Default = 'default',
	AppTitle = 'app-title',
	AppDescription = 'app-description',
	Error = 'error',
	Description = 'description',
	Caption = 'caption',
	White = 'white',
	H1 = 'h1',
	H4 = 'h4',
	H5 = 'h5',
}

type Variant = StyleProp<TextStyle>;

const baseVariant: Variant = {
	fontSize: Font.Size.Regular,
};

const VariantStyle: Record<TextVariant, Variant> = {
	[TextVariant.Default]: baseVariant,
	[TextVariant.AppTitle]: {
		fontSize: Font.Size.XLarge,
		fontWeight: Font.Weight.Bold,
		color: Color.Primary,
	},
	[TextVariant.AppDescription]: {
		...baseVariant,
		color: Color.Grey,
	},
	[TextVariant.Description]: {
		...baseVariant,
		color: Color.Grey,
	},
	[TextVariant.Error]: {
		...baseVariant,
		color: Color.Red,
		fontSize: Font.Size.Small,
		padding: 4,
	},
	[TextVariant.Caption]: {
		fontSize: Font.Size.Small,
		color: Color.Black,
	},
	[TextVariant.H1]: {
		fontSize: Font.Size.XLarge,
		fontWeight: Font.Weight.Bold,
		color: Color.Black,
	},
	[TextVariant.H4]: {
		fontSize: Font.Size.Large,
		fontWeight: Font.Weight.Bold,
		color: Color.Black,
	},
	[TextVariant.H5]: {
		fontWeight: Font.Weight.Bold,
		color: Color.Black,
	},
	[TextVariant.White]: {
		color: Color.White,
	},
};

export type TextProps = BaseTextProps & { variant?: TextVariant };

export const Text = ({
	variant = TextVariant.Default,
	children,
	...rest
}: TextProps) => {
	const style = VariantStyle[variant];
	return (
		<BaseText {...rest} style={[style, rest.style]}>
			{children}
		</BaseText>
	);
};
