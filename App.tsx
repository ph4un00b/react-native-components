// import { StatusBar } from 'expo-status-bar';
// import { Text, View, TouchableNativeFeedback, Alert } from 'react-native';
import "./generated/nativewind-output";
import { Main } from "./screens/Voting/Main";
import { NativeRouter } from "react-router-native";
/** ensure that appropriate event handlers are registered with React Native */
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </GestureHandlerRootView>
  );
}
