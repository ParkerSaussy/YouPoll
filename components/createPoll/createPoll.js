import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { MyText } from '../utils/utils';

import PollForm from './pollForm';

export default function CreatePoll() {
    return (
        <View style={styles.page}>
            <MyText content={'Create New Poll:'} classNames={[styles.pageHeader]} />
            <PollForm />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        padding: '10px',
        backgroundColor: 'white',
        height: '100%'
    },
    pageHeader: {
        fontSize: '16pt',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});