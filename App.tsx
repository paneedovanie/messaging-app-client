import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { UserContextProvider } from './components/UserContext';
import { AppLayout } from './components/AppLayout';
import { NotificationContextProvider } from './components/NotificationContext';

const queryClient = new QueryClient();

export default function App() {
	return (
		<NavigationContainer>
			<QueryClientProvider client={queryClient}>
				<UserContextProvider>
					<NotificationContextProvider>
						<AppLayout />
					</NotificationContextProvider>
				</UserContextProvider>
			</QueryClientProvider>
		</NavigationContainer>
	);
}
