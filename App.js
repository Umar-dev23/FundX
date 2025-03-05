// App.js
import React from "react";
import { useEffect } from "react";
import { AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import ContactSupportScreen from "./screens/contactSupport";
import HomeScreen from "./screens/HomeScreen";
import createCompany from "./screens/createCompany";
import Company from "./screens/Company";
import OrientataionScreen from "./screens/Orientationscreen";
import NavigationHeader from './screens/NavigationHeader'; // <--- Import your bottom nav

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    console.log("The app is Starting...");

    // App State Listener
    const handleAppStateChange = (nextAppState) => {
      console.log("App state changed to:", nextAppState);
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove(); // Cleanup when component unmounts
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#fff" },
        }}
      >
        {/* <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
        <Stack.Screen name="createCompany" component={createCompany} />
        <Stack.Screen name="Company" component={Company} />
        <Stack.Screen name="OrientataionScreen" component={OrientataionScreen} />
        */}


        <Stack.Screen
          name="MainTabs"
          component={NavigationHeader}
          options={{ headerShown: false }} // Because the bottom tabs will manage navigation
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
