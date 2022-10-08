import { View } from 'react-native';
import { useFormik } from 'formik';
import { styles } from '../constants/theme';
import * as Yup from 'yup';
import { Button, Text, TextInput, TextVariant } from '../components';
import { useRegister } from '../lib/user/hooks';
import { useUserContext } from '../components/UserContext';

const RegisterFormSchema = Yup.object()
	.shape({
		name: Yup.string().required(),
		username: Yup.string().required(),
		password: Yup.string().required(),
	})
	.required();

export const RegisterScreen = ({ navigation }) => {
	const { setUser, setAccessToken } = useUserContext();
	const { mutate, error } = useRegister({
		onSuccess: ({ user, accessToken }) => {
			setUser(user);
			setAccessToken(accessToken);
		},
	});
	const { values, errors, handleChange, handleSubmit } = useFormik({
		validationSchema: RegisterFormSchema,
		initialValues: RegisterFormSchema.cast(),
		onSubmit: (values) => {
			mutate(values);
		},
		validateOnChange: false,
	});

	return (
		<View style={styles.container}>
			{error && <Text variant={TextVariant.Error}>{error.message}</Text>}
			<TextInput
				placeholder='Name'
				container={{ style: { marginBottom: 16 } }}
				onChangeText={handleChange('name')}
				value={values.name}
				error={errors?.name?.toString()}
			/>
			<TextInput
				placeholder='Username'
				container={{ style: { marginBottom: 16 } }}
				onChangeText={handleChange('username')}
				value={values.username}
				error={errors?.username?.toString()}
			/>
			<TextInput
				placeholder='Password'
				secureTextEntry={true}
				container={{ style: { marginBottom: 16 } }}
				onChangeText={handleChange('password')}
				value={values.password}
				error={errors?.password?.toString()}
			/>
			<Button onPress={() => handleSubmit()}>Register</Button>
		</View>
	);
};
