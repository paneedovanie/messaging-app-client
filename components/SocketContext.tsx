import { createContext, ReactNode, useContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { app } from '../constants';

export const SocketContext = createContext<{ socket?: Socket }>({});

export const SocketContextProvider = ({
	children,
	userId,
}: {
	children: ReactNode;
	userId: string;
}) => {
	const [socket] = useState(io(app.socketUrl, { query: { userId } }));

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};

export const useSocketContext = () => useContext(SocketContext);
