import { useForm, useFormContext, useController, FormProvider } from "react-hook-form";
import { StyleSheet, View, SafeAreaView, TextInput, Text, Alert } from 'react-native';
import { useMutation, useQueryClient } from 'react-query';

import axios from "axios";

import { MyButton, MyText } from "../utils/utils";

export const Input = ({ title, classNames, ...textInputProps }) => {
    return (
        <View style={[...(classNames ? classNames:[])]}>
            {Boolean(title) && <MyText content={title} classNames={[styles.textLabel]} />}
            <TextInput style={styles.input} placeholder={'Enter Something...'} {...textInputProps} />
        </View>
    )
}

export const MyInput = (props) => {
    const { name, rules, classNames, defaultValue = '', ...inputProps } = props
    const formContext = useFormContext()
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

export default function PollForm() {
    const formMethods = useForm()
    const queryClient = useQueryClient()

    const onSubmit = (form) => {
        const poll = { ...form };
        console.log(poll)
        // mutate(poll);
    }

    const createPoll = async (data) => {
        const { data: response } = await axios.post('https://642fbe66c26d69edc882766d.mockapi.io/api/youPoll/polls', data);
        console.log(response)
    }

    const { mutate } = useMutation(createPoll, {
        onSuccess: data => {
            console.log(data);
            const message = "success"
            alert(message)
        },
        onError: () => {
            alert("there was an error")
        },
        onSettled: () => {
            queryClient.invalidateQueries('create');
        }
    });

    const onErrors = errors => {
        console.log(errors)
        if (errors['pollQuestion']) Alert.alert('You forgot something...', errors['pollQuestion'].message)
        else if (errors['pollOption']) Alert.alert('You forgot something...', errors['pollOption'].message)
    }

    return (
        <SafeAreaView style={styles.layout}>

            <View style={[styles.section, styles.sectionBorder]}>
                <FormProvider  {...formMethods}>
                    <MyInput 
                        name='pollQuestion'
                        title='Poll Question:'
                        rules={{ required: 'Poll Question is required!' }}
                    />
                    <View style={[styles.section]}>
                        <MyInput 
                            name='pollOption'
                            title='Poll Options:'
                            rules={{ required: 'No options can be blank and 1+ options are required!' }}
                        />
                    </View>
                    
                </FormProvider>
            </View>
            <View style={styles.section}>
                <MyButton 
                    content='Create Poll' 
                    classNames={[styles.submitButton]}
                    textClassnames={[styles.submitButton]}
                    callback={formMethods.handleSubmit(onSubmit, onErrors)}
                />
            </View>
        </SafeAreaView>
    )    
}

const styles = StyleSheet.create({
    layout: {

    },
    provider: {
        display: 'flex',
        flexDirection: 'column',
    },
    section: {
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 20
    },
    sectionBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
    },
    textLabel: {
        fontSize: 20
    },
    input: {
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        padding: 8,
        fontSize: 16
    },
    submitButton: {
        backgroundColor: '#003396',
        color: 'white',
        fontSize: 16,
        borderRadius: 8,
        alignSelf: 'center',
        padding: 5
    }
});


// const { register, unregister, handleSubmit } = useForm();

    // const onSubmit = (data) => {
    //     console.log(data)
    // }

    // return (
    //     <View style={styles.pollForm}>
    //         <FormProvider {...formMethods}>
    //             {/* Poll Question/Title */}
    //             <View style={styles.pollElement}>
    //                 <MyText content={'Poll Question:'} classNames={[styles.pollElementLabel]} />
    //                 <Input placeholder={"Enter Question..."} style={styles.pollTextInput} {...register("pollQuestion")} />
    //             </View>

    //             {/* Poll Options */}
    //             <View style={styles.pollElement}>
    //                 <MyText content={'Poll Options:'} classNames={[styles.pollElementLabel]} />
    //                 <PollOptions register={register} unregister={unregister} />
    //             </View>

    //             {/* Submit/Create Poll */}
    //             <View style={[styles.pollElement, styles.pollSubmit]}>
    //                 <button style={styles.pollCreateSubmit} type={"submit"}>Create Poll</button> 
    //             </View>
    //         </FormProvider>
    //     </View>
    // )