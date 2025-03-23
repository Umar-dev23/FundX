// navigationHeader.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SignupScreen from "./SignupScreen";
import ProfileScreen from "./ProfileScreen";
import buttonEvents from "./buttonEvents";
import OrientataionScreen from "./Orientationscreen";
import T1Welcome from "./Tasks/T1Welcome";
import T2Settings from "./Tasks/T2Settings";

const Tab = createBottomTabNavigator();

export default function NavigationHeader() {
  return (
    <Tab.Navigator
      initialRouteName="Task1"
      screenOptions={({ route }) => ({
        // Configure icons based on the route/screen name
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Task1":
              iconName = "home";
              break;
            case "Settings":
              iconName = "settings";
              break;
            case "Profile":
              iconName = "person-circle";
              break;
            case "Task3-Events":
              iconName = "briefcase";
              break;
            default:
              iconName = "ellipse";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Active/inactive colors, etc.
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Show/hide top header if you want
      })}
    >
      <Tab.Screen name="Task1" component={T1Welcome} />
      <Tab.Screen name="Settings" component={T2Settings} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Task3-Events" component={buttonEvents} />
    </Tab.Navigator>
  );
}
