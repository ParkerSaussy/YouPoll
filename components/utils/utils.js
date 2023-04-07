/* A series of replaced default functions/components to facilitate fonts & standardization, as well as to make everything more react-y */
import { StyleSheet, Text, Pressable } from 'react-native';

export function MyText({ content, classNames }) {
    return (
        <Text style={[styles.font, ...(classNames ? classNames:[])]}>
            {content}
        </Text>
    )
}

export function MyButton({ content, callback, classNames, textClassnames }) {
    return (
        <Pressable 
            style={[...(classNames ? classNames:[])]} 
            onPress={() => callback()}
        >
            <MyText content={content} classNames={[...(textClassnames ? textClassnames:[])]}  />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    font: {
        fontFamily: 'Avenir-Roman',
    },
})
