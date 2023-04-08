import { Pressable, StyleSheet, View } from "react-native";

import { MyText } from "../utils/utils";

export default function PollAnswer(props) {
    // Rather than alter the actual stored votecount, just iterate by 1 if this option is selected
    let getVoteCount = () => {
        return props.selected ? props.votes+1 : props.votes
    }

    let getWidth = () => {
        if (props.total == 0) return 1

        let value = 100*(getVoteCount()/props.total);
        if (value == 0) value = 1;
        return `${value}%`
    }

    let getWidgetStyling = () => {
        return props.selected ? styles.selected:styles.unselected
    }

    let getVoteBarStyling = () => {
        return props.selected ? styles.voteBarSelected:styles.voteBarUnselected
    }

    let getVoteShare = () => {
        if (props.total == 0) return 0

        let share = (100*(getVoteCount()/props.total)).toFixed(1)
        print(share)
        return share
    }

    return (
        <Pressable style={[styles.widget, getWidgetStyling()]} onPress={props.onPress}>
            <MyText content={props.option} classNames={[styles.font]} />
            <View 
                style={[getVoteBarStyling(), styles.voteBar, {
                    width: getWidth()
                }]} 
            />
            <MyText content={`${getVoteShare()}%`} classNames={[styles.voteShare]} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    widget: {
        height: 55,
        padding: 5,
        borderColor: '#000',
        borderRadius: 8,
        marginBottom: 2
    },
    unselected: {
        borderWidth: StyleSheet.hairlineWidth,
    },
    selected: {
        borderWidth: 3,
    },
    voteBar: {
        borderRadius: 4,
        height: 20,
    },
    voteBarUnselected: {
        backgroundColor: '#86cefa',
    },
    voteBarSelected: {
        backgroundColor: '#003396',
    },
    font: {
        fontSize: 16,
    },
    voteShare: {
        position: "absolute",
        fontSize: 16,
        right: 5,
        top: 5,
    }
});