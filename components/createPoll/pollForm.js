import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from 'react-native';

import { MyText } from "../utils/utils";

import PollOptions from "./pollOptions";

export default function PollForm() {
    const { register, unregister, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form style={styles.pollForm} onSubmit={handleSubmit(onSubmit)}>
            {/* Poll Question/Title */}
            <View style={styles.pollElement}>
                <MyText content={'Poll Question:'} classNames={[styles.pollElementLabel]} />
                <input placeholder="Enter Question..." style={styles.pollTextInput} {...register("pollQuestion")} />
            </View>

            {/* Poll Options */}
            <View style={styles.pollElement}>
                <MyText content={'Poll Options:'} classNames={[styles.pollElementLabel]} />
                <PollOptions register={register} unregister={unregister} />
            </View>

            {/* Submit/Create Poll */}
            <View style={[styles.pollElement, styles.pollSubmit]}>
                <button style={styles.pollCreateSubmit} type="submit">Create Poll</button> 
            </View>
        </form>
    )
}



const styles = StyleSheet.create({
    pollForm: {
        display: 'flex',
        flexDirection: 'column',
    },
    pollElement: {
        margin: '10px',
        padding: '15px',
        borderTopWidth: '1px',
        borderTopColor: 'lightgray',
    },
    pollElementLabel: {
        flex: 1,
        fontSize: '12pt',
        textAlignVertical: 'center',
    },
    pollTextInput: {
        backgroundColor: 'transparent',
        fontFamily: 'Avenir-Roman',
        borderColor: 'gray',
        borderRadius: '8px',
        padding: '5px',
    },
    pollSubmit: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    pollCreateSubmit: {
        backgroundColor: '#3424FE',
        color: 'white',
        fontSize: '12pt',
        padding: '5px',
        paddingLeft: '40px',
        paddingRight: '40px',
        borderRadius: '8px',
        fontFamily: 'Avenir-Roman',
    }
});