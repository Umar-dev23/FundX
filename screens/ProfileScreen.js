// ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://i.ibb.co/qGjHf23/Image.png' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{userData?.name || 'User Name'}</Text>
        <Text style={styles.email}>{userData?.email || 'email@example.com'}</Text>
      </View>

      <Text style={styles.sectionTitle}>Personal Information</Text>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('EditProfile', { userData, loadUserData })}
      >
        <View style={styles.menuItemContent}>
          <Text style={styles.menuItemTitle}>Edit Profile</Text>
          <Text style={styles.menuItemSubtitle}>Manage your personal information</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemContent}>
          <Text style={styles.menuItemTitle}>Create Company</Text>
          <Text style={styles.menuItemSubtitle}>Create a new company</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Account Settings</Text>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemContent}>
          <Text style={styles.menuItemTitle}>Change Password</Text>
          <Text style={styles.menuItemSubtitle}>Update your password</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
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
    marginBottom: 20,
    marginTop: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF7B7B',
    marginBottom: 15,
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#999',
  },
});

export default ProfileScreen;

