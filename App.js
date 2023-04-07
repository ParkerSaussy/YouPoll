import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import Feed from './components/feed';
import CreatePoll from './components/createPoll/createPoll';

// Mainly defining these for development so I don't accidentally delete them somewhere
const primaryColor = '#4503CD';
const secondaryColor = '#E2D5FE';

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
