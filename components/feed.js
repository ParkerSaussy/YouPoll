import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MyText } from './utils/utils';

export default function Feed({ navigation }) {
    return (
        <View styles={styles.container}>        
            <MyText content={'Home'} classNames={[]} />
            <Button 
                title="Create New Poll"
                onPress={() => navigation.navigate('Create')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Avenir',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px'
    }
});