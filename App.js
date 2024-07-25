// Import necessary libraries and components
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";

// Ignore AsyncStorage warning (optional)
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
    // Monitor network connection status
    const connectionStatus = useNetInfo();

    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDH_rDa0aVsz7EamHvVn2eX2UQvr4dI4bU",
        authDomain: "chatapp-e738d.firebaseapp.com",
        projectId: "chatapp-e738d",
        storageBucket: "chatapp-e738d.appspot.com",
        messagingSenderId: "183507698838",
        appId: "1:183507698838:web:04fd7b7bc12d0961636eb7"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    const storage = getStorage(app);

    // Effect to enable/disable Firestore network based on connection status
    useEffect(() => {
        if (connectionStatus.isConnected === false) {
            Alert.alert("Connection Lost!");
            disableNetwork(db);
        } else if (connectionStatus.isConnected === true) {
            enableNetwork(db);
        }
    }, [connectionStatus.isConnected]);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Start"
            >
                <Stack.Screen
                    name="Start"
                    component={Start}
                />
                <Stack.Screen
                    name="Chat"
                >
                    {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;