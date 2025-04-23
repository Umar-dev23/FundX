import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";

const ApiScreen1 = () => {
  const [country, setCountry] = useState("Pakistan");
  const [universities, setUniversities] = useState([]);

  // Fetch whenever `province` changes
  useEffect(() => {
    setUniversities([]);

    const fetchUniversityData = async () => {
      try {
        const res = await fetch(
          `http://universities.hipolabs.com/search?country=${country}`
        );
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setUniversities(data);
      } catch (err) {
        console.error("Error fetching university data:", err);
        setUniversities([]);
      }
    };

    fetchUniversityData();
  }, [country]);

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        {index + 1}. {item.name}
      </Text>
      <Text style={styles.cardText}>🌐 {item.domains[0]}</Text>
      <Text style={styles.cardText}>🔗 {item.web_pages[0]}</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Search by Country</Text>

      <TextInput
        value={country}
        onChangeText={setCountry}
        placeholder="Enter Country"
        style={styles.input}
        autoCapitalize="none"
      />

      <Text style={styles.header}>Universities in {country}</Text>

      <FlatList
        data={universities}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.noDataText}>
            No universities found for “{country}”
          </Text>
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFF2F2",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFF2F2",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
});

export default ApiScreen1;
