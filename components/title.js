import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Title = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 31,
    fontWeight: "600",
    color: "#FF7B7B",
    marginBottom: 10,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "400",
    color: "#888",
  },
});

export default Title; // ✅ Use an uppercase component name
