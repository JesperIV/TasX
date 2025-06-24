import React, { createContext, useState, useContext, useEffect } from 'react';
import { Task } from './tasks';
import { TaskStorageService } from './TaskStorageService';

interface TaskContextType {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // load tasks on mount
    useEffect(() => {
        TaskStorageService.loadTasks().then(setTasks);
    }, []);

    // save tasks on change
    useEffect(() =>{
        TaskStorageService.saveTasks(tasks);
    }, [tasks]);

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTasks must be used within a TaskProvider");
    return context;
};