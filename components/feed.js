import { StyleSheet, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { MyButton, MyText } from './utils/utils';
import axios from 'axios';

import { useQuery } from 'react-query';

const getPolls = async () => {
    const { data } = await axios.get('https://642fbe66c26d69edc882766d.mockapi.io/api/youPoll/polls');
    return data
}

export default function Feed({ navigation }) {
    const { isLoading, error, data } = useQuery('pollData', getPolls);
    if (isLoading) console.log('loading')
    else if (error) console.log('error')
    else console.log('success or whatever')

    console.log(data)

    return (
        <SafeAreaView style={styles.container}>
            <MyText content={'Home'} classNames={[]} />
            <MyButton 
                content={"Create New Poll"}
                callback={() => navigation.navigate('Create')}
            />
            <ActivityIndicator size = 'large'/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Avenir',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    }
});