import { Platform } from 'react-native';

export const usePlatform = () => {
	return {
		isWeb: Platform.OS === 'web',
		isAdnroid: Platform.OS === 'android',
		isIos: Platform.OS === 'ios',
		isWindows: Platform.OS === 'windows',
		isMacos: Platform.OS === 'macos',
	};
};
