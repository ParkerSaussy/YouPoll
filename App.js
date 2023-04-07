import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Feed from './components/feed';
import CreatePoll from './components/createPoll/createPoll';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Feed} />
        <Stack.Screen name="Create" component={CreatePoll} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Avenir-Roman',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
  },
});
