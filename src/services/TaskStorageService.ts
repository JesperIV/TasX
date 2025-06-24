import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "./tasks";

const TASKS_KEY = "TASKS_STORAGE_KEY";

export const TaskStorageService = {
    async saveTasks(tasks: Task[]): Promise<void> {
        try {
            const json = JSON.stringify(tasks);
            await AsyncStorage.setItem(TASKS_KEY, json);
        } catch (error) {
            console.error("Error saving tasks to storage:", error);
        }
    },

    async loadTasks(): Promise<Task[]> {
        try {
            const json = await AsyncStorage.getItem(TASKS_KEY);
            return json ? JSON.parse(json) : [];
        } catch (error) {
            console.error("Error loading tasks from storage:", error);
            return [];
        }
    }
};