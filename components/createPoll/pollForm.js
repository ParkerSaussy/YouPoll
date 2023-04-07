import { useForm, useFormContext, useController, FormProvider } from "react-hook-form";
import { StyleSheet, View, SafeAreaView, TextInput, Text, Alert } from 'react-native';
import { MyButton } from "../utils/utils";
import axios from "axios";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from 'react-query';

export const Input = ({ title, classNames, ...textInputProps }) => {
    return (
        <View style={[...(classNames ? classNames:[])]}>
            {Boolean(title) && <Text>{title}</Text>}
            <TextInput {...textInputProps} />
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
        mutate(poll);
    }

    const createPoll = async (data) => {
        const { data: response } = await axios.post('https://642fbe66c26d69edc882766d.mockapi.io/api/youPoll/polls', data);
        console.log(response)
    }

    const { mutate, isLoading } = useMutation(createPoll, {
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
        if (errors['pollQuestion']) Alert.alert('You forgot something...', errors['pollQuestion'].message);
    }

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.subPage}>
                <FormProvider {...formMethods}>
                    <MyInput 
                        name='pollQuestion'
                        title='Poll Question'
                        rules={{ required: 'Poll Question is required!' }}
                    />
                    {/* INSERT ALL THE BS */}
                </FormProvider>
                <MyButton 
                    content='Create Poll' 
                    callback={formMethods.handleSubmit(onSubmit, onErrors)}
                />
            </View>
        </SafeAreaView>
    )    
}

const styles = StyleSheet.create({
    page: {
        
    },
    subPage: {
        
    },
    error: {
        color: 'darkred'
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