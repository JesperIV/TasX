import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routeParameters';
import { useTasks } from '../services/TaskContext';
import { Task } from '../services/tasks';

import TaskItem from '../components/TaskItem';

const HomeScreen: React.FC = () => {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
    const navigation = useNavigation<NavigationProp>();

    const { tasks, setTasks } = useTasks();

    const toggleCompleted = (id: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const renderTaskItem = ({ item }: { item: Task }) => (
        <TaskItem task={item} onToggle={toggleCompleted} />
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.header}>Tasks</Text> */}
            <FlatList
                data={tasks}
                renderItem={renderTaskItem}
                keyExtractor={task => task.id}
                style={styles.list}
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
    header: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 10,
        color: "#333"
    },
    list: {
        paddingBottom: 20
    },
});

export default HomeScreen;