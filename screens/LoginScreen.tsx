import { View } from 'react-native';
import { styles } from '../constants/theme';
import * as Yup from 'yup';
import { useUserContext } from '../components/UserContext';
import { useFormik } from 'formik';
import { Button, Text, TextInput, TextVariant } from '../components';
import { useLogin } from '../lib/user/hooks/useLogin';

const LoginFormSchema = Yup.object()
	.shape({
		username: Yup.string().required(),
		password: Yup.string().required(),
	})
	.required();

export const LoginScreen = ({ navigation }) => {
	const { setUser, setAccessToken } = useUserContext();
	const { mutate, error } = useLogin({
		onSuccess: ({ user, accessToken }) => {
			setUser(user);
			setAccessToken(accessToken);
		},
	});
	const { values, errors, handleChange, handleSubmit } = useFormik({
		validationSchema: LoginFormSchema,
		initialValues: LoginFormSchema.cast(),
		onSubmit: (values) => {
			mutate(values);
		},
		validateOnChange: false,
	});

	return (
		<View style={styles.container}>
			{error && <Text variant={TextVariant.Error}>{error.message}</Text>}
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
			<Button onPress={() => handleSubmit()}>Login</Button>
		</View>
	);
};
