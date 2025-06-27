import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist"
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routeParameters';
import { useTasks } from '../services/TaskContext';
import { Task } from '../types/tasks';

import FloatingButton from '../components/FloatingButton';
import TaskBay from '../components/TaskBay';
import TaskItem from '../components/TaskItem';

type BayDefinition = {
    key: string;
    title: string;
    taskFilter: (tasks: Task[]) => Task[];
};

const bayDefinitions: BayDefinition[] = [
    {
        key: "general",
        title: "General Tasks",
        taskFilter: (tasks) => tasks.filter(task => !task.dueDate)
    },
    {
        key: "deadline",
        title: "Deadline Tasks",
        taskFilter: (tasks) => tasks.filter(task => task.dueDate).sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    },
]

const HomeScreen: React.FC = () => {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
    const navigation = useNavigation<NavigationProp>();

    const { tasks, setTasks } = useTasks();

    const [bayOrder, setBayOrder] = useState(bayDefinitions);
    
    const toggleCompleted = (id: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    useEffect(() => {
        setBayOrder(prev => 
            prev.map(bay => {
                const definition = bayDefinitions.find(def => def.key === bay.key);
                if (!definition) return bay;    // fallback for unknown bays

                return {
                    ...bay,
                    tasks: definition.taskFilter(tasks)
                };
            })
        );

    }, [tasks]);

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
            <View style={styles.topRow}>
                <Text style={styles.header}>{tasks.length} Task{tasks.length > 1 ? "s" : ""} remaining</Text>
            </View>

            <DraggableFlatList
                data={bayOrder}
                onDragEnd={({ data }) => {
                    setTimeout(() => setBayOrder(data), 50);    // to prevent jittering
                }}
                renderItem={({ item, drag, isActive }: RenderItemParams<typeof bayOrder[0]>) => (
                    <View>
                        <TouchableOpacity
                            onLongPress={drag}
                            delayLongPress={25}
                            style={styles.bayDragHandle}
                        >
                            <Text style={styles.bayDragText}>⇅ {item.title}</Text>
                        </TouchableOpacity>

                        <TaskBay
                            title={""}  // could be used for the item title, but we use the bay title instead
                            tasks={tasks}
                            taskFilter={item.taskFilter}
                            onToggle={toggleCompleted}
                        />
                    </View>
                )}
                keyExtractor={(item) => item.key}
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
    bayDragHandle: {
        alignItems: "center",
        paddingVertical: 6,
        backgroundColor: "#f1f1f1",
        borderRadius: 8,
        marginBottom: 4,
    },
    bayDragText: {
        fontSize: 16,
        color: "#555",
        fontWeight: "600",
    },
});

export default HomeScreen;