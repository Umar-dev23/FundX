import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert, Platform
} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen1 = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 30.3753,
    longitude: 69.3451,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }
    getCurrentLocation();
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const userLocation = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      };
      setLocation(coords);
      setRegion({
        ...coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      Alert.alert("Error", "Unable to fetch location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={r => setRegion(r)}
        showsUserLocation
        showsMyLocationButton
      />

      <View style={styles.infoContainer}>
        <Text style={styles.text}>
          {location
            ? `Latitude: ${location.latitude.toFixed(4)}, Longitude: ${location.longitude.toFixed(4)}`
            : "Fetching location..."}
        </Text>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={getCurrentLocation}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Refreshing..." : "Refresh Location"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapScreen1;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  infoContainer: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: 200,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
