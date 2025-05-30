import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  Platform,
} from "react-native";

const SmsScreen = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const sendSMS = () => {
    if (!phone) {
      Alert.alert("Please enter a phone number");
      return;
    }
    // encode the message so special chars don’t break the URL
    const body = encodeURIComponent(message);
    const separator = Platform.OS === "ios" ? "&" : "?";
    console.log(separator)
    const url = `sms:${phone}${separator}body=${body}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("SMS is not available on this device");
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => Alert.alert("An error occurred", err.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send SMS Message</Text>

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="+1 123 456 7890"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Message</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Type your message here…"
        multiline
        numberOfLines={4}
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={sendSMS}>
        <Text style={styles.buttonText}>Send SMS</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SmsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 18,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
