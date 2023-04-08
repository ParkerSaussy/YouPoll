import { StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { MyText } from '../utils/utils';
import axios from 'axios';

import { useQuery } from 'react-query';
import PollWidget from './pollWidget';

const getPolls = async () => {
    const { data } = await axios.get('https://642fbe66c26d69edc882766d.mockapi.io/api/youPoll/polls');
    return data
}

export default function Polls() {
    const { isLoading, error, data } = useQuery('pollData', getPolls);
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
            <ScrollView>
            {data.map((poll, i) => <PollWidget key={i} {...poll} />)}
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
    }
})