import { I18nManager, Text, TouchableOpacity, View } from "react-native";
import {
  MaterialCommunityIcons,
  Fontisto,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { useState } from "react";
import { color } from "react-native-tailwindcss";

export function AppSearch() {
  const [allItems, setAllItems] = useState("all items");
  /** todo: verify rtl - ltr */
  const flexRow = I18nManager.isRTL ? "flex-row-reverse" : "flex-row";
  return (
    <View className="px-0 shadow-sm bg-slate-300">
      {/* flying mode */}
      {/* <View className="absolute left-0 right-0 z-10 top-[220px] bg-slate-300 rounded-md px-0 mx-4 shadow-sm"> */}
      <View
        className={
          flexRow + " flex mx-4 my-2 min-h-[44px] justify-between items-center"
        }
      >
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="backburger"
            size={32}
            color={color.gray900}
          />
        </TouchableOpacity>
        <Text className="flex text-lg font-bold capitalize text-slate-900">
          {allItems}
        </Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={32} color={color.gray900} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
