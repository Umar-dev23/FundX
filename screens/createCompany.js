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
import Title from "./../components/title.js"; // ✅ Import correctly with an uppercase "Title"

const CreateCompany = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Title title="Welcome" subtitle="Create your company" />
            <TextInput styles={styles.input} placeholder="Name of your company"></TextInput>
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
        fontSize: 28,
        fontWeight: "600",
        color: "#FF7B7B",
        marginBottom: 10,
        marginTop: 40,
    },
    supportButton: {
        backgroundColor: "#FFF2F2",
        borderRadius: 8,
        padding: 18,
        alignItems: "center",
        marginTop: 15,
    },
    supportButtonText: {
        color: "#FF7B7B",
        fontSize: 16,
        fontWeight: "600",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        color: "#FF7B7B",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#FFF2F2",
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF2F2",
        borderRadius: 8,
        marginBottom: 20,
        paddingRight: 15,
    },
    passwordInput: {
        flex: 1,
        padding: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#FF7B7B",
        borderRadius: 8,
        padding: 18,
        alignItems: "center",
        marginTop: 10,
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
