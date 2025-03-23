import React, { useState, useContext } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const T1Welcome = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("Welcome to MyApp");
  const handleSubmit = () => {
    setTitle(`Welcome ${name}!`);
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.textView}>{title}</Text>
        <Text style={styles.subText}>Wanted to Change the Title?</Text>

        <TextInput
          style={styles.input}
          placeholder="input..."
          onChangeText={(text) => {
            setName(text);
          }}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>CHANGE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default T1Welcome;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f0e68c",
  },
  container: {
    padding: 20,
    paddingBottom: 40, // Extra space at bottom
    alignItems: "center",
  },
  textView: {
    color: "#000",
    padding: 10,
    fontSize: 26,
    fontWeight: 800,
  },
  subText: {
    color: "#292",
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF7B7B",
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    borderColor: "#000",
    borderWidth: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#FFF2F2",
    borderRadius: 6,
    padding: 9,
    marginBottom: 20,
    fontSize: 13,
  },
});
