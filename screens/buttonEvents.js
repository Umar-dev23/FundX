import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Animated,
    PanResponder,
} from 'react-native';


const buttonEvents = () => {

    const [textValue, setTextValue] = useState('');
    // PanResponder for Swipe/Drag
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                // Snap back to original position
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }).start();
                console.log('Swipe Released', 'You moved the box!');
            },
        })
    ).current;

    // Button Press
    const handleButtonPress = () => {
        Alert.alert('Button Pressed', 'You tapped the button!');
    };

    // Long Press
    const handleLongPress = () => {
        Alert.alert('Long Press Detected', 'You held the button!');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Type something..."
                value={textValue}
                onChangeText={(newText) => setTextValue(newText)}
            />
            <Text style={styles.textLabel}>You typed: {textValue}</Text>


            <Button title="Press Me" onPress={handleButtonPress} />


            <TouchableOpacity
                style={styles.longPressButton}
                onLongPress={handleLongPress}
            >
                <Text style={styles.longPressButtonText}>Long Press Me</Text>
            </TouchableOpacity>


            <Animated.View
                style={[
                    styles.draggableBox,
                    { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
                ]}
                {...panResponder.panHandlers}
            >
                <Text style={styles.boxText}>Swipe Me</Text>
            </Animated.View>
        </View>
    )
}

export default buttonEvents;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    textLabel: {
        marginBottom: 20,
        fontSize: 16,
    },
    longPressButton: {
        backgroundColor: 'tomato',
        padding: 10,
        marginTop: 20,
        marginBottom: 40,
        borderRadius: 5,
        alignItems: 'center',
    },
    longPressButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    draggableBox: {
        width: 100,
        height: 100,
        backgroundColor: 'skyblue',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center', // Keep box centered horizontally
    },
    boxText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});