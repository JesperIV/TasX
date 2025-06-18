export type Task = {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    repeat: 'never' | 'daily' | 'weekly' | 'monthly';
    alert: boolean;
    completed: boolean;
}