import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    onPress: () => void;
    style?: ViewStyle;
};

const FloatingButton: React.FC<Props> = ({ onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 50,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#007aff", // iOS blue
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
});

export default FloatingButton;