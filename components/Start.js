// Import necessary libraries and components
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

// Define the available background colors
const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

const Start = ({ navigation }) => {
    // Initialize Firebase Authentication
    const auth = getAuth();
    // State to hold the user's name input
    const [name, setName] = useState('');
    // State to hold the selected background color
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    // Load the background image
    const imageBackground = require("../img/background-image.png");

    // Function to handle anonymous sign-in
    const signInUser = () => {
        signInAnonymously(auth)
            .then((result) => {
                // Navigate to the Chat screen with user details
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
                        {/* Map through colors array to create color selection buttons */}
                        {colors.map((color) => (
                            <TouchableOpacity
                                key={color}
                                onPress={() => setSelectedColor(color)}
                                style={[styles.colorCircle, { backgroundColor: color }, selectedColor === color && styles.selected]}
                            />
                        ))}
                    </View>
                    {/* Button to start the chat */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={signInUser}
                    >
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

// Styles for the Start screen components
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
