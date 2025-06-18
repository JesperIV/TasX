import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTasks } from '../services/TaskContext';
import { Task } from '../services/tasks';

const HomeScreen: React.FC = () => {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
    const navigation = useNavigation<NavigationProp>();

    const { tasks } = useTasks();

    const renderTaskItem = ({ item }: { item: Task }) => {
        return (
            <View style={styles.taskItem}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Details', { taskId: item.id })}>
                    <Text style={styles.detailsButtonText}>Details</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.header}>Tasks</Text> */}
            <FlatList
                data={tasks}
                renderItem={renderTaskItem}
                keyExtractor={task => task.id}
                // style={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fb",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    taskTitle: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    header: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 10,
        color: "#333"
    },
    list: {
        paddingBottom: 20
    },
    taskItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
    },
    checkbox: {
        marginRight: 10,
    },
    taskText: {
        fontSize: 16,
        color: "#333",
    },
    taskTextDone: {
        textDecorationLine: "line-through",
        color: "#888"
    },
    detailsButtonText: {
        color: "#007bff",
        fontSize: 14,
        fontWeight: "500",
    },
});

export default HomeScreen;