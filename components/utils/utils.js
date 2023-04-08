/* A series of replaced default functions/components to facilitate fonts & standardization, as well as to make everything more react-y */
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { useFormContext, useController } from "react-hook-form";


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

export const Input = ({ title, classNames, ...textInputProps }) => {
    return (
        <View style={[...(classNames ? classNames:[])]}>
            {Boolean(title) && <MyText content={title} classNames={[styles.textLabel]} />}
            <TextInput style={styles.input} placeholder={'Enter Something...'} {...textInputProps} />
        </View>
    )
}

export const MyInput = (props) => {
    const formContext = useFormContext()

    const { name, rules, classNames, defaultValue = '', ...inputProps } = props
    const { control } = formContext
    const { field } = useController({ name, control, rules, defaultValue })

    return <Input 
        {...inputProps}
        classNames={classNames}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value} 
    />
}

const styles = StyleSheet.create({
    font: {
        fontFamily: 'Avenir-Roman',
    },
    input: {
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        padding: 8,
        fontSize: 16,
        fontFamily: 'Avenir-Roman'
    },
    textLabel: {
        fontSize: 20
    }
})
