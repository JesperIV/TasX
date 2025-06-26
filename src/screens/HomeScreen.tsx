import React, { useLayoutEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routeParameters';
import { useTasks } from '../services/TaskContext';
import { Task } from '../types/tasks';

import TaskItem from '../components/TaskItem';
import FloatingButton from '../components/FloatingButton';

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

    useLayoutEffect(() => {
        const completedCount = tasks.filter(task => task.completed).length;

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        if (completedCount === 0) {
                            Alert.alert("No completed tasks", "There are no completed tasks to clear.");
                            return;
                        }

                        Alert.alert(
                            "Clear Completed Tasks",
                            "Are you sure you want to clear all completed tasks?",
                            [
                                { text: "Cancel", style: "cancel" },
                                { text: "Clear", style: "destructive", onPress: () => {
                                    setTasks(prev => prev.filter(task => !task.completed));
                                }},
                            ],
                            { cancelable: true }
                        );
                    }}
                    disabled={completedCount === 0}
                    style={[
                        styles.headerClearButton,
                        completedCount === 0 && styles.headerClearButtonDisabled
                    ]}>
                    <Text style={[
                        styles.headerClearText,
                        completedCount === 0 && styles.headerClearTextDisabled
                    ]}>
                        Clear Completed
                    </Text>
                </TouchableOpacity>
            )
        });
    }, [navigation, tasks]);

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.header}>Tasks</Text> */}
            <View style={styles.topRow}>
                <Text style={styles.header}>{tasks.length} Task{tasks.length > 1 ? "s" : ""} remaining</Text>
            </View>


            <FlatList
                data={tasks}
                renderItem={renderTaskItem}
                keyExtractor={task => task.id}
                style={styles.list}
            />
            <FloatingButton onPress={() => navigation.navigate("Details", { taskId: "" })} />
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
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    headerClearButton: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        backgroundColor: "#e0e0e0",
    },
    headerClearButtonDisabled: {
        backgroundColor: "#f0f0f0",
    },
    headerClearText: {
        color: "#333",
        fontWeight: "600",
        fontSize: 14,
    },
    headerClearTextDisabled: {
        color: "#aaa",
    },
});

export default HomeScreen;