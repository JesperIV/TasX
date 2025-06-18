import React, { createContext, useState, useContext } from 'react';
import { Task } from './tasks';

interface TaskContextType {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: "1", title: "Example Task 1", description: "A hardcoded example task.", dueDate: new Date(), repeat: "never", alert: false, completed: false }, //  example task
    ]);
    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext)!;