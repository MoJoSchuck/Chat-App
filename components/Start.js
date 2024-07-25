// Import necessary libraries and components
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
    const auth = getAuth();
    const [name, setName] = useState(''); // State to hold the name input value
    const [selectedColor, setSelectedColor] = useState('#090C08'); // State to hold the chosen background color

    const imageBackground = require("../img/background-image.png");

    // Function to handle the sign-in anonymously process for the user
    const signInUser = () => {
        signInAnonymously(auth)
            .then((result) => {
                navigation.navigate("Chat", {
                    name: name,
                    selectedColor: selectedColor,
                    userID: result.user.uid,
                });
                Alert.alert("Signed in Successfully!");
            })
            .catch((error) => {
                Alert.alert("Unable to sign in, try later again.");
            });
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ImageBackground
                source={imageBackground}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <Text style={styles.appTitle}>App Title</Text>
                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder='Your Name'
                    />
                    <Text style={styles.colorText}>Choose Background Color:</Text>
                    <View style={styles.colorOptions}>
                        <TouchableOpacity onPress={() => setSelectedColor('#090C08')} style={[styles.colorCircle, { backgroundColor: '#090C08' }, selectedColor === '#090C08' && styles.selected]} />
                        <TouchableOpacity onPress={() => setSelectedColor('#474056')} style={[styles.colorCircle, { backgroundColor: '#474056' }, selectedColor === '#474056' && styles.selected]} />
                        <TouchableOpacity onPress={() => setSelectedColor('#8A95A5')} style={[styles.colorCircle, { backgroundColor: '#8A95A5' }, selectedColor === '#8A95A5' && styles.selected]} />
                        <TouchableOpacity onPress={() => setSelectedColor('#B9C6AE')} style={[styles.colorCircle, { backgroundColor: '#B9C6AE' }, selectedColor === '#B9C6AE' && styles.selected]} />
                    </View>
                    {/* Render a TouchableOpacity for starting the chat */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={signInUser}>
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "88%",
        height: "44%",
        backgroundColor: "white",
        alignItems: "center",
        marginBottom: 90,
        justifyContent: "space-evenly",
        borderRadius: 4,
    },
    textInput: {
        width: "84%",
        padding: 10,
        borderWidth: 1,
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 0.7,
        borderColor: "#757083",
        borderRadius: 4,
    },
    appTitle: {
        flex: 1,
        fontSize: 45,
        fontWeight: "600",
        color: "#ffffff",
        justifyContent: "center",
        marginTop: 80,
    },
    imageBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: "84%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#757083",
        padding: 10,
        marginTop: 5,
        borderRadius: 4,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    colorOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "84%",
        marginTop: 10,
        marginBottom: 10,
    },
    colorText: {
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 1,
    },
    selected: {
        borderWidth: 3,
        borderColor: '#ffffff',
    },
});

export default Start;