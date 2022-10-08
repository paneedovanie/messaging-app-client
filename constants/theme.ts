import { StyleSheet } from 'react-native';

export enum Color {
	Primary = '#165BAA',
	Black = '#000000',
	White = '#FFFFFF',
	Grey = '#888888',
	Red = '#EB1D36',
	Green = '#63A355',
}

enum FontSize {
	XLarge = 32,
	Large = 24,
	Regular = 16,
	Small = 12,
}

enum FontWeight {
	Bold = '700',
}

export const Font = {
	Size: FontSize,
	Weight: FontWeight,
};

export const styles = StyleSheet.create({
	container: {
		padding: 8,
		height: '100%',
	},
});
