import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';


const OrientataionScreen = () => {
    const { height, width } = useWindowDimensions();
    const isPotrait = height > width;
    return (
        <View style={[styles.container, isPotrait ? styles.portrait : styles.landscape]}>
            <Text style={styles.text}>{isPotrait ? "Potrait Mode" : "Landscape Mode"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       // flexDirection: isPotrait ? 'row' : 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    portrait: {
        backgroundColor: 'lightblue',
    },
    landscape: {
        backgroundColor: 'lightgreen',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default OrientataionScreen