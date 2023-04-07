import { StyleSheet, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { MyButton, MyText } from './utils/utils';
import axios from 'axios';

import { useQuery } from 'react-query';

const getPolls = async () => {
    const { data } = await axios.get('https://642fbe66c26d69edc882766d.mockapi.io/api/youPoll/polls');
    return data
}
