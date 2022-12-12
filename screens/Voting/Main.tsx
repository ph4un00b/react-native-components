import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { List } from "./List";

export function Voting() {
  return (
    <SafeAreaView className="items-center justify-center flex-1 bg-blue-400">
      <Text className="pt-4 text-xl text-slate-200">Voting syetms</Text>
      <Text className="text-slate-200" numberOfLines={1}>
        A very long and text let see what happens over here!, let's add a bit
        more text
      </Text>
      <List/>
    </SafeAreaView>
  );
}
