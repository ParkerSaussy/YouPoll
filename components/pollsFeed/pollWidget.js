import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MyText } from '../utils/utils';

export default function PollWidget(props) {
    let calculateTotal = () => {
        let total = 0;
        props.pollOptions.forEach(opt => {
            total = total + opt.votes
        });
        return total
    }
    const [total, setTotal] = useState(calculateTotal());

    return (
        <View style={styles.pollWidget}>
            {/* Poll Question - just text w/ Q appended */}
            <View style={styles.pollQuestion}>
                <MyText content={'Q:'} classNames={[styles.boldQ, styles.font]} />
                <MyText content={props.pollQuestion} classNames={[styles.font]} />
            </View>
            {/* Options, each with a width bar */}
            
        </View>
    )
}

const styles = StyleSheet.create({
    pollQuestion: {
        display: 'flex',
        flexDirection: 'row',
    },
    boldQ: {
        fontWeight: 900,
        marginRight: 5
    },
    font: {
        fontSize: 18
    },
    pollWidget: {
        padding: 15,
        borderBottomColor: '#eaeaea',
        borderBottomWidth: 1
    }
});