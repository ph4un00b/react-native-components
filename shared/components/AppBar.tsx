import { ScrollView, Switch, Text, View } from "react-native";
import Constants from "expo-constants";
import { Link, useLocation } from "react-router-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { color } from "react-native-tailwindcss";
import { RowItem } from "./ListItem";
import { AppSearch } from "./AppSearch";

type TabProps = { children: React.ReactNode; to: string };

function AppBarTab({ children, to }: TabProps) {
  console.log('chaging to', to)
  const { pathname } = useLocation();
  const style =
    pathname == to
      ? "px-3 pt-2 text-xl font-bold capitalize text-slate-200"
      : "px-3 pt-2 text-xl font-bold capitalize text-slate-400";
  return (
    <Link to={to}>
      <Text className={style}>{children}</Text>
    </Link>
  );
}

export function AppBar() {
  const [switchVal, setSwitch] = useState(true);

  const toggleSwitch = () => {
    setSwitch((prev) => !prev);
  };

  return (
    <View className="flex flex-col w-full">
      <StatusBar style="light" />
      <View
        className="flex flex-row w-full bg-slate-600"
        style={{ paddingTop: Constants.statusBarHeight }}
      >
        <ScrollView
          horizontal
          style={{ paddingBottom: Constants.statusBarHeight * 0.5 }}
        >
          <View className="flex flex-row">
            <Switch
              trackColor={{ false: color.gray200, true: color.purple400 }}
              thumbColor={color.gray100}
              ios_backgroundColor={color.gray800}
              onValueChange={toggleSwitch}
              value={switchVal}
            />
            <Text className="pt-2 pl-1 pr-3 text-xl font-bold capitalize text-slate-200">
              on/off
            </Text>
          </View>
          {/* TODO: automate links agregation */}
          <AppBarTab to="/">menu</AppBarTab>
          <AppBarTab to="/github">github</AppBarTab>
          <AppBarTab to="/linking">linking</AppBarTab>
          <AppBarTab to="/native-image">image</AppBarTab>
          <AppBarTab to="/drawer">drawer</AppBarTab>
          <AppBarTab to="/listing">listing</AppBarTab>
          <AppBarTab to="/list">list</AppBarTab>
          <AppBarTab to="/signin">sign in</AppBarTab>
          <AppBarTab to="/swipe-simple">swipe-simple</AppBarTab>
          <AppBarTab to="/swipe-inside">swipe-inside</AppBarTab>
          <AppBarTab to="/swipe-class">swipe-class</AppBarTab>
          <AppBarTab to="/swipe-outside">swipe-outside</AppBarTab>
          <AppBarTab to="/test">test text to large</AppBarTab>
          <AppBarTab to="/test">test text to large</AppBarTab>
          <AppBarTab to="/test">test text to large</AppBarTab>
        </ScrollView>
      </View>

      <View>
        <Text className="text-slate-200" numberOfLines={1}>
          A very long and text let see what happens over here!, let's add a bit
          more text
        </Text>
      </View>

      {/* ads */}
      <View>
        <RowItem
          imageUrl="https://placekitten.com/300/300"
          itemTitle={"Ads"}
          isSelected={true}
        >
          <Text className="text-slate-200">
            How to Create Apple TV Application with React Native
          </Text>
        </RowItem>
      </View>
      <AppSearch />
    </View>
  );
}
