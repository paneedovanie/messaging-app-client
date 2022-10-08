import { formatDistance } from 'date-fns';
import { useEffect } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import {
	Avatar,
	Badge,
	Loading,
	Text,
	TextVariant,
	useSocketContext,
	useUserContext,
} from '../components';
import { Color } from '../constants';
import { Message, useGetLatestMessages } from '../lib/message';

import { User } from '../lib/user/types';
import { SocketEvent } from '../lib/user/types/enums';
import { getChannelAvatarColor, getMessageTitle } from '../lib/utils/main.util';

export const MessagesScreen = ({ navigation }) => {
	const { user } = useUserContext();
	const { socket } = useSocketContext();
	const {
		data: messages = [],
		isFetching,
		refetch,
	} = useGetLatestMessages(user.id);

	useEffect(() => {
		socket.on(SocketEvent.ChannelUpdated, refetch);
	}, []);

	if (isFetching) return <Loading />;

	return (
		<View>
			<ScrollView>
				{messages
					.sort((a: any, b: any) => a.createdAt - b.createdAt)
					.map(({ channel, content, createdAt, unread }, i) => {
						const otherUser = channel?.users?.find(({ id }) => id !== user.id);
						const channelTitle = otherUser?.name;
						const channelColor = otherUser?.color;
						return (
							<Pressable
								onPress={() =>
									navigation.navigate('Channel', {
										channelId: channel.id,
										title: channelTitle,
									})
								}
								key={i}
							>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										backgroundColor: Color.White,
										marginBottom: 1,
										padding: 8,
										borderRadius: 4,
									}}
								>
									<View style={{ marginRight: 8 }}>
										<Badge
											size={12}
											color={
												otherUser?.online?.active ? Color.Green : undefined
											}
										>
											<Avatar
												title={channelTitle.charAt(0)}
												color={channelColor}
												size={48}
											/>
										</Badge>
									</View>
									<View
										style={{
											display: 'flex',
											flexDirection: 'column',
											flex: 1,
										}}
									>
										<Text variant={TextVariant.H5}>{channelTitle}</Text>
										<Text variant={TextVariant.Description} numberOfLines={1}>
											{content}
										</Text>
										<Text variant={TextVariant.Caption}>
											{formatDistance(new Date(createdAt), new Date())}
										</Text>
									</View>
									{!!unread && (
										<View
											style={{
												backgroundColor: Color.Red,
												borderRadius: 15,
												width: 30,
												height: 30,
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											<Text variant={TextVariant.White}>
												{unread > 99 ? '99+' : unread}
											</Text>
										</View>
									)}
								</View>
							</Pressable>
						);
					})}
			</ScrollView>
		</View>
	);
};
