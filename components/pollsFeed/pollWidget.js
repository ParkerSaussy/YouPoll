import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MyText } from '../utils/utils';

import PollAnswer from './pollAnswer';

export default function PollWidget(props) {
    let calculateTotal = () => {
        let total = 0;
        props.pollOptions.forEach(opt => {
            total = total + opt.votes
        });
        return total
    }
    const [total, setTotal] = useState(calculateTotal());
    const [voted, setVote] = useState();

    return (
        <View style={styles.pollWidget}>
            {/* Poll Question - just text w/ Q appended */}
            <View style={styles.pollQuestion}>
                <MyText content={'Q:'} classNames={[styles.boldQ, styles.font]} />
                <MyText content={props.pollQuestion} classNames={[styles.font]} />
            </View>
            {/* Options, each with a width bar */}
            <View>
                <MyText content={'A:'} classNames={[styles.boldQ, styles.font]} />
                {props.pollOptions.map((option, i) => (
                        <PollAnswer 
                            key={i} {...option} 
                            total={total}
                            selected={Boolean(i == voted)}
                            onPress={() => console.log(i)}
                        />
                    )
                )}
            </View>
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