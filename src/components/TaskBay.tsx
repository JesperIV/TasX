import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Task } from '../types/tasks';
import TaskItem from './TaskItem';

type Props = {
    title: string;
    tasks: Task[];
    onToggle: (id: string) => void;
};

const TaskBay: React.FC<Props> = ({ title, tasks, onToggle }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TaskItem task={item} onToggle={onToggle} />
                )}
                keyExtractor={task => task.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
    },
});

export default TaskBay;