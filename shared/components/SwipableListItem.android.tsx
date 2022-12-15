import React, { useState } from "react";
import {
  Animated,
  Button,
  GestureResponderEvent,
  I18nManager,
  Image,
  Text,
  TouchableNativeFeedback,
  View,
  StyleSheet,
} from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

type ItemProps = {
  itemId: string;
  itemUrl: string;
  itemTitle: string;
  onPress: (event: GestureResponderEvent) => void;
  isSelected: boolean;
};

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#497AFC",
    justifyContent: "center",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

const renderRightAction = (
  text: string,
  color: string,
  x: number,
  // progress: Animated.AnimatedInterpolation
  progress: any
) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });
  const pressHandler = () => {
    //   this.close();
    // eslint-disable-next-line no-alert
    //   window.alert(text);
  };

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      <RectButton
        style={[styles.rightAction, { backgroundColor: color }]}
        onPress={pressHandler}
      >
        <Text style={styles.actionText}>{text}</Text>
      </RectButton>
    </Animated.View>
  );
};

const renderRightActions = (
  // progress: Animated.AnimatedInterpolation,
  progress: any,
  // _dragAnimatedValue: Animated.AnimatedInterpolation
  _dragAnimatedValue: any
) => (
  <View
    style={{
      width: 192,
      flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    }}
  >
    {renderRightAction("More", "#C8C7CD", 192, progress)}
    {renderRightAction("Flag", "#ffab00", 128, progress)}
    {renderRightAction("More", "#dd2c00", 64, progress)}
  </View>
);

export function SwipableItem({
  itemId,
  itemUrl,
  itemTitle,
  onPress,
  isSelected,
}: ItemProps) {
  const [vote, setVote] = useState(0);
  console.log("<item> " + itemId, isSelected);
  const bgStyles = `${
    isSelected ? "bg-purple-800" : "bg-green-200"
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
      <Image
        className="w-full h-[250px] bg-black rounded-md"
        resizeMode="cover"
        fadeDuration={1000}
        blurRadius={3}
        source={{ uri: itemUrl }}
      />
      <Text className={textStyles}>{itemTitle}</Text>
      <Button title={"Vote! " + vote} onPress={() => setVote((p) => p + 1)} />
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableNativeFeedback key={itemTitle} onPress={onPress}>
        {Card}
      </TouchableNativeFeedback>
    </Swipeable>
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

export const MemoSwipableItem = React.memo(SwipableItem, areEqual);
