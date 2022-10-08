import { View } from 'react-native';
import { styles } from '../constants/theme';
import * as Yup from 'yup';
import { useUserContext } from '../components/UserContext';
import { useFormik } from 'formik';
import { Button, Text, TextInput, TextVariant } from '../components';
import { useLogin } from '../lib/user/hooks/useLogin';
import { useChangePassword } from '../lib/user/hooks';

const ChangePasswordFormSchema = Yup.object()
	.shape({
		currentPassword: Yup.string().required(),
		password: Yup.string().required(),
		confirmPassword: Yup.string()
			.required()
			.oneOf([Yup.ref('password')], 'Your passwords do not match.'),
	})
	.required();

export const ChangePasswordScreen = ({ navigation }) => {
	const { setUser } = useUserContext();
	const { mutate, error } = useChangePassword({
		onSuccess: (user) => {
			setUser(user);
		},
	});
	const { values, errors, handleChange, handleSubmit } = useFormik({
		validationSchema: ChangePasswordFormSchema,
		initialValues: ChangePasswordFormSchema.cast(),
		onSubmit: ({ confirmPassword, ...values }) => {
			mutate(values);
		},
		validateOnChange: false,
	});

	return (
		<View style={styles.container}>
			{error && <Text variant={TextVariant.Error}>{error.message}</Text>}
			<TextInput
				placeholder='Current password'
				secureTextEntry={true}
				container={{ style: { marginBottom: 16 } }}
				onChangeText={handleChange('currentPassword')}
				value={values.currentPassword}
				error={errors?.currentPassword?.toString()}
			/>
			<TextInput
				placeholder='Password'
				secureTextEntry={true}
				container={{ style: { marginBottom: 16 } }}
				onChangeText={handleChange('password')}
				value={values.password}
				error={errors?.password?.toString()}
			/>
			<TextInput
				placeholder='Confirm password'
				secureTextEntry={true}
				container={{ style: { marginBottom: 16 } }}
				onChangeText={handleChange('confirmPassword')}
				value={values.confirmPassword}
				error={errors?.confirmPassword?.toString()}
			/>
			<Button onPress={() => handleSubmit()}>Change password</Button>
		</View>
	);
};
