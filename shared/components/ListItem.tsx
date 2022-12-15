import React, { useState } from "react";
import { Button, TouchableOpacity, View, Text, Image, GestureResponderEvent } from "react-native";
import { areEqual } from "./ListItem.card";

export type ItemProps = {
  itemId?: string;
  imageUrl?: string;
  itemTitle: string;
  onPress?: (event: GestureResponderEvent) => void;
  isSelected: boolean;
  selectedColor?: string;
  titleColor?: string;
  notSelectedTitleColor?: string;
  notSelectedColor?: string;
  icon?: React.ReactNode;
  row?: boolean;
  children?: React.ReactNode;
};

export function Item({
  itemId,
  imageUrl: itemUrl,
  itemTitle,
  onPress,
  isSelected,
  icon,
  row
}: ItemProps) {
  const [vote, setVote] = useState(0);
  console.log("<item> " + itemId, isSelected);
  const bgStyles = `${
    isSelected ? "flex bg-purple-800" : "bg-blue-200"
  } p-8 my-4 w-full ${row ? 'flex-row' : 'flex-col'}`;
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
      {itemUrl && (
        <Image
          className="w-full h-[250px] bg-black rounded-md"
          resizeMode="cover"
          fadeDuration={1000}
          blurRadius={3}
          source={{ uri: itemUrl }}
        />
      )}

      {icon && icon}
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
