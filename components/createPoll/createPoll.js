import { StyleSheet, SafeAreaView, View } from 'react-native';

import { MyText } from '../utils/utils';

import PollForm from './pollForm';

export default function CreatePoll() {
    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.content}> 
                <MyText content={'Create New Poll:'} classNames={[styles.pageHeader]} />
                <PollForm />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        height: '100%'
    },
    content: {
        padding: 20
    },
    pageHeader: {
        fontSize: 24,
        backgroundColor: '#003396',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});