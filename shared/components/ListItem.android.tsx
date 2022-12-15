import React, { useState } from "react";
import {
  Button,
  Image,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { ItemProps } from "./ListItem";

export function Item({
  itemId,
  imageUrl: itemUrl,
  itemTitle,
  onPress,
  isSelected,
  icon,
}: ItemProps) {
  const [vote, setVote] = useState(0);
  console.log("<item-col> " + itemId, isSelected);
  const bgStyles = `${
    isSelected ? "bg-purple-800" : "bg-blue-200"
  } p-8 my-4 w-full`;
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
    <TouchableNativeFeedback key={itemTitle} onPress={onPress}>
      {Card}
    </TouchableNativeFeedback>
  );
}

export function RowItem({
  itemId,
  imageUrl: itemUrl,
  itemTitle,
  onPress,
  isSelected,
  icon,
  children,
  selectedColor,
  notSelectedColor,
  titleColor,
  notSelectedTitleColor,
}: ItemProps) {
  const [vote, setVote] = useState(0);
  console.log("<item-row> " + itemId, isSelected);

  const bgSelectedDefault = "bg-purple-800";
  const bgNotSelectedDefault = "bg-blue-200";
  const bgSelectedColor = selectedColor ? selectedColor : bgSelectedDefault;
  const bgNotSelectedColor = notSelectedColor
    ? notSelectedColor
    : bgNotSelectedDefault;
  const bgStyles =
    (isSelected ? bgSelectedColor : bgNotSelectedColor) +
    " flex flex-row p-3 my-0.5 w-full shadow-sm";

  const textStyles =
    (isSelected
      ? titleColor
        ? titleColor
        : "text-white"
      : notSelectedTitleColor
      ? notSelectedTitleColor
      : "text-black") + " text-xl";

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
          className="w-[100px] h-[100px] bg-black rounded-xl shadow-sm"
          resizeMode="cover"
          fadeDuration={1000}
          blurRadius={3}
          source={{ uri: itemUrl }}
        />
      )}

      {icon && icon}

      <View className="justify-center ml-4">
        <Text className={textStyles}>{itemTitle}</Text>
        {children && children}
      </View>
    </View>
  );

  return (
    <TouchableNativeFeedback key={itemTitle} onPress={onPress}>
      {Card}
    </TouchableNativeFeedback>
  );
}

const areEqual = (prevProps: any, nextProps: any) => {
  //   console.log("==?");
  const { isSelected } = nextProps;
  const { isSelected: prevIsSelected } = prevProps;
  /*if the props are equal, it won't update*/
  const isSelectedEqual = isSelected == prevIsSelected;
  return isSelectedEqual;
};

export const MemoItem = React.memo(Item, areEqual);
