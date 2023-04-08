import { StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import axios from 'axios';

import { MyButton, MyText } from '../utils/utils';
import PollWidget from './pollWidget';

const getPolls = async () => {
    const { data } = await axios.get('https://642fbe66c26d69edc882766d.mockapi.io/api/youPoll/polls');
    return data
}

export default function Polls() {
    const { isLoading, error, data, refetch } = useQuery('pollData', getPolls);
   
    if (isLoading) return (
        <SafeAreaView style={styles.polls}>
            <MyText content={'Loading...'} />
            <ActivityIndicator size="small" />
        </SafeAreaView>
    )
    else if (error) return (
        <SafeAreaView style={styles.polls}>
            <MyText content={'Error Loading Polls'} classNames={[styles.error]} />
        </SafeAreaView>
    )
    else return data ? (
        <SafeAreaView style={styles.polls}>
            <MyButton 
                content={'Refresh Data'} 
                callback={refetch} 
                classNames={[styles.refreshButton]}
                textClassnames={[styles.refreshButtonText]}
            />
            <ScrollView>
                {/* Compound key below prevents react from thinking one element is another when react query repopulates the data array */}
                {data.reverse().map((poll, i) => <PollWidget key={`${i}${poll.pollQuestion}`} {...JSON.parse(JSON.stringify(poll))} />)}
            </ScrollView>
        </SafeAreaView>
    ):null;
}

const styles = StyleSheet.create({
    polls: {
        height: '85%',
    },
    error: {
        color: 'darkred'
    },
    refreshButton: {
        alignSelf: 'flex-end',
        padding: 5,
        borderColor: '#003396',
        borderRadius: 5,
        borderWidth: 1
    },
    refreshButtonText: {
        color: '#003396'
    }
})