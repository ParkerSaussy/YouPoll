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

    // Initial states. voted must=null to avoid 0 
    const [total, setTotal] = useState(calculateTotal());
    const [voted, setVote] = useState(null);

    let onSelect = (i) => {
        // If we're voting for the first time
        if (voted == null) setTotal(total+1)

        setVote(i);
    }

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
                            onPress={() => onSelect(i)}
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
        borderBottomWidth: 1,
    }
});