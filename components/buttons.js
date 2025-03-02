import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";


const Button = (params) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={params.OnPress()}>
                <Text style={styles.buttonText}>{params.buttonText}</Text>
            </TouchableOpacity>
        </View>)
}
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




});

export default Button