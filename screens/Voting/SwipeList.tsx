import React, { useState } from "react";
import {
    Alert,
  Animated,
  FlatList,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { colors } from "react-native-tailwindcss";
import movies from "../../data/30-movies.json";
import { MemoItem } from "../../shared/components/ListItem";

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
      Alert.alert(text);
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
    {renderRightAction("More", colors.green400, 192, progress)}
    {renderRightAction("Flag", colors.purple400, 128, progress)}
    {renderRightAction("More", colors.red400, 64, progress)}
  </View>
);

const keyExtractor = (item: any) => item.id;

export function SwipeListPage() {
  console.log("<List>");
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Swipeable renderRightActions={renderRightActions}>
        <MemoItem
          itemId={item.id}
          itemTitle={item.title}
          itemUrl={item.photoUrL}
          onPress={() => setSelectedId(item.id)}
          isSelected={item.id == selectedId}
        />
      </Swipeable>
    );
  };

  return (
    <SafeAreaView className="items-center justify-center flex-1 w-full bg-orange-400">
      <FlatList
        data={movies.movies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}
