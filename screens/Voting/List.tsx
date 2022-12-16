import React, { useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import movies from "../../data/30-movies.json";
import { MemoItem } from "../../shared/components/ListItem";

const keyExtractor = (item: any) => item.id;

export function ListPage() {
  console.log("<List>");
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <MemoItem
        itemId={item.id}
        itemTitle={item.title}
        imageUrl={item.photoUrL}
        onPress={() => setSelectedId(item.id)}
        isSelected={item.id == selectedId}
      />
    );
  };

  return (
    <SafeAreaView className="items-center justify-center flex-1 bg-purple-400">
      <FlatList
        data={movies.movies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}
