import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTasks } from '../services/TaskContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import 'react-native-get-random-values';    // for uuidv4
import { v4 as uuidv4 } from "uuid";

const TaskDetailsScreen: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const { taskId: id } = route.params as { taskId?: string };  // get task ID from route params
    const { tasks, setTasks } = useTasks();
    const task = tasks.find(t => t.id === id);
    const isNew = !id || !tasks.find(t => t.id === id);    // check if the task is new, otherwise it is being edited

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [dueTime, setDueTime] = useState<string | undefined>();
    const [repeat, setRepeat] = useState<"never" | "daily" | "weekly" | "monthly">("never");
    const [alertEnabled, setAlertEnabled] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized && id) {
            const task = tasks.find(t => t.id === id);

            if (task) {
                setTitle(task.title);
                setDescription(task.description!);
                setDueDate(task.dueDate ? new Date(task.dueDate) : null);
                setDueTime(task.dueTime);
                setRepeat(task.repeat || "never");
                setAlertEnabled(task.alert || false);
                setInitialized(true);
            }
        }
    }, [id, task]);

    const saveTask = () => {
        if (isNew){
            const newTask = {
                id: uuidv4(),
                title,
                description,
                dueDate,
                dueTime,
                repeat,
                alert: alertEnabled,
                completed: false,
            };
            setTasks(prevTasks => [...prevTasks, newTask]);
        } else {
            setTasks(prevTasks => prevTasks.map(t =>
                t.id === id
                ? { ...t, title, description, dueDate, dueTime, repeat, alert: alertEnabled }
                : t
            ));
        };
        navigation.goBack();
    };

    const deleteTask = () => {
        if (!id) return;

        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
                        navigation.goBack();
                    },
                },
            ],
            { cancelable: true }
        );
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={saveTask}>
                    <Text style={styles.headerButtonText}>Save</Text>
                </TouchableOpacity>
            )
        })
    }, [navigation, saveTask]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title<Text style={{color: 'red'}}> *</Text></Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholder="Task Title"
            />

            <Text style={styles.label}>description</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                placeholder="Task Description"
                multiline
            />

            <Text style={styles.label}>Due Date</Text>
            <View style={styles.dateFieldWrapper}>
                <TouchableOpacity
                    style={styles.dateFieldTouch}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={styles.dateButtonText}>
                        {dueDate ? dueDate.toLocaleDateString() : 'Set Due Date'}
                    </Text>
                </TouchableOpacity>
                {dueDate && (
                    <TouchableOpacity onPress={() => {
                        setDueDate(null);
                        setDueTime(undefined);
                    }}>
                        <Text style={styles.clearButton}>×</Text>
                    </TouchableOpacity>
                )}
            </View>

            {showDatePicker && (
                <DateTimePicker
                    mode="date"
                    value={dueDate || new Date()}
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                            setDueDate(selectedDate);
                        };
                    }}
                    display="spinner"
                />
            )}
            {dueDate && (
                <>
                    <Text style={styles.label}>Due Time</Text>
                    <View style={styles.dateFieldWrapper}>
                        <TouchableOpacity
                            style={styles.dateFieldTouch}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Text style={styles.dateButtonText}>
                                {dueTime ? dueTime : 'Set Due Time'}
                            </Text>
                        </TouchableOpacity>
                        {dueTime && (
                            <TouchableOpacity onPress={() => setDueTime(undefined)}>
                                <Text style={styles.clearButton}>×</Text>
                            </TouchableOpacity>
                        )}
                    </View>


                    {showTimePicker && (
                        <DateTimePicker
                            mode="time"
                            value={dueDate || new Date()}
                            onChange={(event, selectedDate) => {
                                setShowTimePicker(false);
                                if (selectedDate && event.type !== 'dismissed') {
                                    const hours = selectedDate.getHours();
                                    const minutes = selectedDate.getMinutes();
                                    const timeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
                                    setDueTime(timeStr);
                                }
                            }}
                            display="spinner"
                        />
                    )}
                </>
            )}

            <Text style={styles.label}>Repeat<Text style={{color: 'red'}}> *</Text></Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={repeat}
                    onValueChange={(itemValue) => setRepeat(itemValue)}
                    mode="dropdown"
                >
                    <Picker.Item label="Never" value="never" />
                    <Picker.Item label="Daily" value="daily" />
                    <Picker.Item label="Weekly" value="weekly" />
                    <Picker.Item label="Monthly" value="monthly" />
                </Picker>
            </View>

            <View style={styles.toggleRow}>
                <Text style={styles.label}>Alerts</Text>
                <Switch
                    value={alertEnabled}
                    onValueChange={setAlertEnabled}
                    disabled={!dueDate}
                />
            </View>

            <View style={styles.buttonRow}>
                {!isNew && (
                    <TouchableOpacity onPress={deleteTask} style={[styles.button, { backgroundColor: "#d9534f" }]}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={saveTask} style={styles.button}>
                    <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fb",
        padding: 20,
    },
    headerButtonText: {
        color: "#007aff",
        fontSize: 16,
        fontWeight: "600",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10,
        color: "#333",
        fontWeight: "600",
    },
    input: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
    },
    textArea: {
        height: 80,
        textAlignVertical: "top",
    },
    dateButton: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    dateButtonText: {
        fontSize: 16,
        color: "#007aff",
    },
    pickerContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        overflow: "hidden",
    },
    toggleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
    buttonRow: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: "#007aff",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textTransform: "uppercase",
    },
    dateFieldWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
    },
    dateFieldTouch: {
        flex: 1,
    },
    clearButton: {
        fontSize: 20,
        color: "#aaa",
        paddingHorizontal: 8,
    },
});

export default TaskDetailsScreen;