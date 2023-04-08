import { StyleSheet, SafeAreaView, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { MyText } from '../utils/utils';

import PollForm from './pollForm';

export default function CreatePoll() {
    return (
        <SafeAreaView>
            <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
                <View style={styles.topSection}>
                    <MyText content={'Create New Poll:'} classNames={[styles.pageHeader]} />
                </View>
                <View style={styles.content}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                        <PollForm  />
                    </TouchableWithoutFeedback>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topSection: {
        width: '90%',
        padding: 20,
        backgroundColor: '#86cefa',
        borderColor: 'gray',
        borderWidth: 3,
        alignSelf: 'center',
        marginTop: 5,
    },
    keyboardAware: {
        height: '100%',
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