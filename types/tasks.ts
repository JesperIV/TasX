export type RepeatInterval = 'never' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    repeatInterval: RepeatInterval;
    isCompleted: boolean;
    receiveNotifications: boolean;
}