import { View } from 'react-native';
import { styles } from '../constants/theme';
import * as Yup from 'yup';
import { useUserContext } from '../components/UserContext';
import { useFormik } from 'formik';
import { Avatar, Button, Text, TextInput, TextVariant } from '../components';
import { useUpdateUser } from '../lib/user/hooks/useUpdateUser';

const UpdateUserFormSchema = Yup.object()
	.shape({
		name: Yup.string().required(),
		color: Yup.string().required(),
	})
	.required();

export const UpdateUserScreen = ({ navigation }) => {
	const { user, setUser } = useUserContext();
	const { mutate, error } = useUpdateUser({
		onSuccess: (user) => {
			setUser(user);
		},
	});
	const { values, errors, handleChange, handleSubmit } = useFormik({
		validationSchema: UpdateUserFormSchema,
		initialValues: {
			name: user.name,
			color: user.color,
		},
		onSubmit: (values) => {
			mutate(values);
		},
		validateOnChange: false,
	});

	return (
		<View style={styles.container}>
			{error && <Text variant={TextVariant.Error}>{error.message}</Text>}
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					paddingVertical: 32,
				}}
			>
				<Avatar
					title={values.name.charAt(0) || 'U'}
					backgroundColor={values.color}
					size={128}
				/>
			</View>
			<TextInput
				placeholder='Name'
				container={{ style: { marginBottom: 16 } }}
				onChangeText={handleChange('name')}
				value={values.name}
				error={errors?.name?.toString()}
			/>
			<TextInput
				placeholder='Color'
				container={{ style: { marginBottom: 16 } }}
				onChangeText={handleChange('color')}
				value={values.color}
				error={errors?.color?.toString()}
			/>
			<Button onPress={() => handleSubmit()}>Update</Button>
		</View>
	);
};
