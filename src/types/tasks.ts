export type Task = {
    id: string;
    title: string;
    description?: string;
    dueDate: Date | null;
    dueTime?: string;   // store as HH:mm
    repeat: 'never' | 'daily' | 'weekly' | 'monthly';
    alert: boolean;
    completed: boolean;
};