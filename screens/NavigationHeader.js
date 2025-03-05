// navigationHeader.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import SignupScreen from './SignupScreen';
import ProfileScreen from './ProfileScreen';
import buttonEvents from "./buttonEvents"
import OrientataionScreen from './Orientationscreen';


const Tab = createBottomTabNavigator();

export default function NavigationHeader() {
    return (
        <Tab.Navigator
            initialRouteName="SignUP"
            screenOptions={({ route }) => ({
                // Configure icons based on the route/screen name
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'SignUP':
                            iconName = 'home';
                            break;
                        case 'Profile':
                            iconName = 'person-circle';
                            break;
                        case 'Task3-Events':
                            iconName = 'briefcase';
                            break;
                        case 'Orientation':
                            iconName = 'settings';
                            break;
                        default:
                            iconName = 'ellipse';
                            break;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                // Active/inactive colors, etc.
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: true, // Show/hide top header if you want
            })}
        >
            <Tab.Screen name="SignUP" component={SignupScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Task3-Events" component={buttonEvents} />
            <Tab.Screen name="Orientation" component={OrientataionScreen} />
        </Tab.Navigator>
    );
}
