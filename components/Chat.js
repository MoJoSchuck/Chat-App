import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
    const { name, color } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, [name, navigation]);

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Text style={styles.textColor}>Hello, {name}!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textColor:{
        color: "#ffffff"
    }
});

export default Chat;