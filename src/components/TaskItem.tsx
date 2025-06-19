import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { Task } from '../services/tasks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routeParameters';

type Props = {
    task: Task;
    onToggle: (id: string) => void;
};

const TaskItem: React.FC<Props> = ({ task, onToggle }) => {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={task.completed ? [styles.taskItem, styles.taskItemCompleted] : styles.taskItem}>
            <Checkbox 
                value={task.completed}
                onValueChange={() => onToggle(task.id)}
                style={styles.checkbox}
                color={task.completed ? "#007aff" : undefined}
            />
            <Text style={[styles.taskTitle, task.completed && styles.taskTextDone]}>{task.title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Details', { taskId: task.id })}>
                <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    taskTitle: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    taskItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
    },
    taskItemCompleted: {
        opacity: 0.5,
        backgroundColor: "#f0f0f0",
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

export default TaskItem;