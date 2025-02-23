import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// Configure how notifications are handled when received.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync();
    // On Android, create a notification channel
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('login-success-channel', {
        name: 'Login Success Channel',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
      });
    }
  }, []);

  // Request permissions to show notifications
  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Permission to receive notifications was denied');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.email === email && userData.password === password) {
          // Trigger local notification using expo-notifications
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "🎉 Login Successful!",
              body: "Welcome back to your account!",
              sound: 'default',
              // You can include additional data if needed
              data: { extraData: 'Optional extra data' },
            },
            trigger: null, // Immediate trigger
          });
          // Navigate to the Profile screen
          navigation.replace('Profile');
        } else {
          Alert.alert('Error', 'Invalid credentials');
        }
      } else {
        Alert.alert('Error', 'No account found');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Please log in to your account.</Text>

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.supportButton} onPress={() => navigation.navigate('ContactSupport')}>
        <Text style={styles.supportButtonText}>Contact Support</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign up here.</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FF7B7B',
    marginBottom: 10,
    marginTop: 40,
  },
  supportButton: {
    backgroundColor: "#FFF2F2",
    borderRadius: 8,
    padding: 18,
    alignItems: "center",
    marginTop: 15,
  },
  supportButtonText: {
    color: "#FF7B7B",
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#FF7B7B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF2F2',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2F2',
    borderRadius: 8,
    marginBottom: 20,
    paddingRight: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF7B7B',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  guestButton: {
    backgroundColor: '#FFF2F2',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginTop: 15,
  },
  guestButtonText: {
    color: '#FF7B7B',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    color: '#FF7B7B',
    textAlign: 'center',
    marginTop: 20,
  },
  signupText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  signupLink: {
    color: '#FF7B7B',
  },
});

export default LoginScreen;



















// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons } from '@expo/vector-icons';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }
//     try {
//       const storedUserData = await AsyncStorage.getItem('userData');
//       if (storedUserData) {
//         const userData = JSON.parse(storedUserData);
//         if (userData.email === email && userData.password === password) {
//           // Use replace instead of navigate to avoid going back to login screen
//           navigation.replace('Profile');
//         } else {
//           Alert.alert('Error', 'Invalid credentials');
//         }
//       } else {
//         Alert.alert('Error', 'No account found');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Error', 'Login failed');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome Back!</Text>
//       <Text style={styles.subtitle}>Please log in to your account.</Text>

//       <Text style={styles.label}>Email Address</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email Address"
//         placeholderTextColor="#999"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <Text style={styles.label}>Password</Text>
//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.passwordInput}
//           placeholder="Enter password"
//           placeholderTextColor="#999"
//           secureTextEntry={!showPassword}
//           value={password}
//           onChangeText={setPassword}
//         />
//         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//           <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#999" />
//         </TouchableOpacity>
//       </View>

// <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Log In</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.guestButton}>
//         <Text style={styles.guestButtonText}>Continue as Guest</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => {}}>
//         <Text style={styles.forgotPassword}>Forgot your password?</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//         <Text style={styles.signupText}>
//           Don't have an account? <Text style={styles.signupLink}>Sign up here.</Text>
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '600',
//     color: '#FF7B7B',
//     marginBottom: 10,
//     marginTop: 40,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 30,
//   },
//   label: {
//     fontSize: 16,
//     color: '#FF7B7B',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#FFF2F2',
//     borderRadius: 8,
//     padding: 15,
//     marginBottom: 20,
//     fontSize: 16,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF2F2',
//     borderRadius: 8,
//     marginBottom: 20,
//     paddingRight: 15,
//   },
//   passwordInput: {
//     flex: 1,
//     padding: 15,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#FF7B7B',
//     borderRadius: 8,
//     padding: 18,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   guestButton: {
//     backgroundColor: '#FFF2F2',
//     borderRadius: 8,
//     padding: 18,
//     alignItems: 'center',
//     marginTop: 15,
//   },
//   guestButtonText: {
//     color: '#FF7B7B',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   forgotPassword: {
//     color: '#FF7B7B',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   signupText: {
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#666',
//   },
//   signupLink: {
//     color: '#FF7B7B',
//   },
// });

// export default LoginScreen;

