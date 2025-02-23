import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native"

const ContactSupportScreen = () => {
  const openWebsite = () => {
    Linking.openURL("https://www.example.com")
  }

  const openDialer = () => {
    Linking.openURL("tel:1234567890")
  }

  const openEmail = () => {
    Linking.openURL("mailto:support@example.com")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Support</Text>
      <Text style={styles.subtitle}>How can we help you?</Text>

      <TouchableOpacity style={styles.button} onPress={openWebsite}>
        <Text style={styles.buttonText}>Visit Our Website</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openDialer}>
        <Text style={styles.buttonText}>Call Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openEmail}>
        <Text style={styles.buttonText}>Email Support</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#FF7B7B",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF7B7B",
    borderRadius: 8,
    padding: 18,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default ContactSupportScreen

