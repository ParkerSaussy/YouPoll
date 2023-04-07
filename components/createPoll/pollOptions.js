import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import { MyButton } from '../utils/utils';

export default function PollOptions({ register, unregister }) {
    const [options, setOptions] = useState([]);
    const [optionCount, setOptionCount] = useState(1);

    /* Iterate our counter, AND register the new entry field */
    let addOption = () => {
        // Capping at 10 options per Poll for display & usability reasons
        if (optionCount == 10) return

        // Prepare Data (new title + list of titles)
        let newOptionTitle = `pollOption.${optionCount}`;
        let newOptions = options;
        newOptions.push(newOptionTitle);
        
        // Update States w/ New data
        setOptions([...newOptions]);
        setOptionCount(optionCount+1)
    }

    /* Remove from options and de-register the related entry field */
    let removeOption = (i, optionKey) => {
        let newOptions = options;
        newOptions.splice(i,1);

        // Update State and unregister
        setOptions([...newOptions]);
        unregister(optionKey);
    }

    return (
        <View style={styles.pollOptions}>
            <View style={styles.optionRow}>
                <input id={'pollOption.0'} placeholder={'Enter Option...'} style={styles.pollTextInput} {...register('pollOption.0')}  />
            </View>
            {options.length > 0 ? (
                <View>
                    {options.map((optionKey, i) => 
                        <View key={i} style={[styles.optionRow, styles.renderedRow]}>
                            <input id={optionKey} placeholder={'Enter Option...'} style={styles.pollTextInput} {...register(optionKey)} />
                            <MyButton content={'X'} classNames={[styles.deleteText]} callback={() => removeOption(i, optionKey)} />
                        </View>
                    )}
                </View>
            ):null}
            <MyButton 
                content={'+ Add Poll Option'} 
                callback={addOption} 
                classNames={[styles.addOptionButton, styles.optionRow]}
                textClassnames={[styles.addOptionButtonText]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    pollTextInput: {
        backgroundColor: 'transparent',
        fontFamily: 'Avenir-Roman',
        borderRadius: '8px',
        padding: '5px',
        flex: 5,
    },
    pollOptions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    optionRow: {
        flex: 1,
        padding: '5px',
        marginTop: '5px',
    },
    renderedRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopColor: '#ededed',
        borderTopWidth: '1px',
    },
    addOptionButton: {
        flex: 1,
        backgroundColor: '#3424FE',
        borderRadius: '8px',
        justifyContent: 'center',
        marginTop: '10px',
    },
    addOptionButtonText: {
        color: 'white',
        fontWeight: '600',
        alignSelf: 'center'
    },
    deleteText: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: '5px',
        margin: '5px',
    },
})
