import { StyleSheet, View, SafeAreaView } from 'react-native';
import { MyButton, MyText } from './utils/utils';

import Polls from './pollsFeed/polls';

export default function Feed({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <MyText content={'Welcome to YouPoll!'} classNames={[styles.welcome]} />
                <MyButton 
                    content={"Create New Poll"}
                    classNames={[styles.createNew]}
                    textClassnames={[styles.createNewText]}
                    callback={() => navigation.navigate('Create')}
                />
                <MyText content={'Or check out some existing polls:'} classNames={[styles.checkOut]} />
            </View>
            <View style={styles.pollsSection}>
                <Polls />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Avenir',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topSection: {
        width: '100%',
        padding: 10,
        borderBottomColor: '#E2D5FE',
        borderBottomWidth: 3,
    },
    welcome: {
        fontSize: 28,
        fontWeight: 800,
        alignSelf: 'center',
    },
    checkOut: {
        fontSize: 16,
        alignSelf: 'center',
    },
    createNew: {
        backgroundColor: '#4503CD',
        borderRadius: 8,
        alignSelf: 'center',
        margin: 10,
        padding: 10,
    },
    createNewText: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
    },
    pollsSection: {
        padding: 10
    }
    
});