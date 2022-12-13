import React, { useState } from "react";
import {
  Button,
  GestureResponderEvent,
  Image,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";

type ItemProps = {
  itemId: string;
  itemUrl: string;
  itemTitle: string;
  onPress: (event: GestureResponderEvent) => void;
  isSelected: boolean;
};

export function Item({
  itemId,
  itemUrl,
  itemTitle,
  onPress,
  isSelected,
}: ItemProps) {
  const [vote, setVote] = useState(0);
  console.log("<item> "+itemId, isSelected);
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
