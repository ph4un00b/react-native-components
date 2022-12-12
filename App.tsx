import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import "./generated/nativewind-output";

export default function App() {
  return (
    <View className="items-center justify-center flex-1 bg-purple-400">
      <Text className='text-slate-200'>hola mundo!</Text>
      <StatusBar style="auto" />
    </View>
  );
}