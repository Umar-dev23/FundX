// EditProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = ({ route, navigation }) => {
  const { userData, loadUserData } = route.params;
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
  });

  const handleUpdate = async () => {
    if (!formData.name || !formData.email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const updatedUserData = {
        ...userData,
        ...formData,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      await loadUserData();
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#999"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Save Changes</Text>
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
    marginBottom: 30,
    marginTop: 40,
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
});

export default EditProfileScreen;