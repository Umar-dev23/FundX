import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export default function ContactUsAxiosScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await axios.post(
        // 🔗 temporary testing endpoint:
        'https://reimagined-orbit-4jg9rq6vj49wcw96-4000.app.github.dev/contact-us',
        { name, email, message },
        { timeout: 4000 } // ⏱ 4 second timeout
      );

      Toast.show({
        type: 'success',
        text1: 'Sent!',
        text2: 'Your message went through.',
      });

      // clear form
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        // timeout
        Toast.show({
          type: 'error',
          text1: 'Timeout 😬',
          text2: 'Took too long—please check your connection.',
        });
      } else if (err.response) {
        // server responded with a status outside 2xx
        Toast.show({
          type: 'error',
          text1: `Error ${err.response.status}`,
          text2: err.response.data?.message || 'Something went wrong on server.',
        });
      } else {
        // network error, DNS, etc.
        Toast.show({
          type: 'error',
          text1: 'Network Error',
          text2: 'Could not reach the server. Try again later.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us (Axios)</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Send Message" onPress={handleSubmit} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});