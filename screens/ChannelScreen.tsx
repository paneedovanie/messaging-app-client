import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Color, styles } from '../constants/theme';
import {
	Button,
	Text,
	TextInput,
	TextVariant,
	ButtonVariant,
	useSocketContext,
	Avatar,
	Badge,
} from '../components';
import { useUserContext } from '../components/UserContext';
import { SocketEvent } from '../lib/user/types/enums';
import { User } from '../lib/user/types';
import { Message } from '../lib/message';
import { useGetChannelMessages } from '../lib/channel/hooks/useGetChannelMessages';
import { useSubmitMessage } from '../lib/message/hooks/useSubmitMessage';
import { formatDistance } from 'date-fns';

const ChannelMessage = ({
	currentUser,
	message: { user, content, createdAt },
	options = {
		showUser: true,
	},
}: {
	currentUser: User;
	message: Message;
	options?: {
		showUser?: boolean;
	};
}) => {
	const isCurrentUser = user?.id === currentUser.id;
	const [showInfo, setShowInfo] = useState(false);

	return (
		<View style={{ marginBottom: 8 }}>
			{!isCurrentUser && options.showUser && (
				<View
					style={{
						marginBottom: 4,
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<View style={{ marginRight: 6 }}>
						<Badge color={user?.online?.active ? Color.Green : undefined}>
							<Avatar title={user?.name?.charAt(0)} size={24} />
						</Badge>
					</View>
					<Text variant={TextVariant.H5}>{user?.name}</Text>
				</View>
			)}

			<View
				style={{
					paddingLeft: isCurrentUser ? '30%' : 0,
					paddingRight: !isCurrentUser ? '30%' : 0,
				}}
			>
				<Pressable onPress={() => setShowInfo(!showInfo)}>
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
						}}
					>
						<View
							style={{
								backgroundColor: isCurrentUser ? Color.Primary : Color.White,
								paddingVertical: 8,
								paddingHorizontal: 16,
								borderRadius: 24,
								maxWidth: '100%',
							}}
						>
							<Text variant={isCurrentUser && TextVariant.White}>
								{content}
							</Text>
						</View>
					</View>
				</Pressable>
				{showInfo && (
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
							paddingHorizontal: 8,
						}}
					>
						<Text variant={TextVariant.Caption}>
							{formatDistance(new Date(createdAt), new Date())}
						</Text>
					</View>
				)}
			</View>
		</View>
	);
};

let lastChatUserId = undefined;

const SubmitMessageSchema = Yup.object()
	.shape({
		message: Yup.string().required().trim(),
	})
	.required();

export const ChannelScreen = ({ navigation, route: { params } }) => {
	const scrollRef = useRef<any>();
	const { user: currentUser } = useUserContext();
	const { data: channel, refetch } = useGetChannelMessages(params.channelId);
	const { socket } = useSocketContext();
	const { mutate: submit, isLoading } = useSubmitMessage({
		onSuccess: () => resetForm(),
	});

	useEffect(() => {
		const otherUser = channel?.users?.find(({ id }) => id !== currentUser.id);
		navigation.setParams({
			title: params.title,
			active: otherUser?.online?.active,
		});
	}, [channel]);

	const { values, errors, handleChange, submitForm, resetForm } = useFormik({
		validationSchema: SubmitMessageSchema,
		initialValues: SubmitMessageSchema.cast(),
		onSubmit: (values) => {
			submit({
				channel: params.channelId,
				user: currentUser.id,
				content: values.message,
			});
		},
	});

	useEffect(() => {
		socket.on(SocketEvent.ChannelUpdated, ({ channelId }) => {
			if (channelId !== params.channelId) return;
			refetch();
		});
	}, []);

	useEffect(() => {
		if (!scrollRef?.current) return;

		setTimeout(() => {
			scrollRef.current.scrollToEnd({ animated: false });
		}, 100);
	}, [channel]);

	return (
		<View style={styles.container}>
			<View style={{ display: 'flex', height: '100%' }}>
				<ScrollView ref={scrollRef} style={{ flex: 1 }}>
					{channel?.messages?.map((message, i) => {
						const showUser =
							lastChatUserId !== message.user.id || !lastChatUserId;
						lastChatUserId = message.user.id;
						return (
							<ChannelMessage
								currentUser={currentUser}
								message={message}
								key={i}
								options={{ showUser: showUser || i === 0 }}
							/>
						);
					})}
				</ScrollView>
				<View style={{ flexDirection: 'row', marginTop: 8 }}>
					<View style={{ flex: 1, marginRight: 8 }}>
						<TextInput
							placeholder='Message here...'
							value={values.message}
							onChangeText={handleChange('message')}
							error={errors?.message?.toString()}
							editable={!isLoading}
						/>
					</View>
					<View>
						<Button
							variant={ButtonVariant.Default}
							onPress={submitForm}
							disabled={isLoading}
						>
							Submit
						</Button>
					</View>
				</View>
			</View>
		</View>
	);
};
