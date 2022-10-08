import { usePlatform } from '../lib/utils';

export const SvgImage = (props: {
	alt?: string;
	src: any;
	height?: number | string;
	width?: number | string;
	fill?: string;
}) => {
	const { isWeb } = usePlatform();
	const webSrc = props.src.toString();
	return isWeb ? <img src={webSrc} {...props} /> : <props.src {...props} />;
};
