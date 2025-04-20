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
import T3NotesScreen from "./Tasks/T3NotesScreen";
import FeedbackScreen from "./FeedbackScreen";
import MapScreen from "./MapScreen";
import ApiScreen1 from "./Week14Tasks/ApiScreen1";
import Contactus from "./Contactus";

const Tab = createBottomTabNavigator();

export default function NavigationHeader() {
  return (
    <Tab.Navigator
      initialRouteName="Public_API"
      screenOptions={({ route }) => ({
        // Configure icons based on the route/screen name
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Public_API":
              iconName = "chatbubble-ellipses";
              //iconName = "home";
              break;
            case "Contact Us":
              iconName = "map";
              break;
            case "Profile":
              iconName = "person-circle";
              break;
            case "Notes":
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
      <Tab.Screen name="Public_API" component={ApiScreen1} />
      <Tab.Screen name="Contact Us" component={Contactus} />
      <Tab.Screen name="Settings" component={T2Settings} />
      <Tab.Screen name="Notes" component={T3NotesScreen} />
    </Tab.Navigator>
  );
}
