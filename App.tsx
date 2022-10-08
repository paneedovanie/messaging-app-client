import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { UserContextProvider } from './components/UserContext';
import { AppLayout } from './components/AppLayout';

const queryClient = new QueryClient();

export default function App() {
	return (
		<NavigationContainer>
			<QueryClientProvider client={queryClient}>
				<UserContextProvider>
					<AppLayout />
				</UserContextProvider>
			</QueryClientProvider>
		</NavigationContainer>
	);
}
