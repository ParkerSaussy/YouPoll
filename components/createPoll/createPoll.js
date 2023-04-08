import { StyleSheet, SafeAreaView, View } from 'react-native';

import { MyText } from '../utils/utils';

import PollForm from './pollForm';

export default function CreatePoll() {
    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.content}> 
                <View style={styles.topSection}>
                    <MyText content={'Create New Poll:'} classNames={[styles.pageHeader]} />
                </View>
                
                <PollForm />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        
    },
    topSection: {
        width: '90%',
        padding: 10,
        backgroundColor: '#86cefa',
        borderColor: 'gray',
        borderWidth: 3,
        alignSelf: 'center'
    },
    content: {
        padding: 20
    },
    pageHeader: {
        fontSize: 30,
        fontWeight: 800,
        alignSelf: 'center',
    }
});