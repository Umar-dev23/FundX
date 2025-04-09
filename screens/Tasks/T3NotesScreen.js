import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Share,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const T3NotesScreen = () => {
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");

  // Save note to AsyncStorage
  const saveNote = async () => {
    try {
      await AsyncStorage.setItem("userNote", note);
      Alert.alert("Success", "Note saved successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save note");
    }
  };

  // Load note from AsyncStorage
  const loadNote = async () => {
    try {
      const storedNote = await AsyncStorage.getItem("userNote");
      if (storedNote !== null) {
        setSavedNote(storedNote);
      } else {
        Alert.alert("Info", "No note found");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load note");
    }
  };

  // Share the saved note
  const shareNote = async () => {
    if (!savedNote) {
      Alert.alert("Info", "No note to share!");
      return;
    }

    try {
      await Share.share({
        message: savedNote,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share note");
    }
  };

  // Load the saved note when the screen opens
  useEffect(() => {
    loadNote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Notes App</Text>

      <TextInput
        style={styles.input}
        placeholder="Write your note here..."
        value={note}
        onChangeText={setNote}
      />

      <View style={styles.buttonContainer}>
        <Button title="Save Note" onPress={saveNote} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Load Note" onPress={loadNote} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Share Note" onPress={shareNote} />
      </View>

      {savedNote ? (
        <Text style={styles.savedNote}>Saved Note: {savedNote}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  savedNote: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
  buttonContainer: {
    marginBottom: 10, // Spacing between each button
  },
});

export default T3NotesScreen;
