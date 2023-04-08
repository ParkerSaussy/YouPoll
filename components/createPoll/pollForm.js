import { useState } from "react";
import { useForm, useFormContext, useController, FormProvider } from "react-hook-form";
import { StyleSheet, View, SafeAreaView, TextInput, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
        else if (errors['pollOption']) Alert.alert('You forgot something...', errors['pollOption'][0].message)
    }

    const [options, setOptions] = useState([]);
    const [optionCount, setOptionCount] = useState(1);

    /* Iterate our counter, AND register the new entry field */
    let addOption = () => {
        // Capping at 10 options per Poll for display & usability reasons
        if (options.length == 9) return

        // Prepare Data (new title + list of titles)
        let newOptionTitle = `pollOption.${optionCount}`;
        let newOptions = options;
        newOptions.push(newOptionTitle);
        
        // Update States w/ New data
        setOptions([...newOptions]);
        setOptionCount(optionCount+1)
    }

    /* Remove from options */
    let removeOption = (optionKey) => {
        /* 
        NOTE: This implementation is NOT scalable, but capping at 10 it's acceptable for now. 
        Would ideally do this with a map & indices but ran out of time to implement further.
        */
        let newOptions = options;
        let index;
        newOptions.forEach((item, i) => {
            if (item == optionKey) index = i;
        })
        newOptions.splice(index,1);

        // Update State and unregister
        setOptions([...newOptions]);
    }

    return (
        <View style={styles.layout}>
            <View style={[styles.section, styles.sectionBorder]}>
                <FormProvider  {...formMethods}>
                    {/* POLL QUESTION */}
                    <MyInput 
                        name='pollQuestion'
                        title='Poll Question:'
                        rules={{ required: 'Poll Question is required!' }}
                    />
                    {/* POLL OPTIONS */}
                    <View style={[styles.section]}>
                        {/* First Poll Option - not Deletable */}
                        <MyInput 
                            name='pollOption.0'
                            title='Poll Options:'
                            rules={{ required: 'No options can be blank and 1+ options are required!' }}
                        />
                        {/* Extra Poll Options */}
                        {options.length > 0 ? (
                            <View style={styles.pollOptions}>
                                {options.map((optionKey) => 
                                    <View key={optionKey} style={[styles.optionRow]}>
                                        <MyInput 
                                            name={optionKey}
                                            classNames={[styles.entry]}
                                            rules={{ required: 'No options can be blank and 1+ options are required!' }}
                                        />
                                        <MyButton 
                                            content={'X'} 
                                            classNames={[styles.deleteButton]}
                                            textClassnames={[styles.deleteButtonText]}
                                            callback={() => removeOption(optionKey)} 
                                        />
                                    </View>
                                )}
                            </View>
                        ):null}
                        
                        {/* Add New Option Button */}
                        <View style={styles.addOption}>
                            <MyButton 
                                content={'+ Add Poll Option'} 
                                classNames={[styles.addOptionButton]} 
                                textClassnames={[styles.addOptionButtonText]}
                                callback={addOption} 
                            />
                        </View>
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
        </View>
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
        marginTop: 5,
        marginBottom: 5,
    },
    sectionBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#eaeaea',
    },
    addOption: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#eaeaea',
        padding: 5,
    },
    addOptionButton: {
        borderRadius: 8,
        
        padding: 4,
        alignSelf: 'flex-end'
    },
    addOptionButtonText: {
        fontSize: 16
    },
    textLabel: {
        fontSize: 20
    },
    input: {
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        padding: 8,
        fontSize: 16,
        fontFamily: 'Avenir-Roman'
    },
    submitButton: {
        backgroundColor: '#003396',
        color: 'white',
        fontSize: 16,
        borderRadius: 8,
        alignSelf: 'center',
        padding: 5,
    },
    pollOptions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    optionRow: {
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopColor: '#ededed',
        borderTopWidth: '1px',
    },
    deleteButton: {
        alignSelf: 'center',
        alignContent: 'center',
        width: 30,
        height: 30,
        backgroundColor: 'lightgray',
        borderRadius: 5,
        padding: 6
    },
    deleteButtonText: {
        alignSelf: 'center',
        textAlignVertical:'center',
        fontWeight: 900
    },
});