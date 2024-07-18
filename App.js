// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

const App = () => {
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
                    {props => <Chat db={db} {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;