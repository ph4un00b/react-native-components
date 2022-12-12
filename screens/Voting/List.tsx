import React, { useState } from "react";
import {
  FlatList,
  GestureResponderEvent,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import movies from "../../data/30-movies.json";

type ItemProps = {
  item: any;
  onPress: (event: GestureResponderEvent) => void;
  textColor: string;
  backgroundColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity
    className={`${backgroundColor} p-8 my-4 mx-4`}
    onPress={onPress}
  >
    <Text className={`${textColor} text-2xl`}>{item.title}</Text>
  </TouchableOpacity>
);

export function List() {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={item.id == selectedId
          ? "bg-purple-800"
          : "bg-pink-200"}
        textColor={item.id == selectedId ? "text-white" : "text-black"}
      />
    );
  };

  return (
    <SafeAreaView className="items-center justify-center flex-1 bg-purple-400">
      <FlatList
        data={movies.movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });
