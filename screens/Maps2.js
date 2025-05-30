import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useColorScheme,
  Switch,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen2 = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 30.3753,
    longitude: 69.3451,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });
  const [loading, setLoading] = useState(false);
  const [manualTheme, setManualTheme] = useState(null);

  const systemTheme = useColorScheme();
  const currentTheme = manualTheme || systemTheme;
  const isDark = currentTheme === "dark";

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
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
    }
    setLoading(false);
  };

  const getNearbyPlaces = () => {
    if (!location) return [];

    return [
      {
        key: "hospital",
        coordinate: {
          latitude: location.latitude + 0.002,
          longitude: location.longitude + 0.003,
        },
        title: "Nearby Hospital",
        description: "24/7 Emergency Hospital",
        pinColor: "green",
      },
      {
        key: "school",
        coordinate: {
          latitude: location.latitude - 0.002,
          longitude: location.longitude + 0.002,
        },
        title: "Nearby School",
        description: "Primary & Secondary Education",
        pinColor: "blue",
      },
      {
        key: "shop",
        coordinate: {
          latitude: location.latitude + 0.002,
          longitude: location.longitude - 0.003,
        },
        title: "Nearby Shop",
        description: "General & Grocery Store",
        pinColor: "purple",
      },
    ];
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        customMapStyle={isDark ? darkMapStyle : []}
      >
        {location && (
          <Marker
            coordinate={location}
            title="Your Current Location"
            description="You're here"
            pinColor="red"
          />
        )}

        {getNearbyPlaces().map((place) => (
          <Marker
            key={place.key}
            coordinate={place.coordinate}
            title={place.title}
            description={place.description}
            pinColor={place.pinColor}
          />
        ))}
      </MapView>

      <View style={[styles.infoContainer, isDark && styles.infoContainerDark]}>
        <Text style={[styles.text, isDark && styles.textDark]}>
          {location
            ? `Latitude: ${location.latitude.toFixed(
                4
              )}, Longitude: ${location.longitude.toFixed(4)}`
            : "Default Location: Pakistan"}
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

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Text style={[styles.text, isDark && styles.textDark]}>
            Dark Theme
          </Text>
          <Switch
            value={isDark}
            onValueChange={() => setManualTheme(isDark ? "light" : "dark")}
          />
        </View>
      </View>
    </View>
  );
};

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
];

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  infoContainer: {
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  infoContainerDark: {
    backgroundColor: "#1e1e1e",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "black",
  },
  textDark: {
    color: "white",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: 200,
  },
  buttonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MapScreen2;
