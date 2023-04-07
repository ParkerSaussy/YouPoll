import { Pressable, StyleSheet, View } from "react-native";

import { MyText } from "../utils/utils";

export default function PollAnswer(props) {
    let getWidth = () => {
        let value = 100*(props.votes/props.total);
        if (value == 0) value = 1;
        return `${value}%`
    }

    return (
        <Pressable style={styles.widget} onPress={props.onPress}>
            <MyText content={props.option} />
            <View 
                style={[styles.voteBar, {
                    width: getWidth()
                }]} 
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    widget: {
        height: 50,
        padding: 2,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        marginBottom: 2
    },
    voteBar: {
        backgroundColor: '#86cefa',
        height: 22,
    }
});