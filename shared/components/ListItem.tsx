import React, { useState } from "react";
import { Button, TouchableOpacity, View, Text, Image } from "react-native";
import { areEqual, ItemProps } from "./ListItem.card";

export function Item({
  itemId,
  itemUrl,
  itemTitle,
  onPress,
  isSelected,
}: ItemProps) {
  const [vote, setVote] = useState(0);
  console.log("<item> " + itemId, isSelected);
  const bgStyles = `${
    isSelected ? "bg-purple-800" : "bg-blue-200"
  } p-8 my-4 mx-4`;
  const textStyles = `${
    isSelected ? "text-white" : "text-black"
  } text-2xl pt-4`;

  const Card = (
    <View className={bgStyles}>
      {/**
       * for local images <Image> reads the metadata
       * hence you dont need to pass the styles
       * fadeDuration - android only!
       * @see https://reactnative.dev/docs/image
       */}
      <Image
        className="w-24 h-24 bg-black rounded-md"
        resizeMode="contain"
        fadeDuration={1000}
        blurRadius={6}
        source={{ uri: itemUrl }}
      />
      <Text className={textStyles}>{itemTitle}</Text>
      <Button title={"Vote! " + vote} onPress={() => setVote((p) => p + 1)} />
    </View>
  );

  return (
    <TouchableOpacity key={itemTitle} onPress={onPress}>
      {Card}
    </TouchableOpacity>
  );
}

export const MemoItem = React.memo(Item, areEqual);
