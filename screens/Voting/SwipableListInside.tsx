import React, { useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import movies from "../../data/30-movies.json";
import { MemoSwipableItem } from "../../packages/mochilita/nativewind/SwipableListItem.android";

const keyExtractor = (item: any) => item.id;

export function SwipeListInsidePage() {
  console.log("<List>");
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <MemoSwipableItem
        itemId={item.id}
        itemTitle={item.title}
        itemUrl={item.photoUrL}
        onPress={() => setSelectedId(item.id)}
        isSelected={item.id == selectedId}
      />
    );
  };

  return (
    <SafeAreaView className="items-center justify-center flex-1 w-full bg-red-600">
      <FlatList
        data={movies.movies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}
