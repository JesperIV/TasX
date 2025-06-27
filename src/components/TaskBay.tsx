import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Task } from '../types/tasks';
import TaskItem from './TaskItem';

type Props = {
    title: string;
    tasks: Task[];
    taskFilter: (tasks: Task[]) => Task[];
    onToggle: (id: string) => void;
};

const TaskBay: React.FC<Props> = ({ title, tasks, onToggle, taskFilter }) => {
    const filteredTasks = taskFilter(tasks);

    return (
        <View style={styles.container}>
            <Text style={title ? styles.title : styles.noTitle}>{title}</Text>
            <FlatList
                data={filteredTasks}
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
    noTitle: {
        margin: 0,
        padding: 0,
        height: 0,
        width: 0,
    }
});

export default TaskBay;