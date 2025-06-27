import "react-native-gesture-handler";
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { TaskProvider } from "./src/services/TaskContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <TaskProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </TaskProvider>
  );
};
