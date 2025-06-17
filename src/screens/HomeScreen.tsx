import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

type Task = {
    id: string;
    title: string;
    completed: boolean;
};

const HomeScreen: React.FC = () => {
    //  sample tasks
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', title: 'Example Task 1', completed: false },
        { id: '2', title: 'Example Task 2', completed: true },
        { id: '3', title: 'Example Task 3', completed: false }
    ]);

    //  toggle task completion
    const toggleTask = (id: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const renderTask = ({ item }: { item: Task }) => (
        <View style={styles.taskItem}>
            <Checkbox
                value={item.completed}
                onValueChange={() => toggleTask(item.id)}
                style={styles.checkbox}
            />
            <Text style={[styles.taskText, item.completed && styles.taskTextDone]}>
                {item.title}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.header}>Tasks</Text> */}
            <FlatList
                data={tasks}
                renderItem={renderTask}
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
});

export default HomeScreen;