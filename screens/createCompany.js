import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import Title from "./../components/title.js"; 
import { Picker } from "@react-native-picker/picker";
import Button from "./../components/buttons.js";
import * as DocumentPicker from "expo-document-picker";
import { ScrollView } from "react-native";

const CreateCompany = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = React.useState("clothes");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [purpose, setPurpose] = React.useState("");
  const [services, setServices] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [website, setWebsite] = React.useState("");

  const handleSubmit = () => {
    console.log("we are here");
    const companyData = {
      name,
      description,
      purpose,
      services,
      tags: tags.split(",").map((tag) => tag.trim()), // Split tags by comma and trim spaces
      website,
      category: selectedValue,
    };
    console.log("we are here");
    navigation.replace("Company", { data: companyData });
    console.log("we are here");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title title="Create Your Company" subtitle="fill the details below" />
      <TextInput
        style={styles.input}
        placeholder="Name of your company"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description of your company"
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Purpose"
        value={purpose}
        onChangeText={setPurpose}
      />
      <TextInput
        style={styles.input}
        placeholder="Services/Product"
        value={services}
        onChangeText={setServices}
      />
      <View style={styles.input}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Clothes" value="clothes" />
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Drinks" value="drink" />
          <Picker.Item label="Hardware" value="hardware" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Add Tags (comma separated)"
        value={tags}
        onChangeText={setTags}
      />

      <TextInput
        style={styles.input}
        placeholder="Link to Website"
        value={website}
        onChangeText={setWebsite}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // NEW: Separate scrollView style
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // MODIFIED: Added paddingBottom
  container: {
    padding: 20,
    paddingBottom: 40, // Extra space at bottom
  },
  input: {
    backgroundColor: "#FFF2F2",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  // NEW: Description input style
  descriptionInput: {
    minHeight: 100, // Changed from fixed height
    textAlignVertical: "top", // Better for multiline
  },
  // MODIFIED: Added marginBottom to button
  button: {
    backgroundColor: "#FF7B7B",
    borderRadius: 8,
    padding: 18,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20, // Prevent bottom cutoff
  },

  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  guestButton: {
    backgroundColor: "#FFF2F2",
    borderRadius: 8,
    padding: 18,
    alignItems: "center",
    marginTop: 15,
  },
  guestButtonText: {
    color: "#FF7B7B",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPassword: {
    color: "#FF7B7B",
    textAlign: "center",
    marginTop: 20,
  },
  signupText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  signupLink: {
    color: "#FF7B7B",
  },
});

export default CreateCompany;
