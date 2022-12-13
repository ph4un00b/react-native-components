import { ScrollView, Text, View } from "react-native";
import { Link, useLocation } from "react-router-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

type TabProps = { children: React.ReactNode; to: string };

function AppBarTab({ children, to }: TabProps) {
  const { pathname } = useLocation();
  const style =
    pathname == to
      ? "px-3 text-xl font-bold capitalize text-slate-200"
      : "px-3 text-xl font-bold capitalize text-slate-400";
  return (
    <Link to={to}>
      <Text className={style}>{children}</Text>
    </Link>
  );
}

export function AppBar() {
  return (
    <>
      <StatusBar style="light" />
      <View className="flex flex-row w-full pt-6 bg-slate-600">
        <ScrollView horizontal className="pb-8">
          <AppBarTab to="/">Voting system</AppBarTab>
          <AppBarTab to="/signin">sign in</AppBarTab>
          <AppBarTab to="/test">test text to large</AppBarTab>
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
    </>
  );
}
