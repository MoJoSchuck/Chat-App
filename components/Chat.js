import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
    const { name, color } = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );
    };
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#484848"
                },
                left: {
                    backgroundColor: "#FFF"
                }
            }}
        />
    }

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, [name, navigation]);

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;