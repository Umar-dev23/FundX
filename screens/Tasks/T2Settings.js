import React, { useState, useEffect } from "react";
import { View, Text, Switch, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const T2Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState("");

  // Load saved preferences when the screen loads
  useEffect(() => {
    const loadPreferences = async () => {
      const savedDarkMode = await AsyncStorage.getItem("darkMode");
      const savedUsername = await AsyncStorage.getItem("username");
      if (savedDarkMode !== null) setDarkMode(JSON.parse(savedDarkMode));
      if (savedUsername) setUsername(savedUsername);
    };
    loadPreferences();
  }, []);

  // Save preferences whenever they change
  const savePreferences = async (newDarkMode, newUsername) => {
    await AsyncStorage.setItem("darkMode", JSON.stringify(newDarkMode));
    await AsyncStorage.setItem("username", newUsername);
  };

  return (
    <View
      style={[
        styles.container,
        darkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={(value) => {
            setDarkMode(value);
            savePreferences(value, username);
          }}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          savePreferences(darkMode, text);
        }}
      />
    </View>
  );
};

export default T2Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "black",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
});
