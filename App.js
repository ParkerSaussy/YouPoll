import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';

import Feed from './components/feed';
import CreatePoll from './components/createPoll/createPoll';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name={"Home"} component={Feed} />
          <Stack.Screen name={"Create"} component={CreatePoll} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Avenir-Roman',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
