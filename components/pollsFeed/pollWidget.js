import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { MyButton, MyText } from '../utils/utils';

export default function PollWidget(props) {
    console.log(props)
    return (
        <View style={styles.pollWidget}>
            <MyText content={props.pollQuestion} />

        </View>
    )
}

const styles = StyleSheet.create({
    pollWidget: {
        paddingBottom: 5,
        borderBottomColor: '#eaeaea',
        borderBottomWidth: 1
    }
});