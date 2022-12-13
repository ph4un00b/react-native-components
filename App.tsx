// import { StatusBar } from 'expo-status-bar';
// import { Text, View, TouchableNativeFeedback, Alert } from 'react-native';
import "./generated/nativewind-output";
import { Main } from "./screens/Voting/Main";
import { NativeRouter } from "react-router-native";

export default function App() {
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
}
