import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FeedbackScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [starRating, setStarRating] = useState(0);

  const handleSubmit = async () => {
    if (!name || !email || !feedback) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Save feedback locally
    const feedbackData = {
      name,
      email,
      feedback,
      rating: starRating
    };

    try {
      console.log(JSON.stringify(feedbackData));
      await AsyncStorage.setItem('userFeedback', JSON.stringify(feedbackData));
    } catch (error) {
      console.error('Error saving feedback:', error);
    }

    // Prepare email content
    const subject = `Feedback from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nRating: ${starRating}/5\n\nFeedback:\n${feedback}`;
    console.log(encodeURIComponent(body));
    // Create mailto URL
    const mailUrl = `mailto:umar.dev23@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open email client
    try {
      await Linking.openURL(mailUrl);
    } catch (error) {
      Alert.alert('Error', 'Failed to open email client');
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity
        key={star}
        onPress={() => setStarRating(star)}
        style={styles.starButton}
      >
        <Text style={styles.star}>
          {star <= starRating ? '★' : '☆'}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Feedback Form</Text>

      <Text style={styles.label}>Name *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Email *</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Rating</Text>
      <View style={styles.ratingContainer}>
        {renderStars()}
        <Text style={styles.ratingText}>({starRating}/5)</Text>
      </View>

      <Text style={styles.label}>Feedback *</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={feedback}
        onChangeText={setFeedback}
        placeholder="Enter your feedback here"
        multiline
        numberOfLines={5}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  starButton: {
    padding: 4,
  },
  star: {
    fontSize: 32,
    color: '#FFD700',
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontWeight: '700',
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


export default FeedbackScreen;