import { View } from 'react-native';
import { Color, styles } from '../constants/theme';
import * as Yup from 'yup';
import { useUserContext } from '../components/UserContext';
import { useFormik } from 'formik';
import {
	Button,
	ButtonVariant,
	Text,
	TextInput,
	TextVariant,
} from '../components';
import { useSearchUser } from '../lib/user/hooks/useSearchUser';
import { useState } from 'react';
import { useCreateChannel } from '../lib/channel';
import { getMessageTitle } from '../lib/utils/main.util';
import { SvgImage } from '../components/SvgImage';
import SearchImage from '../assets/search.svg';
import EmptyImage from '../assets/empty.svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchFormSchema = Yup.object()
	.shape({
		username: Yup.string().required(),
	})
	.required();

export const SearchScreen = ({ navigation }) => {
	const { user: currentUser } = useUserContext();
	const [username, setUsername] = useState();
	const { data } = useSearchUser(username);
	const [unSearched, setUnSearch] = useState(true);
	const { values, errors, handleChange, submitForm } = useFormik({
		validationSchema: SearchFormSchema,
		initialValues: SearchFormSchema.cast(),
		onSubmit: (values) => {
			setUsername(values.username);
			setUnSearch(false);
		},
		validateOnChange: true,
	});
	const { mutate: create } = useCreateChannel({
		onSuccess: (channel) => {
			const channelTitle = getMessageTitle(currentUser, channel.users);
			navigation.navigate('Channel', {
				title: channelTitle,
				channelId: channel.id,
			});
		},
	});

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', marginTop: 8 }}>
				<View style={{ flex: 1 }}>
					<TextInput
						placeholder='Search username here...'
						value={values.username}
						onChangeText={handleChange('username')}
						error={errors?.username?.toString()}
					/>
				</View>
				<View>
					<Button variant={ButtonVariant.Icon} onPress={submitForm}>
						<FontAwesomeIcon
							icon={faMagnifyingGlass}
							style={{ color: Color.Primary, height: '100%' }}
						/>
					</Button>
				</View>
			</View>
			<View style={{ flex: 1 }}>
				{unSearched ? (
					<View
						style={{
							padding: 24,
							alignItems: 'center',
						}}
					>
						<View style={{ width: '70%', marginBottom: 16 }}>
							<SvgImage
								src={SearchImage}
								width={'100%'}
								height={150}
								alt='search'
							/>
						</View>
						<Text variant={TextVariant.Description}>Search user</Text>
					</View>
				) : data ? (
					<View
						style={{
							backgroundColor: Color.White,
							padding: 12,
							marginTop: 24,
							borderRadius: 8,
						}}
					>
						<View style={{ alignItems: 'center', marginBottom: 24 }}>
							<Text variant={TextVariant.H4}>{data.name}</Text>
							<Text variant={TextVariant.Description}>@{data.username}</Text>
						</View>
						<Button
							onPress={() => {
								create([currentUser.id, data.id]);
							}}
						>
							Message
						</Button>
					</View>
				) : (
					<View
						style={{
							padding: 24,
							alignItems: 'center',
						}}
					>
						<View style={{ width: '70%', marginBottom: 24 }}>
							<SvgImage
								src={EmptyImage}
								width={'100%'}
								height={150}
								alt='search'
							/>
						</View>
						<Text variant={TextVariant.Description}>No user</Text>
					</View>
				)}
			</View>
		</View>
	);
};
