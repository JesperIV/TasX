import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';

export type RootStackParamList = {
    Home: undefined;
    Details: { taskId: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "My Tasks" }} />
            <Stack.Screen name="Details" component={TaskDetailsScreen} options={{ title: "Task Details" }} />
        </Stack.Navigator>
    );
};

export default AppNavigator;