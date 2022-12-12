import { Text, View } from "react-native";

export function AppBar() {
    return (
        <View className="w-full pt-6 pb-2 pl-2 bg-slate-600">
            <Text className="text-xl font-bold capitalize text-slate-200">Voting systems</Text>
        </View>
    );
}
