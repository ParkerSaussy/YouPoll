import { StyleSheet, Text, View } from 'react-native';

const text = () => { 
    return (
        <Text style={styles.logo}>YouPoll</Text>
    )
};

export default function Header() {
    return (
        <View style={styles.header}>
            {text()}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#0E00B9',
      position: 'fixed',
      top: '0',
      height: '10vh',
      width: '100%',
      color: 'white',
      textAlign: 'center',
    },
    logo: {
        color: 'white',
        fontFamily: 'Avenir',
        fontSize: '24pt',
        fontWeight: '600',
        margin: '20px'
    }
});