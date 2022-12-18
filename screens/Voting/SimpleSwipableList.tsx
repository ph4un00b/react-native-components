import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import movies from "../../data/30-movies.json";
import { MemoSwipableItem } from "../../packages/mochilita/nativewind/SwipableListItem.android";
import { Fontisto } from "@expo/vector-icons"
const keyExtractor = (item: any) => item.id;

export function SimpleSwipeListPage() {
  console.log("<List>");
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <MemoSwipableItem actions={() => (
        <View className="flex items-center justify-center w-20 bg-orange-400">
            <Fontisto name="persons" size={35} color="white" />
        </View>
      )}
        itemId={item.id}
        itemTitle={item.title}
        itemUrl={item.photoUrL}
        onPress={() => setSelectedId(item.id)}
        isSelected={item.id == selectedId}
      />
    );
  };

  return (
    <SafeAreaView className="items-center justify-center flex-1 w-full bg-fuchsia-600">
      <FlatList
        data={movies.movies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}
