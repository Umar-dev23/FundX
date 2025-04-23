// ContactUs.js
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const ContactUs = () => {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [responseMsg, setResponseMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      setResponseMsg("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setResponseMsg(null);

    try {
      const res = await fetch("https://reimagined-orbit-4jg9rq6vj49wcw96-4000.app.github.dev/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const json = await res.json();
      if (res.ok && json.message) {
        setResponseMsg(json.message);
        // Optionally clear the form:
        setName(""); setEmail(""); setMessage("");
      } else {
        setResponseMsg(json.error || "Unexpected server response.");
      }
    } catch (err) {
      console.error(err);
      setResponseMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>Contact Us</Text>

        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Your Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Your Message"
          multiline
          textAlignVertical="top"
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>Send Message</Text>
          }
        </TouchableOpacity>

        {responseMsg && (
          <Text style={styles.responseText}>{responseMsg}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFF2F2",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  descriptionInput: {
    minHeight: 120,
  },
  button: {
    backgroundColor: "#FF7B7B",
    borderRadius: 8,
    padding: 18,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  responseText: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    padding: 10,
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
  },
});

export default ContactUs;
