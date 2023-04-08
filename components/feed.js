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
    },
    topSection: {
        width: '90%',
        padding: 10,
        margin: 5,
        backgroundColor: '#86cefa',
        borderColor: 'gray',
        borderWidth: 3
    },
    welcome: {
        fontSize: 30,
        fontWeight: 800,
        alignSelf: 'center',
    },
    checkOut: {
        fontSize: 18,
        alignSelf: 'center',
    },
    createNew: {
        backgroundColor: '#003396',
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
        padding: 10,
        borderTopColor: '#aeaeae',
        borderTopWidth: StyleSheet.hairlineWidth
    }
});